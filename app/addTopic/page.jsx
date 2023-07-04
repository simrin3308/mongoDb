import React from "react";

const page = () => {
  return (
    <form className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Topic"
        className="border border-slate-500 px-8 py-2"
      />
      <input
        type="text"
        placeholder="Topic desc"
        className="border border-slate-500 px-8 py-2"
      />
      <button className="bg-green-500 font-bold px-6 py-3 w-fit"> Add Topic</button>
    </form>
  );
};

export default page;
