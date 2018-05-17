const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

const orgsRef = admin.database().ref('organizations');

const organizations_mutation = {
  createOrganization(_, { input }, ctx) {
    return create_mutation({input}, ctx, orgsRef);
  },
  updateOrganization(_, { input }, { ctx }) {
    return update_mutation({input}, ctx, orgsRef);
  },
  deleteOrganization(_, { input },ctx) {
    return delete_mutation({input}, ctx, orgsRef);
  },
}

module.exports = { organizations_mutation }
