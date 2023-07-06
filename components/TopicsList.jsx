import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";

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

const TopicsList = async () => {
  const { topics } = await GetTopics();
  return (
    <>
      {topics.map((topic) => {
        return (
          <div className="p-4 border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h2 className="font-bold text-2xl ">{topic.title}</h2>
              <div>{topic.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={topic._id} />
              <Link href={`/editTopic/${topic._id}`}>
                <button className="bg-red-500 px-3 py-1 rounded-2xl">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicsList;
