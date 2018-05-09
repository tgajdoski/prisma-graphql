const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const groupsRef = admin.database().ref('groups');

const groups_mutation = {
  async createGroup(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    return (
      new Promise((resolve) => {
        const group = groupsRef.push(input, () => {
          resolve(Object.assign({ id: group.key }, input)
          );
        });
      })
    );
  },
  async updateGroup(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const groupRef = groupsRef.child(input.id);
    return groupRef.once('value')
      .then(snapshot => {
        const group = snapshot.val();
        if (group === null) throw new Error('404');
        return group;
      })
      .then((group) => {
        const update = Object.assign(group, input);
        delete update.id;
        return groupRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
      });
  },
  async deleteGroup(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const groupRef = groupsRef.child(input.id);
    return groupRef.once('value')
      .then((snapshot) => {
        const group = snapshot.val();
        if (group === null) throw new Error('404');
        return Object.assign({ id: input.id }, group);
      })
      .then(conn => groupRef.remove().then(() => (group)));
  },
}

module.exports = { groups_mutation }
