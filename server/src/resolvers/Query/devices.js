const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const devicesRef = admin.database().ref('devices');

const devices = {
  async devices(_, { }, { token }) {
    //  let uid = await admin.auth().verifyIdToken(token);
      return devicesRef.once('value')
        .then(snapshot => {
          const devices = snapshot.val();
          if (devices === null) return [];
          return Object.keys(devices).map(o => Object.assign({ id: o }, devices[o]));
        });
    },
    async device(_, { id }, { token }) {
   //   let uid = await admin.auth().verifyIdToken(token);
      return admin.database().ref(`devices/${id}`).once('value')
        .then(snapshot => {
          const device = snapshot.val();
          return Object.assign({ id: id }, device)
          // console.log('approval' , approval);
        });
    },
}

module.exports = { devices }
