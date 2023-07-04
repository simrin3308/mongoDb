const { Schema, default: mongoose } = require("mongoose");

const topicSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
module.exports = mongoose.model.Topic || mongoose.model("Topic", topicSchema);
