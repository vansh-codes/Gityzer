"use client";

import { useEffect, useState, useRef } from "react";
import Canvas from "@/components/Canvas";
import processUserData from "@/app/api/github_profile/user";
import generateTagline from "@/app/api/generate_tagline/generateTagline";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function Badge({ params }) {
  const username = params.username;
  const router = useRouter();
  const canvasRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tagline, setTagline] = useState("");
  const [taglineGenerated, setTaglineGenerated] = useState(false);
  const [userFetched, setUserFetched] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [config, setConfig] = useState({
    theme: "dark",
    font: "helvetica",
    pattern: "shape 1",
    update: "14",
    image: "",
    username: true,
    tagline: true,
    lang: false,
    star: false,
    fork: false,
    issue: false,
    UserName: username,
    Tagline: tagline,
    star_count: 0,
    fork_count: 0,
    issue_count: 0,
  });

  const prevConfigRef = useRef(config);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateURL = () => {
    const params = new URLSearchParams();
    const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "issue_count", "update"];
    Object.entries(config).forEach(([key, value]) => {
      if (!excludeKeys.includes(key) && value !== false && value !== "" && value !== null) {
        params.set(key, value);
      }
    });
    router.replace(`/${username}?${params.toString()}`, undefined, { shallow: true, scroll: false });
  };

  useEffect(() => {
    if (JSON.stringify(prevConfigRef.current) !== JSON.stringify(config)) {
      updateURL();
      prevConfigRef.current = config;
    }
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
      setLoading(true);
      const res = await fetch("../api/github_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data);
        const processed = processUserData(data.repos);
        setProcessedData(processed);
      } else {
        setUserData(new Error("Failed to fetch user data."));
      }
    } catch (error) {
      setUserData(new Error("Failed to fetch user data."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userFetched) {
      handleUser();
      setUserFetched(true);
    }
  }, [userFetched]);

  useEffect(() => {
    if (userFetched && userData !== null && !loading) {
      const Languages = {};
      const Description = {};
      let starCount = 0;
      let forkCount = 0;
      let issueCount = 0;

      userData.forEach((item) => {
        if (item.language) {
          Languages[item.language] = (Languages[item.language] || 0) + 1;
        }
        if (item.description) {
          Description[item.name] = item.description;
        }
        if (item.stargazers_count) {
          starCount += item.stargazers_count;
        }
        if (item.forks_count) {
          forkCount += item.forks_count;
        }
        if (item.open_issues_count) {
          issueCount += item.open_issues_count;
        }
      });

      setConfig((prevConfig) => ({
        ...prevConfig,
        star_count: starCount,
        fork_count: forkCount,
        issue_count: issueCount,
      }));
    }
  }, [userFetched, userData, loading]);

  const handleGenerate = async () => {
    const input = {
      username: username,
      Languages: processedData?.Languages || {},
      Description: processedData?.Description || {},
      config: config,
    };

    try {
      const tagline = await generateTagline(input);
      setTagline(tagline);
    } catch (error) {
      console.error("Error:", error.message);
      setTagline("Failed to generate a tagline. Please try again.");
    }
  };

  useEffect(() => {
    if (!loading && userData !== null && !taglineGenerated) {
      handleGenerate();
      setTaglineGenerated(true);
    }
  }, [loading, userData]);

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      Tagline: tagline,
    }));
  }, [tagline]);

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
    toast.success("Image downloaded successfully!");
  };

  const exportMarkdown = () => {
    toast.error("Sorry, this feature is not available yet.");
  };

  const exportURL = () => {
    toast.error("Sorry, this feature is not available yet.");
  };

  const exportImg = () => {
    toast.error("Sorry, this feature is not available yet.");
  };

  return (
    <div className='min-h-screen text-white relative flex flex-col gap-2' >
      <div className="flex gap-10 items-center justify-center mb-2 h-[360px]">
        {/* Conditionally render Canvas only if tagline exists */}
        {tagline && tagline.trim() ? (
          <Canvas config={config} ref={canvasRef} />
        ) : (
          <p>Loading your badge...</p>
        )}
      </div>
      <div className="text-justify font-semibold font-mono flex bg-slate-800 bg-opacity-80 rounded-xl p-4 shadow-lg gap-8 items-center justify-center w-[50vw] mx-auto">
        <button 
          onClick={exportMarkdown}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/markdown.svg" alt="" width="20" />
          MARKDOWN
        </button>
        <button
          onClick={exportCanvas}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]"
        >
          <img src="/download.svg" alt="" width="20" />
          DOWNLOAD
        </button>
        <button 
          onClick={exportURL}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/url.svg" alt="" width="20" />
          URL
        </button>
        <button 
          onClick={exportImg}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] w-[120px]">
          <img src="/img.svg" alt="" width="20" />
          &lt;IMG /&gt;
        </button>
      </div>
      <div className="max-w-6xl mx-auto mb-2 bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-lg h-fit w-[50vw] items-center justify-center font-medium">
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
      <Toaster />
    </div>
  );
}
