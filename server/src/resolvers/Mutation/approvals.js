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
   updateApproval(_, {input }, ctx) {
    return update_mutation({input}, ctx, approvalsRef)
  },
   deleteApproval(_, { input }, ctx) {
    return delete_mutation({input}, ctx, approvalsRef)
  },
}

module.exports = { approvals_mutation }
