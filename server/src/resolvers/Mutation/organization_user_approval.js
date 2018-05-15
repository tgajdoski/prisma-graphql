const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const orgsusrappRef = admin.database().ref('organization_user_approvals');

const organization_user_approvals_mutation = {
  async createOrganizationUserApproval(_, { input }, { token }) {
   // let uid = await admin.auth().verifyIdToken(token);
   const orgRef = orgsusrappRef.child(`${input.oid}/${input.uid}`);
    return (
      new Promise((resolve) => {
        const org = orgRef.push(input, () => {
          resolve(Object.assign({ id: org.key }, input)
          );
        });
      })
    );
  },
  async updateOrganizationUserApproval(_, { input }, { token }) {
   //  let uid = await admin.auth().verifyIdToken(token);
   console.log('AAAA' , input.oid, input.uid,  input.id);
    const orgRef = orgsusrappRef.child(`${input.oid}/${input.uid}/${input.id}`);
    console.log('BBB' , orgRef.toString());
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
  async deleteOrganizationUserApporval(_, { input }, { token }) {
  //  let uid = await admin.auth().verifyIdToken(token);
  console.log('AAAA' , input.oid, input.uid,  input.id);
  const orgRef = orgsusrappRef.child(`${input.oid}/${input.uid}/${input.id}`);
  console.log('BBB' , orgRef.toString());
    return orgRef.once('value')
      .then((snapshot) => {
        const org = snapshot.val();
        if (org === null) throw new Error('404');
        return Object.assign({ id: input.id }, org);
      })
      .then(org => orgRef.remove().then(() => (org)));
  },
}

module.exports = { organization_user_approvals_mutation }
