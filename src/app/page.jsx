import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateUserTagline } from "../api/ai/route";

function UserPage({ params }) {
  const { username } = params;
  const router = useRouter();
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const fetchTagline = async () => {
      const response = await fetch(`/api/ai?username=${username}`);
      const data = await response.json();
      if (data.exists) {
        setTagline(data.tagline);
      } else {
        setTagline("No tagline available");
      }
    };
    fetchTagline();
  }, [username]);

  return (
    <div>
      <h1>{tagline}</h1>
    </div>
  );
}

export default UserPage;