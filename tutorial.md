dependencies > create db > connectMongodb > modelSchema > 

1. npm i mongoose
2. Create a db in MONGODB atlas
3. Connect MongoDb
   libs/connectMDB.js

```js
import mongoose from "mongoose";

const connectMongoDb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected MongoDb");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDb;
```

4. Create Model folder
   /models/topic.js

4.1> We need to create the models or the format we need to store data in mongodb. Like here we have 2 input fields. One is title, and other is description. So we need to have one schema with 2 fields. Title and Description.

```js
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

const Topic = mongoose.model.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
```

