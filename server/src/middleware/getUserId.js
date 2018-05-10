
const admin = require("firebase-admin");
var serviceAccount = require('../qnary-my-fb.json');
const Lodash = require("lodash");

// function verifyToken(idToken){
//   admin.auth().verifyIdToken(idToken)
//   .then(function(decodedToken) {
//     console.log('user' ,decodedToken);
//     return decodedToken;
//   }).catch(function(error) {
//     console.log(error)
//     return null;
//   });

// }

const getUserId = async (req, res, next) => {
    let token =   req.header('Authentication')
    if (Lodash.isNil(token)) return next();
    admin.auth().verifyIdToken(token)
   .then(function(decodedToken) {
     req.user = { token: token, ...decodedToken }
     //    console.log('req' ,req);
     return next()
   }).catch(function(error) {
     console.log(error)
     return next()
   });
  }
  
  module.exports = { getUserId }
  