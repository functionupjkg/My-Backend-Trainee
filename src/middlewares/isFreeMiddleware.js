let globalMiddlewares = function (req, res, next) {
    let headerType = req.headers["isfreeappuser"];
    console.log(headerType);
  
    if (headerType) {
      req.body.isFreeAppUser = headerType;
      next();
    } else {
      res.send({
        msg: " ERROR: Invalid Header Value. Enter isFreeAppUser(Boolean)(LOWERCASE) in Header.",
      });
    }
  };
  
  module.exports.globalMiddlewares = globalMiddlewares;