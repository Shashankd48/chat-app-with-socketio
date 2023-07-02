function res500(res, error) {
   return res.status(500).json({
      statusCode: 500,
      error: error?.name || "",
      message: error?.message || "Internal Server Error",
   });
}

function duplicateError(res, message = "Record already exists!") {
   return res.status(409).json({
      statusCode: 401,
      error: "Duplicate Entry",
      message,
   });
}

function badRequestError(res, message = "Request failed!", data = {}) {
   return res.status(400).json({
      statusCode: 400,
      error: "Bad Request",
      message,
      data,
   });
}

function unauthorizedError(res, message = "Access Denied!", data = {}) {
   return res.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message,
      data,
   });
}

function successRes(res, data, message = "Success") {
   return res.status(200).json({
      statusCode: 200,
      data,
      error: null,
      message,
   });
}

module.exports = {
   res500,
   successRes,
   unauthorizedError,
   badRequestError,
   duplicateError,
};
