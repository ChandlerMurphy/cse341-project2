// const { body, validationResult } = require('express-validator')
// const userValidationRules = () => {
//   return [
//     body('firstName').isString().notEmpty().withMessage('First name is required and must be a string'),
//     body('lastName').isString().notEmpty().withMessage('Last name is required and must be a string'),
//     body('email').isEmail().withMessage('Email must be valid'),
//     body('favoriteColor').isString().notEmpty().withMessage('Favorite color is required and must be a string'),
//     body('birthday').isISO8601().toDate().withMessage('Birthday must be a valid date'),
//   ];
// };

// const validate = (req, res, next) => {
//   const errors = validationResult(req)
//   if (errors.isEmpty()) {
//     return next()
//   }
//   const extractedErrors = []
//   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

//   return res.status(422).json({
//     errors: extractedErrors,
//   })
// }

// module.exports = {
//   userValidationRules,
//   validate,
// }

const validator = require('../helpers/validate.js');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveLocation = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    city: 'required|string',
    state: 'required|string',
    country: 'required|string',
    size: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
  saveLocation
};
