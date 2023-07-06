"use client";
import { useRouter } from "next/navigation";
import React from "react";

const RemoveBtn = ({ id }) => {
  // In delete we get the id as searchParams
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are You Sure?");

    if (confirmed) {
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
