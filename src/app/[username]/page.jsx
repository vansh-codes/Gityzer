"use client";

import { useEffect, useState, useRef } from "react";
import Canvas from "@/components/Canvas";
import processUserData from "@/app/api/github_profile/user";
import generateTagline from "@/app/api/generate_tagline/generateTagline";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "@/components/Spinner";
import { Tooltip } from "@/components/Tooltip";

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
    setLoading(true);
    try {
      const response = await fetch("/api/github_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      const processed = processUserData(data);
      setProcessedData(processed);
      setUserFetched(true);
      setConfig((prev) => ({
        ...prev,
        star_count: processed.totalStars || 0,
        fork_count: processed.totalForks || 0,
        issue_count: processed.totalIssues || 0,
      }));
    } catch (error) {
      toast.error(`Error fetching user data: ${error.message}`);
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

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (!processedData) {
        throw new Error('User data not loaded');
      }

      const tagline = await generateTagline({
        username,
        Languages: processedData.languages,
        Description: processedData.descriptions,
        config: {
          star_count: processedData.totalStars,
          fork_count: processedData.totalForks,
          issue_count: processedData.totalIssues,
        },
      });

      setTagline(tagline);
      setTaglineGenerated(true);
      setConfig((prev) => ({ ...prev, Tagline: tagline }));
      toast.success('Tagline generated successfully!');
    } catch (error) {
      toast.error(`Error generating tagline: ${error.message}`);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Spinner size="lg" />
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Customize Your Badge</h2>
              
              {/* Theme Selection */}
              <div className="mb-6">
                <Tooltip content="Choose between light and dark theme for your badge">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme
                  </label>
                </Tooltip>
                <select
                  value={config.theme}
                  onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              {/* Font Selection */}
              <div className="mb-6">
                <Tooltip content="Select a font style for your badge text">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font
                  </label>
                </Tooltip>
                <select
                  value={config.font}
                  onChange={(e) => setConfig({ ...config, font: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="helvetica">Helvetica</option>
                  <option value="arial">Arial</option>
                  <option value="times_new_roman">Times New Roman</option>
                  <option value="calibri">Calibri</option>
                  <option value="verdana">Verdana</option>
                </select>
              </div>

              {/* Pattern Selection */}
              <div className="mb-6">
                <Tooltip content="Add a decorative pattern to your badge background">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pattern
                  </label>
                </Tooltip>
                <select
                  value={config.pattern}
                  onChange={(e) => setConfig({ ...config, pattern: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="none">None</option>
                  <option value="shape 1">Shape 1</option>
                  <option value="shape 2">Shape 2</option>
                </select>
              </div>

              {/* Custom Image URL */}
              <div className="mb-6">
                <Tooltip content="Enter a URL for your custom profile image">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom Image URL
                  </label>
                </Tooltip>
                <input
                  type="text"
                  value={config.image}
                  onChange={(e) => {
                    const url = e.target.value.trim();
                    if (url && !url.match(/^https?:\/\/.+/)) {
                      toast.error('Please enter a valid image URL starting with http:// or https://');
                      return;
                    }
                    setConfig({ ...config, image: url });
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3"
                />
              </div>

              {/* Display Options */}
              <div className="mb-6">
                <Tooltip content="Choose which elements to display on your badge">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Options
                  </label>
                </Tooltip>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.username}
                      onChange={(e) => setConfig({ ...config, username: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Username</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.tagline}
                      onChange={(e) => setConfig({ ...config, tagline: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Tagline</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.star}
                      onChange={(e) => setConfig({ ...config, star: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Stars</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.fork}
                      onChange={(e) => setConfig({ ...config, fork: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Forks</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.issue}
                      onChange={(e) => setConfig({ ...config, issue: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Issues</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Preview</h2>
              <div className="relative">
                {tagline && tagline.trim() ? (
                  <Canvas ref={canvasRef} config={config} />
                ) : (
                  <p>Loading your badge...</p>
                )}
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={exportMarkdown}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    MARKDOWN
                  </button>
                  <button
                    onClick={exportCanvas}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    DOWNLOAD
                  </button>
                  <button
                    onClick={exportURL}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    URL
                  </button>
                  <button
                    onClick={exportImg}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    &lt;IMG /&gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
