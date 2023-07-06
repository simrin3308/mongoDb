"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Topic"
        className="border border-slate-500 px-8 py-2"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        placeholder="Topic desc"
        className="border border-slate-500 px-8 py-2"
      />
      <button type="submit" className="bg-green-500 font-bold px-6 py-3 w-fit">
        {" "}
        Add Topic
      </button>
    </form>
  );
};

export default page;
