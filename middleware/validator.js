import { body, validationResult } from "express-validator";

export const userValidator = () => {
  return [
    body("email").isEmail().withMessage("not a valid email id"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ];
};

export const userValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};
