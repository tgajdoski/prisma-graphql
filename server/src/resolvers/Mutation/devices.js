const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

const devicesRef = admin.database().ref('devices');

const devices_mutation = {
  createDevice(_, { input }, ctx) {
    return create_mutation({input}, ctx, devicesRef);
  },
  updateDevice(_, { input }, ctx) {
    return update_mutation({input}, ctx, devicesRef);
  },
  deleteDevice(_, { input }, ctx) {
    return delete_mutation({input}, ctx, devicesRef);
  },
}

module.exports = { devices_mutation }
