const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

const connectionsRef = admin.database().ref('connections');

const connections_mutation = {
  createConnection(_, { input }, ctx) {
    return create_mutation({input}, ctx, connectionsRef);
  },
  updateConnection(_, { input }, ctx) {
    return update_mutation({input}, ctx, connectionsRef);
  },
  deleteConnection(_, { input }, ctx) {
    return delete_mutation({input}, ctx, connectionsRef);
   },
  }
  
  module.exports = { connections_mutation }
