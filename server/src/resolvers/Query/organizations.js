const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const orgsRef = admin.database().ref('organizations');

const organizations = {
  async organizations(_, { }, { token }) {
    // let uid = await admin.auth().verifyIdToken(token);
     return orgsRef.once('value')
       .then(snapshot => {
         const orgs = snapshot.val();
         if (orgs === null) return [];
         return Object.keys(orgs).map(o => Object.assign({ id: o }, orgs[o]));
       });
   },
   async organization(_, { id }, { token }) {
   //  let uid = await admin.auth().verifyIdToken(token);
     return admin.database().ref(`oraganizations/${id}`).once('value')
       .then(snapshot => {
         const org = snapshot.val();
         return Object.assign({ id: id }, org)
         // console.log('approval' , approval);
       });
   },
}

module.exports = { organizations }
