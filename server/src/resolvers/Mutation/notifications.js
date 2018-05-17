const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const notificationRef = admin.database().ref('notifications');

const notifications_mutation = {
   createNotification(_, {input }, ctx) {
    let notificationplatformRef = notificationRef.child(`/${input.platform}/${input.device.id}`)
    return (
      new Promise((resolve) => {
        const obj = notificationplatformRef.set(input, () => {
         // resolve(Object.assign({ id: input.device.id }, input))
          resolve(input);
        });
      })
    );
  },
   updateNotification(_, {input }, ctx) {
    let notificationplatformRef = notificationRef.child(`/${input.platform}/${input.device.id}`)
    return notificationplatformRef.once('value')
    .then(snapshot => {
        const obj = snapshot.val();
        if (obj === null) throw new Error('404');
        return obj;
    })
    .then((obj) => {
        const update = Object.assign(obj, input);
        delete update.id;
        return notificationplatformRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
    });
  },
   deleteNotification(_, { input }, ctx) {
    let notificationplatformRef = notificationRef.child(`/${input.platform}/${input.id}`)
    return notificationplatformRef.once('value')
    .then((snapshot) => {
      const obj = snapshot.val();
      if (obj === null) throw new Error('404');
      return Object.assign({ id: input.id }, obj);
    })
    .then(obj => notificationplatformRef.remove().then(() => (obj)));
  },
}

module.exports = { notifications_mutation }
