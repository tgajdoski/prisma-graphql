// const { Query } = require('./Query/Query')
const { approvals } = require('./Query/approvals')
const { groups } = require('./Query/groups')
const { organizations } = require('./Query/organizations')
const { devices } = require('./Query/devices')
const { connections } = require('./Query/connections')
const { organization_user_approvals } = require('./Query/organization_user_approval')


const { approvals_mutation } = require('./Mutation/approvals')
const { organization_User_approval_mutation } = require('./Mutation/organization_user_approval')
const { groups_mutation } = require('./Mutation/groups')
const { organizations_mutation } = require('./Mutation/organizations')
const { devices_mutation } = require('./Mutation/devices')
const { connections_mutation } = require('./Mutation/connections')
const { organization_user_approvals_mutation } = require('./Mutation/organization_user_approval')
// const { Subscription } = require('./Subscription')
// const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query: {
    ...approvals,
    ...organizations,
    ...organization_user_approvals,
    ...groups,
    ...devices,
    ...connections,
  },
  Mutation: {
    ...approvals_mutation,
    ...organizations_mutation,
    ...organization_user_approvals_mutation,
    ...groups_mutation,
    ...devices_mutation,
    ...connections_mutation,
  }
  // Subscription,
  // AuthPayload,
}
