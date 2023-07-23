const paginationMiddleware = () => {
  return (req, res, next) => {
    console.log(req?.query);
    const pageNumber = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 12;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;

    req.pagination = {
      page: pageNumber,
      limit,
      startIndex,
      endIndex,
    };

    next();
  };
};

module.exports = paginationMiddleware;
