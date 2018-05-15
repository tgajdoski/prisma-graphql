const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const  { query } = require('../query');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const devicesRef = admin.database().ref('devices');

const devices = {
  devices(_, { }, ctx) {
    return  query( {}, ctx , devicesRef);
    },
  device(_, { id }, ctx) {
      return  query({ id }, ctx , devicesRef);
    },
}

module.exports = { devices }
