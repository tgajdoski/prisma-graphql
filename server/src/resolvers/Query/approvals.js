const { getUserId, ApprovalStatus, PublishStatu } = require("../../utils");
const admin = require("firebase-admin");
const { query } = require("../query");
const functions = require("firebase-functions");
const Lodash = require("lodash");
var serviceAccount = require("../../qnary-dev.json");

admin.initializeApp({
  apiKey: "AIzaSyAL5jNakQk8PqF89f8rfS6TCedm0oFlBZ4",
  authDomain: "qnary-dev.firebaseapp.com",
  databaseURL: "https://qnary-dev.firebaseio.com",
  messagingSenderId: "582735679903",
  projectId: "qnary-dev",
  storageBucket: "qnary-dev.appspot.com",
  // apiKey: "AIzaSyDNDVQg4RncRKYr5r9O1GZrQOsv24NLd64",
  // authDomain: "qnary-my-fb.firebaseapp.com",
  // databaseURL: "https://qnary-my-fb.firebaseio.com",
  // messagingSenderId: "582735679903",
  // projectId: "qnary-my-fb",
  // storageBucket: "qnary-my-fb.appspot.com",
  credential: admin.credential.cert(serviceAccount)
});

const approvalsRef = admin.database().ref("approvals");
const orgsuserappRef = admin.database().ref("organization_user_approvals");

function isApproved(approval) {
  return approval.status === ApprovalStatus.Approved;
}
function isRejected(approval) {
  return approval.status === ApprovalStatus.Rejected;
}
function isPending(approval) {
  return approval.status === ApprovalStatus.Sent;
}

const approvals = {
  approvals(_, {}, ctx) {
    return query({}, ctx, approvalsRef);
  },
  approval(_, { id }, ctx) {
    return query({ id }, ctx, approvalsRef);
  },
  async userapprovals(_, { oid, uid, status }, ctx) {
   // if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    const orgsuserappRef = admin.database().ref(`organization_user_approvals/${oid}/${uid}`);
    let userApprovalsSnap =  !Lodash.isNil(status) ?
    (await orgsuserappRef.orderByChild("status").equalTo(status).once("value"))
    :
    (await orgsuserappRef.once("value"));
      
    async function getApproval(aid) {
      let approvalSnap = await approvalsRef.child(`${aid}`).once("value");
      return approvalSnap;
    }
    let approvalsPromises = [];
    userApprovalsSnap.forEach(snap => {
        let aid = snap.key;
      let $p = getApproval(aid);
      approvalsPromises.push($p);
    });
    let approvalsSnaps = await Promise.all(approvalsPromises);
    let returnApps = [];
    approvalsSnaps.forEach(app => {
      let id = app.key;
      let approval = app.val();
      // org_user_app status can differ from /approvals status ???
      if (Lodash.isNil(status)){
         returnApps.push(Object.assign({ id: id }, approval));
      }
      else
        if (approval.status === status)
        returnApps.push(Object.assign({ id: id }, approval));
         
    });
    return returnApps;
  }
};

module.exports = { approvals };
