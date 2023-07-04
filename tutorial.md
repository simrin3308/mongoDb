dependencies > create db > connectMongodb > modelSchema >

1. npm i mongoose
2. Create a db in MONGODB atlas
3. Connect MongoDb
   libs/connectMDB.js

```js
import mongoose from "mongoose";

const connectMongoDb = () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
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

5. Create Topic in MongoDb or Creation in MongoDb

- Create a api route
  app/api/create/route.js

<!-- TO CHECK WITH POSTMAN -->

```js
import connectMongoDb from "@/libs/connectMongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  // destructure what we got from frontend.
  const { title, description } = await request.json();

  // connect with mongodb
  await connectMongoDb();

  // once connected create TOPIC. Import TOPIC from models schema.
  await Topic.create({ title, description });

  // return the next response in json and check via postman if everything is working
  return NextResponse.json(
    { message: "Topic Created" },
    {
      status: 201,
    }
  );
}
```

6. Get all the Topics

```js
// Get all topics
export async function GET() {
  // connect with mongodb
  await connectMongoDb();

  // store all topics in the variable.
  const topics = await Topic.find();

  // return the response with topics
  return NextResponse.json({ topics });
}
```
