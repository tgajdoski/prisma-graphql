const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('./query');
const Lodash = require('lodash');


const connectionsRef = admin.database().ref('connections');

const connections = {
    async  connections(_, { }, ctx) {
      return  query(_, {}, ctx , connectionsRef);
        },
    async connection(_, { id }, ctx ) {
      return  query(_, { id }, ctx , connectionsRef);
        },
  }
  
  module.exports = { connections }
