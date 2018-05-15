const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

 
const approvalsRef = admin.database().ref('approvals');

const approvals_mutation = {
   createApproval(_, {input }, ctx) {
    return create_mutation({input}, ctx, approvalsRef)
  },
  // async createApproval(_, { input }, { token }) {
  // if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
  //   return (
  //     new Promise((resolve) => {
  //       const approval = approvalsRef.push(input, () => {
  //         resolve(Object.assign({ id: approval.key }, input)
  //         );
  //       });
  //     })
  //   );
  // },

  updateApproval(_, {input }, ctx) {
    return update_mutation({input}, ctx, approvalsRef)
  },

  // async updateApproval(_, { input }, { token }) {
  //  // if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
  //     const approvalRef = approvalsRef.child(input.id);
  //   return approvalRef.once('value')
  //     .then(snapshot => {
  //       const approval = snapshot.val();
  //       if (approval === null) throw new Error('404');
  //       return approval;
  //     })
  //     .then((approval) => {
  //       const update = Object.assign(approval, input);
  //       delete update.id;
  //       return approvalRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
  //     });
  // },
  async deleteApproval(_, { input }, ctx) {
    return delete_mutation({input}, ctx, approvalsRef)
  },

  // async deleteApproval(_, { input }, { token }) {
  //  //  if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`) 
  //   const approvalRef = approvalsRef.child(input.id);
  //   return approvalRef.once('value')
  //     .then((snapshot) => {
  //       const approval = snapshot.val();
  //       if (approval === null) throw new Error('404');
  //       return Object.assign({ id: input.id }, approval);
  //     })
  //     .then(approval => approvalRef.remove().then(() => (approval)));
  // },
}

module.exports = { approvals_mutation }
