"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { items } from './exportTools';
import { selects } from './selectTools';
import { checks } from './checkboxTools';
import Loader from "@/components/Loader";

export default function previewCard({ params }) {
  const username = params.username;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState({});
  const prevConfigRef = useRef(config);
  const configCalled = useRef(false);
  const userConfigRef = useRef({});
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  const exportPNG = () => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.text())
        .then(svgText => {
          const svg = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svg);
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            canvas.toBlob(blob => {
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = `${username}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast.success("PNG downloaded successfully.");
            }, 'image/png');
          };
          img.src = url;
        })
        .catch(() => {
          toast.error("Failed to convert SVG to PNG.");
        });
    } else {
      toast.error("Image URL is not available.");
    }
  };

  const exportMarkdown = () => {
    const markdownContent = `![${username}](${imageUrl})`;
    navigator.clipboard.writeText(markdownContent).then(() => {
      toast.success("Markdown copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy Markdown.");
    });
  };

  const exportURL = () => {
    const url = `${imageUrl}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy URL.");
    });
  };

  const exportImg = () => {
    const imgTag = `<img src="${imageUrl}" alt="${username}" />`;
    navigator.clipboard.writeText(imgTag).then(() => {
      toast.success("<img> tag copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy <img> tag.");
    });
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
      // Start loading until the image element confirms onLoad
      setLoading(true);
      setImageUrl(url);
    } else {
      setLoading(false);
      setImageUrl("");
    }
  };

  useEffect(() => {
    fetchImage();
  }, [config]);

  return (
    <div className='min-h-screen min-w-[100%] px-5 text-white relative flex flex-col gap-2'>
      {loading && <Loader message="Generating preview..." />}
      <div className="flex md:gap-10 items-center justify-center mb-2 md:h-[360px]">
        <div className="w-[620px] lg:w-[720px] mt-6 md:h-[360px] flex">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Background image of ${username}`}
              title={`Background preview for ${username}`}
              onLoad={() => setLoading(false)}
              onError={() => { setLoading(false); toast.error("Failed to load image."); }}
            />
          )}
        </div>
      </div>
      <div className="w-[95%] md:w-[75%] lg:w-[55%] mx-auto mt-5 text-justify font-semibold font-mono grid grid-cols-2 lg:grid-cols-4 bg-slate-800 bg-opacity-80 rounded-xl p-4 shadow-lg gap-4 items-center">
        {items.map((item) => {
          const actionMap = {
            markdown: exportMarkdown,
            download: exportPNG,
            url: exportURL,
            img: exportImg,
          };

          const onClick = actionMap[item.action] || (() => {});

          return (
            <button
              key={item.key}
              onClick={onClick}
              title={item.title}
              className="w-full flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] justify-center hover:bg-slate-500"
            >
              <img src={item.icon} alt={`${item.key} icon`} width="20" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="w-[95%] md:w-[75%] lg:w-[55%] mx-auto mt-3 mb-6 bg-slate-800 bg-opacity-80 rounded-xl p-8 shadow-lg h-fit items-center justify-center font-medium">
        <form className="w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selects.map((s) => (
              <div key={s.key} className="w-full flex items-center justify-center">
                <div className="w-full flex flex-col items-center gap-2">
                  <label htmlFor={s.name}>{s.label}</label>
                  <select
                    name={s.name}
                    id={s.name}
                    value={config[s.name] || ""}
                    onChange={handleChange}
                    className="bg-slate-600 p-1 rounded-md border-white border-[1px] w-full md:w-[110px] lg:w-[150px]"
                    title={s.title}
                  >
                    {s.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <label htmlFor="image">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                id="image"
                placeholder="Enter image URL"
                value={config.image || ""}
                onChange={handleChange}
                title="Image URL for profile picture (optional)"
                className="w-full bg-slate-600 p-1 rounded-md border-white border-[1px] md:w-[40vw] h-8 resize-none break-normal hover:bg-slate-500"
                style={{
                  overflowX: "scroll",
                  overflowY: "hidden",
                  scrollbarWidth: "none", // For Firefox
                  msOverflowStyle: "none" // For Internet Explorer
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-7">
            {checks.map((c) => (
              <div key={c.key} className="flex gap-1 items-center justify-center">
                <input
                  type="checkbox"
                  id={c.name}
                  name={c.name}
                  checked={config[c.name] || false}
                  onChange={handleChange}
                  className="accent-blue-500"
                  title={c.title}
                />
                <label htmlFor={c.name}>{c.label}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}