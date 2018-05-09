const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const groupsRef = admin.database().ref('groups');

const groups = {
  async  groups(_, { }, { token }) {
    //  let uid = await admin.auth().verifyIdToken(token);
      return groupsRef.once('value')
        .then(snapshot => {
          const groups = snapshot.val();
          if (groups === null) return [];
          return Object.keys(groups).map(o => Object.assign({ id: o }, groups[o]));
        });
    },
    async group(_, { id }, { token }) {
    //  let uid = await admin.auth().verifyIdToken(token);
      return admin.database().ref(`groups/${id}`).once('value')
        .then(snapshot => {
          const group = snapshot.val();
          return Object.assign({ id: id }, group)
          // console.log('approval' , approval);
        });
    },
}

module.exports = { groups }
