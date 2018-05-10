
const admin = require("firebase-admin");
var serviceAccount = require('../../qnary-my-fb.json');
const Lodash = require("lodash");

const query = async (_, { id }, ctx, ref) => {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    if (!Lodash.isNil(id))
        ref = ref.child(`/${id}`)
    return await admin
      .database()
      .ref(ref)
      .once("value")
      .then(snapshot => {
        const res = snapshot.val();
        if (Lodash.isNil(id))
            return   Object.keys(res).map(o =>
            Object.assign({ id: o }, res[o])
        );
        return Object.assign({ id: id }, res);
      });
  }
  

 module.exports = { query }
