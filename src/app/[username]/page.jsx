'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserPage({ params }) {
  const { username } = params;

  useEffect(() => {
    // Perform some action based on the username
    console.log("Username from URL:", username);
    // You can fetch data or handle other tasks here using the username
  }, [username]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
    </div>
  );
}

export default UserPage;