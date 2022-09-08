import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'ID is required!']
    },
    name: String,
    email: {
      type: String,
      required: true,
      match: /.+@.+\..+/,
      unique: true
    },
    roles: [String],
    contacts: [mongoose.Types.ObjectId],
    lastSeen: Date,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * @param {Number} id
 * @param {String} name
 * @param {String} email
 * @param {[String]} roles
 * @returns {Object} new user object created
 * @memberOf User
 */
userSchema.statics.createUser = async function (id, name, email, roles = ['user']) {
  try {
    return await this.create({
      id: id,
      name: name,
      email: email,
      roles: roles,
      lastSeen: Date.now(),
    });
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Number} id
 * @param {String} name
 * @param {String} email
 * @param {[String]} roles
 * @returns {Object}
 * @memberOf User
 */
userSchema.statics.updateUser = async function(id, name, email, roles = ['user']) {
  try {
    return await this.findOneAndUpdate({id: id}, {
      name: name,
      email: email,
      roles: roles,
      lastSeen: Date.now(),
    })
  } catch (error) {
    throw error;
  }
}

/**
 * @param {Object} filters
 * @param {Number} limit
 * @returns {Object}
 * @memberOf User
 */
userSchema.statics.findUser = async function(filters, limit = 30) {
  return this.find(filters).limit(limit);
}

const User = mongoose.model("User", userSchema);
export default User
