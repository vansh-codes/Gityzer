"use client";

import { useEffect, useState, useRef } from "react";
import Canvas from "@/components/Canvas";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import UserConfig from "@/app/api/userconfig/route";
import UserCard from "@/components/UserCard";

export default function Badge({ params }) {
  const username = params.username;
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef(null);
  const [config, setConfig] = useState({});
  const [configGenerated, setConfigGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const prevConfigRef = useRef(config);
  const configCalled = useRef(false);
  const userConfigRef = useRef({});

  const defaultConfig = {
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
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "issue_count", "update"];
    Object.entries(config).forEach(([key, value]) => {
      if (!excludeKeys.includes(key) && value !== false && value !== "" && value !== null) {
        params.set(key, value);
      }
    });
    const newUrl = `/${username}?${params.toString()}`;
    history.replaceState(null, "", newUrl);
  };

  useEffect(() => {
    const urlParams = Object.fromEntries(searchParams.entries());
    userConfigRef.current = urlParams; // Save user-provided URL attributes
    const mergedConfig = { ...defaultConfig, ...urlParams };
    setConfig(mergedConfig);

    if (Object.keys(urlParams).length === 0 && !configCalled.current) {
      const defaultParams = new URLSearchParams(defaultConfig).toString();
      router.replace(`/${username}?${defaultParams}`, undefined, { shallow: true, scroll: false });
    }
  }, []);

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

  const handleConfig = async () => {
    if (!configGenerated && !loading && !configCalled.current) {
      configCalled.current = true;
      setLoading(true);
      try {
        const configData = await UserConfig(username);
        const mergedConfig = { ...configData, ...userConfigRef.current }; // Merge with user-provided attributes
        setConfig((prev) => ({ ...prev, ...mergedConfig }));
        setConfigGenerated(true);
        updateURL(); // Update URL after setting config
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    handleConfig();
  }, []); 

  if (config !== null && Object.keys(config).length > 0) {
    console.log(config.Tagline);
  }

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
        {/* Conditionally render Canvas only if config is not empty */}
        <div className="hidden">
          {Object.keys(config).length > 0 ? (
            <Canvas config={config} ref={canvasRef} />
          ) : (
            <p>Loading your badge...</p>
          )}
        </div>
        {Object.keys(config).length > 0 ? (
          <UserCard config={config} />
        ) : (
          <p>Loading your badge...</p>
        )}
      </div>
      <div className="text-justify font-semibold font-mono flex bg-slate-800 bg-opacity-80 rounded-xl p-4 shadow-lg gap-8 items-center justify-center w-[50vw] min-w-[600px] mx-auto">
        <button 
          onClick={exportMarkdown}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
          <img src="/markdown.svg" alt="" width="20" />
          MARKDOWN
        </button>
        <button
          onClick={exportCanvas}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]"
        >
          <img src="/download.svg" alt="" width="20" />
          DOWNLOAD
        </button>
        <button 
          onClick={exportURL}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
          <img src="/url.svg" alt="" width="20" />
          URL
        </button>
        <button 
          onClick={exportImg}
          className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
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
                  value={config.theme || ""}
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
                  value={config.font || ""}
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
                  value={config.pattern || ""}
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
                  value={config.image || ""}
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
                checked={config.star || false}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Star</label>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="fork"
                checked={config.fork || false}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Fork</label>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                name="issue"
                checked={config.issue || false}
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
