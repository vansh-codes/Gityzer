'use client';
import { generateUserTagline } from "../../../ai/generateTagline";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {contributions} from '../api/ai/route'

function UserPage({ params }) {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [theme, setTheme] = useState("#ffffff"); // default white background color
  const [textColor, setTextColor] = useState("#000000"); // default black text color

  useEffect(() => {
    const themeParam = searchParams.get("theme");
    const colorParam = searchParams.get("color");

    if (themeParam) setTheme(decodeURIComponent(themeParam));
    if (colorParam) setTextColor(decodeURIComponent(colorParam));
  }, [searchParams]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    updateUrl(newTheme, textColor);
  };

  const handleTextColorChange = (e) => {
    const newTextColor = e.target.value;
    setTextColor(newTextColor);
    updateUrl(theme, newTextColor);
  };

  const updateUrl = (theme, color) => { // dynamically update the URL also
    const queryString = `?theme=${encodeURIComponent(theme)}&color=${encodeURIComponent(color)}`;
    router.push(`/${username}${queryString}`);
  };

  const tagline=generateUserTagline(username,contributions);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ backgroundColor: theme, color: textColor }}
    >
      <h1 className="text-2xl font-bold mb-4">{tagline}!</h1>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-2">Background Color</label>
          <input
            type="color"
            value={theme}
            onChange={handleThemeChange}
          />
        </div>
        <div>
          <label className="block mb-2">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;