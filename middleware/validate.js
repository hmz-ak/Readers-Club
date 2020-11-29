let { validate } = require("../model/products");
//middleware to check data if it passes joi validation or not
function validateProduct(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateProduct;
