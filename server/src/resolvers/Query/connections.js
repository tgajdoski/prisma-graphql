const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');


const connectionsRef = admin.database().ref('connections');

const connections = {
    async  connections(_, { }, { token }) {
        //  let uid = await admin.auth().verifyIdToken(token);
          return connectionsRef.once('value')
            .then(snapshot => {
              const connections = snapshot.val();
              if (connections === null) return [];
              return Object.keys(connections).map(o => Object.assign({ id: o }, connections[o]));
            });
        },
        async connection(_, { id }, { token }) {
        //  let uid = await admin.auth().verifyIdToken(token);
          return admin.database().ref(`connections/${id}`).once('value')
            .then(snapshot => {
              const connection = snapshot.val();
              return Object.assign({ id: id }, connection)
              // console.log('approval' , approval);
            });
        },
  }
  
  module.exports = { connections }
