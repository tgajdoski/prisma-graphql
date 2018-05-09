const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

 
const approvalsRef = admin.database().ref('approvals');

const approvals_mutation = {
  async createApproval(_, { input }, { token }) {
 //   let uid = await admin.auth().verifyIdToken(token);
    return (
      new Promise((resolve) => {
        const approval = approvalsRef.push(input, () => {
          resolve(Object.assign({ id: approval.key }, input)
          );
        });
      })
    );
  },
  async updateApproval(_, { input }, { token }) {
  //  let uid = await admin.auth().verifyIdToken(token);
    const approvalRef = approvalsRef.child(input.id);
    return approvalRef.once('value')
      .then(snapshot => {
        const approval = snapshot.val();
        if (approval === null) throw new Error('404');
        return approval;
      })
      .then((approval) => {
        const update = Object.assign(approval, input);
        delete update.id;
        return approvalRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
      });
  },
  async deleteApproval(_, { input }, { token }) {
  //  let uid = await admin.auth().verifyIdToken(token);
    const approvalRef = approvalsRef.child(input.id);
    return approvalRef.once('value')
      .then((snapshot) => {
        const approval = snapshot.val();
        if (approval === null) throw new Error('404');
        return Object.assign({ id: input.id }, approval);
      })
      .then(approval => approvalRef.remove().then(() => (approval)));
  },
}

module.exports = { approvals_mutation }
