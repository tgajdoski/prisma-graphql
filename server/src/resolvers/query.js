
const admin = require("firebase-admin");
var serviceAccount = require('../qnary-my-fb.json');
const Lodash = require("lodash");

const query = async ({ id }, ctx, ref) => {
  //  if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
  console.log('CCC' , id);
    if (!Lodash.isNil(id))
        ref = ref.child(`/${id}`)
    let value = await admin.database().ref(ref).once("value")
    const res = value.val();
        if (Lodash.isNil(id))
            return   Object.keys(res).map(o =>
            Object.assign({ id: o }, res[o])
        );
        return Object.assign({ id: id }, res);
   }

 module.exports = { query }
