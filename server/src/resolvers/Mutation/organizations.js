const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const orgsRef = admin.database().ref('organizations');

const organizations_mutation = {
  async createOrganization(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    return (
      new Promise((resolve) => {
        const org = orgsRef.push(input, () => {
          resolve(Object.assign({ id: org.key }, input)
          );
        });
      })
    );
  },
  async updateOrganization(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const orgRef = orgsRef.child(input.id);
    return orgRef.once('value')
      .then(snapshot => {
        const org = snapshot.val();
        if (org === null) throw new Error('404');
        return org;
      })
      .then((org) => {
        const update = Object.assign(org, input);
        delete update.id;
        return orgRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
      });
  },
  async deleteOrganization(_, { input }, { token }) {
    let uid = await admin.auth().verifyIdToken(token);
    const orgRef = groupsRef.child(input.id);
    return orgRef.once('value')
      .then((snapshot) => {
        const org = snapshot.val();
        if (org === null) throw new Error('404');
        return Object.assign({ id: input.id }, org);
      })
      .then(org => orgRef.remove().then(() => (org)));
  },
}

module.exports = { organizations_mutation }
