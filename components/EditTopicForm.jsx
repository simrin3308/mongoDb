"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({ title, description, id }) => {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/create/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        type="text"
        placeholder="Topic"
        className="border border-slate-500 px-8 py-2"
        value={newTitle}
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        type="text"
        placeholder="Topic desc"
        className="border border-slate-500 px-8 py-2"
        value={newDescription}
      />
      <button type="submit" className="bg-green-500 font-bold px-6 py-3 w-fit">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
