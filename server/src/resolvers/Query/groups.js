const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const  { query } = require('./query');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const groupsRef = admin.database().ref('groups');

const groups = {
  async  groups(_, { }, ctx) {
    return  query(_, {}, ctx , groupsRef);
    },
    async group(_, { id }, ctx) {
      return  query(_, { id }, ctx , groupsRef);
    },
}

module.exports = { groups }
