const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

admin.initializeApp({
    // apiKey: 'AIzaSyAL5jNakQk8PqF89f8rfS6TCedm0oFlBZ4',
    // authDomain: 'qnary-dev.firebaseapp.com',
    // databaseURL: 'https://qnary-dev.firebaseio.com',
    // messagingSenderId: '582735679903',
    // projectId: 'qnary-dev',
    // storageBucket: 'qnary-dev.appspot.com',
    apiKey: 'AIzaSyDNDVQg4RncRKYr5r9O1GZrQOsv24NLd64',
    authDomain: 'qnary-my-fb.firebaseapp.com',
    databaseURL: 'https://qnary-my-fb.firebaseio.com',
    messagingSenderId: '582735679903',
    projectId: 'qnary-my-fb',
    storageBucket: 'qnary-my-fb.appspot.com',
  });
  
const approvalsRef = admin.database().ref('approvals');

const approvals = {
    async approvals(_, { }, { token }) {
        // let uid = await admin.auth().verifyIdToken(token);
      //   console.log('uid:', uid);
         return approvalsRef.once('value')
           .then(snapshot => {
             const approvals = snapshot.val();
             if (approvals === null) return [];
             return Object.keys(approvals).map(o => Object.assign({ id: o }, approvals[o]));
           });
       },
       async approval(_, { id }, { token }) {
       //  let uid = await admin.auth().verifyIdToken(token);
         return admin.database().ref(`approvals/${id}`).once('value')
           .then(snapshot => {
             const approval = snapshot.val();
             return Object.assign({ id: id }, approval)
             // console.log('approval' , approval);
           });
       },
}

module.exports = { approvals }
