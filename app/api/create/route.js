import connectMongoDb from "@/libs/connectMongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDb();

  await Topic.create({ title, description });

  return NextResponse.json(
    { message: "Topic Created" },
    {
      status: 201,
    }
  );
}

// Get all topics
export async function GET() {
  // connect with mongodb
  await connectMongoDb();

  // store all topics in the variable.
  const topics = await Topic.find();

  // return the response with topics
  return NextResponse.json({ topics });
}

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
