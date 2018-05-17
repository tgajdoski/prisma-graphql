const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

const groupsRef = admin.database().ref('groups');

const groups_mutation = {
   createGroup(_, { input }, ctx) {
    return create_mutation({input}, ctx, groupsRef);
  },
   updateGroup(_, { input }, ctx) {
    return update_mutation({input}, ctx, groupsRef);
  },
  deleteGroup(_, { input }, ctx) {
    return delete_mutation({input}, ctx, groupsRef);
  },
}

module.exports = { groups_mutation }
