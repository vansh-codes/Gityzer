"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function previewCard({ params }) {
  const username = params.username;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState({});
  const prevConfigRef = useRef(config);
  const configCalled = useRef(false);
  const userConfigRef = useRef({});
  const [imageUrl, setImageUrl] = useState("");

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
    repo: false,
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    const excludeKeys = ["username", "tagline", "lang", "UserName", "Tagline", "star_count", "fork_count", "repo_count", "update"];
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

  const exportCanvas = () => {
    toast.error("Sorry, this feature is not available yet.");
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

  const getUrlParams = (config) => {
    const params = new URLSearchParams();
    const includeKeys = ["theme", "font", "pattern", "image", "star", "fork", "repo"];
    Object.entries(config).forEach(([key, value]) => {
      if (includeKeys.includes(key) && value !== false && value !== "" && value !== null) {
        params.set(key, value);
      }
    });
    return params.toString();
  };

  const isUrlComplete = () => {
    const requiredParams = ["theme", "font", "pattern"];
    return requiredParams.every(param => config[param]);
  };

  const fetchImage = async () => {
    if (isUrlComplete()) {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${username}/image?${getUrlParams(config)}`;
      setImageUrl(url);
    } else {
      setImageUrl("");
    }
  };

  useEffect(() => {
    fetchImage();
  }, [config]);

  return (
    <div className='min-h-screen text-white relative flex flex-col gap-2' >
      <div className="flex gap-10 items-center justify-center mb-2 h-[360px]">
        <div className="w-[720px] h-[360px] flex">
          {imageUrl && <img src={imageUrl} alt="" />}
        </div>
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
                  <option value="Helvetica">Helvetica</option>
                  <option value="Arial">Arial</option>
                  <option value="TimesNewRoman">Times New Roman</option>
                  <option value="Calibri">Calibri</option>
                  <option value="Verdana">Verdana</option>
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
                name="repo"
                checked={config.repo || false}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label htmlFor="username">Repo</label>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
