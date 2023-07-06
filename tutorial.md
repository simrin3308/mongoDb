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

mongoose.models = {};
module.exports = mongoose.model.Topic || mongoose.model("Topic", topicSchema);
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

<!-- FROM front end -->

```js
const router = useRouter();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title || !description) {
    alert("Title and Description are required");
  }

  try {
    const res = await fetch(`http://localhost:3000/api/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push("/");
      alert("Topic Created");
    } else {
      throw new Error("Failed To Create");
    }
  } catch (error) {
    console.log(error);
  }
};
```

6. Get all the Topics
<!-- TO CHECK WITH POSTMAN -->

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

<!-- From Front End -->

- We have a route in api called create. In the create we have written the

```js
const GetTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/create", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Topics");
    }

    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};
```

7. Delete with mongodb
<!-- TO CHECK WITH POSTMAN -->

```js
// Delete one topic

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  // connect with mongodb
  await connectMongoDb();

  // find and delete
  await Topic.findByIdAndDelete(id);

  // return response
  return NextResponse.json(
    { message: "Topic Deleted" },
    {
      status: 200,
    }
  );
}
```

<!-- From front end -->

```js
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const RemoveBtn = ({ id }) => {
  // we get this id from map method as a prop from parent

  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are You Sure?");

    if (confirmed) {
      // in delete we need id in search params
      const res = await fetch(`http://localhost:3000/api/create?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeTopic} className="bg-red-500 px-3 py-1 rounded-2xl">
      Remove
    </button>
  );
};

export default RemoveBtn;
```

8. Update with mdb
<!-- TO CHECK WITH POSTMAN -->

```js
export async function PUT(request, { params }) {
  const { id } = params;

  const { newTitle: title, newDescription: description } = await request.json();

  await connectMongoDb();

  await Topic.findByIdAndUpdate(id, { title, description });

  return NextResponse.json(
    { message: "message updated" },
    {
      status: 200,
    }
  );
}
```

9. Get Element By Id
<!-- TO CHECK WITH POSTMAN -->

```js
// Get element By Id
export async function GET(request, { params }) {
  const { id } = params;

  const topic = await Topic.findOne({ _id: id });

  return NextResponse.json(
    { topic },
    {
      status: 200,
    }
  );
}
```
