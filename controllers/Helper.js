const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

exports.comparePassword = function(hashPassword, password) {
  return bcrypt.compareSync(password, hashPassword);
};

exports.isValidEmail = function(email) {
  return /\S+@\S+\.\S+/.test(email);
};

exports.generateToken = function(id) {
  const token = jwt.sign(
    {
      userId: id
    },
    'mioCodiceSegreto',
    { expiresIn: '7d' }
  );
  return token;
};

// const Helper = {
//   /**
//    * Hash Password Method
//    * @param {string} password
//    * @returns {string} returns hashed password
//    */
//   hashPassword(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
//   },
//   /**
//    * comparePassword
//    * @param {string} hashPassword
//    * @param {string} password
//    * @returns {Boolean} return True or False
//    */
//   comparePassword(hashPassword, password) {
//     return bcrypt.compareSync(password, hashPassword);
//   },
//   /**
//    * isValidEmail helper method
//    * @param {string} email
//    * @returns {Boolean} True or False
//    */
//   isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   },
//   /**
//    * Gnerate Token
//    * @param {string} id
//    * @returns {string} token
//    */
//   generateToken(id) {
//     const token = jwt.sign(
//       {
//         userId: id
//       },
//       process.env.SECRET,
//       { expiresIn: '7d' }
//     );
//     return token;
//   }
// };

// module.export = Helper;
