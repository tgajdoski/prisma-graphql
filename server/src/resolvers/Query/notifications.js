const admin = require("firebase-admin");
const functions = require("firebase-functions");
const  { query } = require('../query');
const Lodash = require("lodash");
var serviceAccount = require("../../qnary-dev.json");

const notificationRef = admin.database().ref('notifications');

const notifications = {
 async notifications(_, {platform}, ctx) {
      //  if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
      let notificationplatformRef = notificationRef;
    if (!Lodash.isNil(platform))
      notificationplatformRef = notificationRef.child(`/${platform}`)
    let value = await admin.database().ref(notificationplatformRef).once("value")
    const res = value.val();
    return   Object.keys(res).map(o =>
            Object.assign({ id: o }, res[o])
    )
  },
  async notification(_, { platform, id }, ctx) {
     //  if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
     let notificationplatformRef = notificationRef;
    if (!Lodash.isNil(platform) && !Lodash.isNil(id)) 
      notificationplatformRef = notificationRef.child(`/${platform}/${id}`)
    let value = await admin.database().ref(notificationplatformRef).once("value")
    const res = value.val();
        if (Lodash.isNil(id))
            return   Object.keys(res).map(o =>
            Object.assign({ id: o }, res[o])
        );
        return Object.assign({ id: id }, res);
  },
};

module.exports = { notifications };
