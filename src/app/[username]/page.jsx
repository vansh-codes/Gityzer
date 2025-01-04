"use client";

import { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { useRouter } from "next/navigation";

export default function Badge({ params }) {
  const username = params.username;
  const router = useRouter();
  const [userData, setUserData] = useState(null); // user's github data
  const [loading, setLoading] = useState(true);   // Loading state
  const [Tagline, setTagline] = useState("");
  const [taglineGenerated, setTaglineGenerated] = useState(false);
  const [userFetched, setUserFetched] = useState(false);
  const Languages = {};
  const Description = {};
  const Stars = {};
  const Forks = {};
  const Issues = {};
  const [config, setConfig] = useState({
    theme: "dark",
    font: "helvetica",
    pattern: "shape 1",
    update: "14", // future implementation
    image: "",
    username: true,
    tagline: true,
    lang: false, // future implementation
    star: false,
    fork: false,
    issue: false,
    UserName: username,
    Tagline: Tagline,
    star_count: 0,
    fork_count: 0,
    issue_count: 0,
  });

  // Utility function to update the URL
  const updateURL = () => {
    const params = new URLSearchParams();

    // List of keys to exclude from the URL
    const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "issue_count"];

    Object.entries(config).forEach(([key, value]) => {
      if (!excludeKeys.includes(key) && value !== false && value !== "" && value !== null) {
        params.set(key, value);
      }
    });

    router.replace(`/${username}?${params.toString()}`, undefined, { shallow: true });
  };

  // Handle changes to config and update the URL
  useEffect(() => {
    updateURL();
  }, [config]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUser = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const res = await fetch("../api/github_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (res.ok) {
        setUserData(data);
      } else {
        setUserData(new Error("Failed to fetch user data."));
      }
    } catch (error) {
      setUserData(new Error("Failed to fetch user data."));
    } finally {
      setLoading(false); // Data loading complete
    }
  };

  useEffect(() => {
    if (!userFetched) {
      handleUser();
      setUserFetched(true);
    }
  }, [userFetched]);

  useEffect(() => {
    if (userData !== null && !loading) {
      userData.forEach((item) => {
        if (item.language !== null) {
          Languages[item.language] = (Languages[item.language] || 0) + 1;
        }

        if (item.description !== null) {
          Description[item.name] = item.description;
        }
        if (item.stargazers_count !== null) {
          Stars[item.name] = item.stargazers_count;
        }
        if (item.forks_count !== null) {
          Forks[item.name] = item.forks_count;
        }
        if (item.open_issues_count !== null) {
          Issues[item.name] = item.open_issues_count;
        }
      });

      const stars = userData.reduce(
        (acc, item) => acc + (item.stargazers_count || 0),
        0
      );
      const forks = userData.reduce(
        (acc, item) => acc + (item.forks_count || 0),
        0
      );
      const issues = userData.reduce(
        (acc, item) => acc + (item.open_issues_count || 0),
        0
      );

      setConfig((prevConfig) => ({
        ...prevConfig,
        star_count: stars,
        fork_count: forks,
        issue_count: issues,
      }));
    }
  }, [userData, loading]);

  const handleGenerate = async () => {
    const prompt = `Generate a unique tagline for ${username} based on their GitHub profile activity:

                    The user works with the following languages: ${Object.keys(Languages).join(
      ", "
    )}  
                    Repo highlights:  
                    ${Object.entries(Description)
        .map(([repo, desc]) => `${repo}: ${desc}`)
        .join(", ")}  
                    Total Stars: ${config.star_count}, Total Forks: ${config.fork_count}, Total Issues: ${config.issue_count}  

                    The tagline should summarize their impact and versatility in 100 characters or less, in a meaningful tone.

                    Only generate one tagline.`;


    try {
      const res = await fetch("../api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.success) {
        setTagline(data.response);
      } else {
        console.warn("Error generating tagline!", data.error)
        setTagline(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error in tagline generation", error)
      setTagline("Error communicating with the server.");
    }
  };

  useEffect(() => {
    if (!loading && userData !== null && !taglineGenerated) {
      handleGenerate(); // Trigger tagline generation only after data is loaded
      setTaglineGenerated(true);
    }
  }, [loading, userData]);

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      Tagline, // Sync the tagline to the config
    }));
  }, [Tagline]);


  return (
    <div className='min-h-screen text-white p-4 md:p-6 relative flex flex-col gap-2' >
      <div className="flex gap-10 items-center justify-center h-[450px]">
        {/* Conditionally render Canvas only if tagline exists */}
        {Tagline && Tagline.trim() ? (
          <Canvas config={config} />
        ) : (
          <p>Loading your badge...</p>
        )}
      </div>
      <div className='max-w-6xl mx-auto mb-10 bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-lg h-fit w-[50vw] items-center justify-center font-medium'>
        <form className="flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-7">
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="theme">Theme</label>
                <select
                  name="theme"
                  id="theme"
                  value={config.theme}
                  onChange={handleChange}
                  className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="font">Font</label>
                <select
                  name="font"
                  id="font"
                  value={config.font}
                  onChange={handleChange}
                  className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
                >
                  <option value="helvetica">Helvetica</option>
                  <option value="arial">Arial</option>
                  <option value="times_new_roman">Times New Roman</option>
                  <option value="calibri">Calibri</option>
                  <option value="verdana">Verdana</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="pattern">Pattern</label>
                <select
                  name="pattern"
                  id="pattern"
                  value={config.pattern}
                  onChange={handleChange}
                  className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[100px]"
                >
                  <option value="shape 1">Shape 1</option>
                  <option value="shape 2">Shape 2</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center col-span-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="image">Image URL (Optional)</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Enter image URL"
                  value={config.image}
                  onChange={handleChange}
                  className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-[40vw] h-8 resize-none break-normal"
                  style={{
                    overflowX: "scroll",
                    overflowY: "hidden",
                    scrollbarWidth: "none", // For Firefox
                    msOverflowStyle: "none" // For Internet Explorer
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-7">
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="star"
                checked={config.star}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Star</label>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="fork"
                checked={config.fork}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Fork</label>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="issue"
                checked={config.issue}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Issue</label>
            </div>
            {/* Add more checkboxes similar to this for other fields */}
          </div>
        </form>
      </div>
    </div>
  );
}
