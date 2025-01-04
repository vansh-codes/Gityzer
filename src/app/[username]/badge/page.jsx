"use client";

import { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { useRouter } from "next/navigation";

export default function Badge({ params }) {
  const username = params.username;
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
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
    
      router.replace(`/${username}/badge?${params.toString()}`, undefined, { shallow: true });
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
      if (res.ok) {
        setTagline(data.response);
      } else {
        setTagline(`Error: ${data.error}`);
      }
    } catch (error) {
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
    <div className='min-h-screen bg-gray-900 text-white p-4 md:p-6 relative flex flex-col gap-2' >
      <header className='p-4 flex flex-row items-center'>
          <svg
            width='40px'
            height='40px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.35003 16.88C9.35003 16.95 9.28003 17 9.18003 17C9.08003 17 9.00003 17 9.00003 16.88C9.00003 16.76 9.08003 16.76 9.17003 16.76C9.26003 16.76 9.35003 16.81 9.35003 16.88ZM8.35003 16.73C8.35003 16.8 8.35003 16.88 8.49003 16.9C8.52584 16.9172 8.56701 16.9195 8.6045 16.9064C8.642 16.8933 8.67275 16.8658 8.69003 16.83C8.69003 16.76 8.69003 16.69 8.55003 16.66C8.41003 16.63 8.37003 16.66 8.35003 16.73ZM9.77003 16.68C9.68003 16.68 9.62003 16.76 9.63003 16.84C9.64003 16.92 9.72003 16.95 9.82003 16.93C9.92003 16.91 9.97003 16.84 9.96003 16.77C9.95003 16.7 9.87003 16.67 9.77003 16.68ZM11.9 4.00002C10.8454 3.99009 9.79962 4.19333 8.82547 4.59754C7.85132 5.00175 6.96887 5.5986 6.23107 6.35227C5.49328 7.10594 4.91535 8.0009 4.53197 8.98343C4.14859 9.96597 3.96765 11.0158 4.00003 12.07C3.97211 13.7969 4.48426 15.4894 5.46493 16.9111C6.4456 18.3328 7.84582 19.4127 9.47003 20C9.88003 20.07 10.03 19.81 10.03 19.6C10.03 19.39 10.03 18.26 10.03 17.6C10.03 17.6 7.77003 18.1 7.29003 16.6C7.29003 16.6 6.93003 15.6 6.40003 15.39C6.40003 15.39 5.66003 14.87 6.45003 14.88C6.70877 14.9149 6.95573 15.01 7.17108 15.1576C7.38643 15.3052 7.56417 15.5013 7.69003 15.73C7.79466 15.9351 7.9401 16.1167 8.11742 16.2635C8.29473 16.4104 8.50019 16.5195 8.72118 16.5841C8.94218 16.6487 9.17404 16.6675 9.40255 16.6393C9.63106 16.6111 9.85139 16.5364 10.05 16.42C10.0879 16.0025 10.2679 15.6107 10.56 15.31C8.76003 15.1 6.94003 14.84 6.94003 11.65C6.92091 11.2896 6.97881 10.9293 7.10985 10.5931C7.2409 10.2569 7.44209 9.95241 7.70003 9.70002C7.45667 8.96799 7.48507 8.17282 7.78003 7.46002C8.46003 7.24002 10.01 8.35002 10.01 8.35002C11.3342 7.97655 12.7359 7.97655 14.06 8.35002C14.06 8.35002 15.61 7.24002 16.29 7.46002C16.5914 8.17142 16.6198 8.96894 16.37 9.70002C16.6371 9.94893 16.8489 10.2511 16.9919 10.587C17.1348 10.9229 17.2057 11.285 17.2 11.65C17.2 14.85 15.3 15.1 13.5 15.31C13.6809 15.5129 13.8186 15.7506 13.9046 16.0085C13.9905 16.2664 14.023 16.5391 14 16.81C14 17.93 14 19.31 14 19.58C13.9994 19.6475 14.015 19.7142 14.0456 19.7744C14.0763 19.8346 14.1209 19.8866 14.1759 19.9258C14.2308 19.9651 14.2945 19.9905 14.3613 19.9999C14.4282 20.0094 14.4964 20.0025 14.56 19.98C16.1813 19.3978 17.5786 18.321 18.5547 16.9017C19.5309 15.4824 20.0364 13.7922 20 12.07C20.0094 11.0051 19.8061 9.94902 19.402 8.96371C18.9979 7.9784 18.4011 7.08369 17.6467 6.33205C16.8923 5.58041 15.9953 4.98696 15.0085 4.58651C14.0217 4.18606 12.9649 3.98667 11.9 4.00002ZM7.14003 15.41C7.14003 15.41 7.14003 15.52 7.14003 15.58C7.15118 15.5912 7.16442 15.6001 7.17901 15.6061C7.1936 15.6122 7.20923 15.6153 7.22503 15.6153C7.24082 15.6153 7.25646 15.6122 7.27105 15.6061C7.28563 15.6001 7.29888 15.5912 7.31003 15.58C7.31003 15.58 7.31003 15.47 7.31003 15.4C7.31003 15.33 7.18003 15.37 7.14003 15.41ZM6.79003 15.14C6.79003 15.14 6.79003 15.24 6.86003 15.27C6.86846 15.2805 6.87913 15.2889 6.89124 15.2947C6.90335 15.3004 6.91661 15.3035 6.93003 15.3035C6.94345 15.3035 6.9567 15.3004 6.96881 15.2947C6.98093 15.2889 6.99159 15.2805 7.00003 15.27C7.00003 15.27 7.00003 15.17 6.93003 15.14C6.86003 15.11 6.81003 15.11 6.79003 15.14ZM7.79003 16.32C7.79003 16.32 7.79003 16.46 7.79003 16.53C7.79003 16.6 7.96003 16.61 8.00003 16.53C8.04003 16.45 8.00003 16.39 8.00003 16.32C8.00003 16.25 7.87003 16.27 7.83003 16.32H7.79003ZM7.42003 15.83C7.42003 15.83 7.42003 15.95 7.42003 16.03C7.42003 16.11 7.56003 16.14 7.61003 16.11C7.63535 16.0809 7.6493 16.0436 7.6493 16.005C7.6493 15.9664 7.63535 15.9291 7.61003 15.9C7.56003 15.82 7.48003 15.79 7.42003 15.83Z'
              fill='#fff'
            />
          </svg>
          <a href='/'>
            <h1 className='text-xl font-bold text-white'>Gityzer</h1>
          </a>
        </header>
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
