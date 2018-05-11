const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('./query');
const Lodash = require('lodash');

const orgsRef = admin.database().ref('organizations');

const organizations = {
  organizations(_, { }, ctx) {
    return  query({}, ctx , orgsRef);
   },
  organization(_, { id }, ctx) {
    return  query({ id }, ctx , orgsRef);
   },
}

module.exports = { organizations }
