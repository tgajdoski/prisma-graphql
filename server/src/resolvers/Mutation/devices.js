const { getUserId , ApprovalStatus, PublishStatu} = require('../../utils')
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const devicesRef = admin.database().ref('devices');

const devices_mutation = {
  async createDevice(_, { input }, { token }) {
 //   let uid = await admin.auth().verifyIdToken(token);
    return (
      new Promise((resolve) => {
        const device = devicesRef.push(input, () => {
          resolve(Object.assign({ id: device.key }, input)
          );
        });
      })
    );
  },
  async updateDevice(_, { input }, { token }) {
 //   let uid = await admin.auth().verifyIdToken(token);
    const deviceRef = devicesRef.child(input.id);
    return deviceRef.once('value')
      .then(snapshot => {
        const device = snapshot.val();
        if (device === null) throw new Error('404');
        return device;
      })
      .then((device) => {
        const update = Object.assign(device, input);
        delete update.id;
        return deviceRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
      });
  },
  async deleteDevice(_, { input }, { token }) {
 //   let uid = await admin.auth().verifyIdToken(token);
    const deviceRef = devicesRef.child(input.id);
    return deviceRef.once('value')
      .then((snapshot) => {
        const device = snapshot.val();
        if (device === null) throw new Error('404');
        return Object.assign({ id: input.id }, device);
      })
      .then(device => deviceRef.remove().then(() => (device)));
  },
}

module.exports = { devices_mutation }
