const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');


const connectionsRef = admin.database().ref('connections');

const connections_mutation = {
  async createConnection(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    return (
      new Promise((resolve) => {
        const connection = connectionsRef.push(input, () => {
          resolve(Object.assign({ id: connection.key }, input)
          );
        });
      })
    );
  },
  async updateConnection(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const connRef = connectionsRef.child(input.id);
    return connRef.once('value')
      .then(snapshot => {
        const conn = snapshot.val();
        if (conn === null) throw new Error('404');
        return conn;
      })
      .then((conn) => {
        const update = Object.assign(conn, input);
        delete update.id;
        return connRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
      });
  },
  async deleteConnection(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const connRef = connectionsRef.child(input.id);
    return connRef.once('value')
      .then((snapshot) => {
        const conn = snapshot.val();
        if (conn === null) throw new Error('404');
        return Object.assign({ id: input.id }, conn);
      })
      .then(conn => connRef.remove().then(() => (conn)));
  },
  }
  
  module.exports = { connections_mutation }
