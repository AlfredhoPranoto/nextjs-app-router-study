"use client";

import { useState } from "react";

const AdminProductPage = () => {
  const [status, setStatus] = useState("");
  const revalidate = async () => {
    const res = await fetch(
      "http://localhost:3000/api/revalidate?tag=products&secret=Lyn34",
      {
        method: "POST",
      }
    );
    const { status } = await res.json();
    if (status === 401 || status === 400) {
      setStatus("Revalidate Failed");
    } else {
      setStatus("Revalidate Success");
    }
  };
  return (
    <div
      className="w-3/6 h-96 bg-gray-300 
    rounded-[12px] flex justify-center items-center"
    >
      <h1>{status}</h1>
      <button
        className="cursor-pointer m-4 bg-black text-white p-4"
        onClick={() => revalidate()}
      >
        Revalidate
      </button>
    </div>
  );
};

export default AdminProductPage;
