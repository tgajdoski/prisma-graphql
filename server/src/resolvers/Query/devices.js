const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const  { query } = require('./query');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const devicesRef = admin.database().ref('devices');

const devices = {
  async devices(_, { }, ctx) {
    return  query(_, {}, ctx , devicesRef);
    },
    async device(_, { id }, ctx) {
      return  query(_, { id }, ctx , devicesRef);
    },
}

module.exports = { devices }
