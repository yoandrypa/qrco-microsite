import dynamoose from "../libs/dynamoose";

const { v4 } = require("uuid");
//const Unique = require("./unique")

// user schema
const created_at = new Date().toISOString();
const UserSchema = new dynamoose.Schema({
  id: {
    hashKey: true,
    type: String,
    default: v4
  },
  apikey: {
    type: String
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  banned_by_id: {
    type: dynamoose.THIS
  },
  cooldowns: {
    type: Array,
    schema: [String]
  },
  created_at: {
    type: String,
    required: true,
    default: created_at
  },
  updated_at: {
    type: String,
    required: true,
    default: created_at
  }
});

export const User = dynamoose.model("users", UserSchema);

// export const {save} = async (user) => {
//     let res = await dynamoose.transaction([
//         user.transaction.create(user),
//         Unique.transaction.create({_value: user.email, _type: "user_email"})
//     ]);
//     if (!res) {
//         res = user.findOne({"email": {"eq": user.email}})
//     }
//     return res
// }

User.methods.set("findOne", async function(criteria: any) {
  // @ts-ignore
  const results = await this.scan(criteria).exec();
  return results[0];
});
