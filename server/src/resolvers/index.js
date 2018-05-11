// const { Query } = require('./Query/Query')
const { approvals } = require('./Query/approvals')
const { groups } = require('./Query/groups')
const { organizations } = require('./Query/organizations')
const { devices } = require('./Query/devices')
const { connections } = require('./Query/connections')

const { approvals_mutation } = require('./Mutation/approvals')
const { groups_mutation } = require('./Mutation/groups')
const { organizations_mutation } = require('./Mutation/organizations')
const { devices_mutation } = require('./Mutation/devices')
const { connections_mutation } = require('./Mutation/connections')

// const { Subscription } = require('./Subscription')
// const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query: {
    ...approvals,
    ...organizations,
    ...groups,
    ...devices,
    ...connections,
  },
  Mutation: {
    ...approvals_mutation,
    ...organizations_mutation,
    ...groups_mutation,
    ...devices_mutation,
    ...connections_mutation,
  }
  // Subscription,
  // AuthPayload,
}
