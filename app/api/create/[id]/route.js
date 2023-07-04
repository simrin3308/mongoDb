import connectMongoDb from "@/libs/connectMongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

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



// Get element By Id