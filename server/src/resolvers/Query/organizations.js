const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('./query');
const Lodash = require('lodash');

const orgsRef = admin.database().ref('organizations');

const organizations = {
  async organizations(_, { }, ctx) {
    return  query(_, {}, ctx , orgsRef);
   },
   async organization(_, { id }, ctx) {
    return  query(_, { id }, ctx , orgsRef);
   },
}

module.exports = { organizations }
