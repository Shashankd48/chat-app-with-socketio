module.exports.InternalServerError = {
   error: true,
   status: 500,
   msg: "Internal Server Error!",
};

module.exports.NotFoundError = {
   error: true,
   status: 404,
};

module.exports.BadRequestError = {
   error: true,
   status: 400,
};
module.exports.DuplicateError = {
   error: true,
   status: 409,
};

module.exports.SuccessResponse = {
   error: false,
   status: 200,
};

module.exports.MethodNotAllowedError = {
   error: false,
   status: 405,
};
