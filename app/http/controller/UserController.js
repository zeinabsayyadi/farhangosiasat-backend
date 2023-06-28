const bcrypt = require("bcrypt");
const _ = require("lodash");
var Kavenegar = require("kavenegar");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 2 * 60, checkperiod: 600 });

const api = Kavenegar.KavenegarApi({
  apikey:
    "487741527175576D66357A35377557356A6E77386A44793865383143347979334C6D437562744D357076553D",
});

const UserModel = require("../../models/UserModel");
const {
  loginValidator,
  registorValidator,
  adminLoginValidator,
} = require("../validators/UserValidator");

module.exports = new (class UserController {
  async adminLogin(req, res) {
    const { error } = adminLoginValidator(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ phone: req.body.phone });
    if (!user)
      return res
        .status(400)
        .send({ message: "کاربری با این شماره موبایل  یافت نشد" });
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result)
      return res
        .status(400)
        .send({ message: `${user.password},:, ${req.body.password}` });

    const token = user.generateAuthToken();
    res.status(200).send({
      success: true,
      message: "ورود به پنل موفقیت آمیز بود",
      payload: {
        xAccessToken: token,
        user: _.pick(user, ["name", "surname", "phone", "email", "role"]),
      },
    });
  }

  async adminLoginByToken(req, res) {
    console.log(req);
    let user = await UserModel.findById(req.user?._id);
    if (!user) {
      res
        .status(401)
        .send({ success: false, message: "کاربر یافت نشد", payload: {} });
    }
    res.status(200).send({
      success: true,
      message: "ورود به پنل موفقیت آمیز بود",
      payload: {
        xAccessToken: req.header("x_access_token"),
        user: _.pick(user, ["name", "surname", "phone", "email", "role"]),
      },
    });
  }

  async login(req, res) {
    const { error } = loginValidator(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ phone: req.body.phone });
    if (!user)
      return res
        .status(400)
        .send({ message: "کاربری با این شماره موبایل یافت نشد" });

    const token = user.generateAuthToken();
    res.header("x-access-token", token).status(200).send({ success: true });
  }

  async register(req, res) {
    const { error } = registorValidator(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ phone: req.body.phone });
    if (user)
      return res
        .status(400)
        .send({ message: "این کاربر قبلا ثبت نام کرده است" });

    user = new UserModel(
      _.pick(req.body, ["name", "surname", "phone", "email", "isStudent"])
    );
    user.role = "user";
    user = await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-access-token", token)
      .send(_.pick(user, ["name", "phone", "_id"]));
  }

  async sendCode(req, res) {
    if (!req.body.phone)
      return res.status(400).send("لطفا یک شماره تلفن وارد کنید");
    const number = Math.floor(Math.random() * 900000 + 100000);
    myCache.set(req?.body?.phone, number);
    api.Send(
      {
        message: `کد اختصاصی ورود شما به فرهنگ و سیاست : ${number}`,
        sender: "10008663",
        receptor: "09174470158", // user phone => req.user.phone
      },
      function (response, status) {
        console.log(response);
        console.log(status);
      }
    );

    res.status(200).send(true);
  }

  //req body.code
  //req.user phone
  async verifyCode(req, res) {
    if (!req.body.code) return res.status(400).send("کد تایید را وارد کنید");
    if (!req.body.phone) return res.status(400).send("شماره تلفنی موجود نیست!");
    const code = req.body.code;
    const lastCode = myCache.get(req.body.phone);
    if (Number(code) === lastCode) {
      res.status(200).send("شماره تلفن تایید شد");
    } else {
      res.status(403).send(`${code} ${lastCode}`);
    }
  }
})();
