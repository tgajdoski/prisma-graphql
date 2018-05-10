const { getUserId, ApprovalStatus, PublishStatu } = require("../../utils");
const admin = require("firebase-admin");
const  { query } = require('./query');
const functions = require("firebase-functions");
const Lodash = require("lodash");
var serviceAccount = require('../../qnary-my-fb.json');


admin.initializeApp({
  // apiKey: "AIzaSyAL5jNakQk8PqF89f8rfS6TCedm0oFlBZ4",
  // authDomain: "qnary-dev.firebaseapp.com",
  // databaseURL: "https://qnary-dev.firebaseio.com",
  // messagingSenderId: "582735679903",
  // projectId: "qnary-dev",
  // storageBucket: "qnary-dev.appspot.com"
  apiKey: 'AIzaSyDNDVQg4RncRKYr5r9O1GZrQOsv24NLd64',
  authDomain: 'qnary-my-fb.firebaseapp.com',
  databaseURL: 'https://qnary-my-fb.firebaseio.com',
  messagingSenderId: '582735679903',
  projectId: 'qnary-my-fb',
  storageBucket: 'qnary-my-fb.appspot.com',
  credential: admin.credential.cert(serviceAccount),
});

const approvalsRef = admin.database().ref("approvals");


const approvals = {
   approvals(_, {}, ctx ) {
     return query(_, {}, ctx , approvalsRef);
  },
   approval(_, { id }, ctx) {
    return query(_, {id}, ctx , approvalsRef);
   }
};

module.exports = { approvals };
