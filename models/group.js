import mongoose from "mongoose";

export const GROUP_TYPES = {
  TYPE_GROUP: "group",
  TYPE_CHANNEL: "channel",
};

const readByRecipientSchema = new mongoose.Schema(
  {
    userIds: [Number],
    type: {
      type: String,
      default: GROUP_TYPES.TYPE_CHANNEL,
    },
    createdBy: Number,
    admins: [Number],
  },
  {
    timestamps: false,
  }
);