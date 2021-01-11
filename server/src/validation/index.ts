class Validation {

  static trimsRequestBody(req, res, next) {
    // trim body values
    if (req.body) {
      Object.keys(req.body).forEach((k) => {
        const value = req.body[k];
        if ((typeof value === 'string' || value instanceof String)
        && value !== undefined) req.body[k] = req.body[k].trim();
      });
    }
    next();
  }

  static checkIfString(...params) {
    return (req, res, next) => {
      for (const p of params) {
        const value = req.body[p];
        if (typeof value !== 'string') {
          return res.status(400).send({
            message: `${p} must be a string value!`,
            success: false
          });
        }
      }
      next();
    };
  }

  static checkBodyContains(...params) {
    return (req, res, next) => {
      for (const p of params) {
        if (req.body[p] === undefined || req.body[p] === '') {
          return res.status(400).send({
            message: `${p} cannot be missing in the body!`,
            success: false
          });
        }
      }
      next();
    };
  }
}

export default Validation;
