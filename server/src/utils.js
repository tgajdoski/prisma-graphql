const jwt = require('jsonwebtoken')

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

const ApprovalStatus = {
  Approved: 'approved',
  Rejected: 'rejected',
  Draft: 'draft',
  Sent: 'sent',
  Deleted: 'deleted',
};


const PublishStatus = {
  Error: "error",
  Republish: "republish",
  Published: "published",
};


module.exports = {
  getUserId,
  AuthError,
  ApprovalStatus,
  PublishStatus
}