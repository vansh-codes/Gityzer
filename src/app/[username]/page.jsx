'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from '@/app/not-found';
// Create a separate 404 error component

function UserPage({ params }) {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [theme, setTheme] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [tagline, setTagline] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const themeParam = searchParams.get("theme");
    const colorParam = searchParams.get("color");

    if (themeParam) setTheme(decodeURIComponent(themeParam));
    if (colorParam) setTextColor(decodeURIComponent(colorParam));
  }, [searchParams]);

  const fetchTagline = async (retries = 3) => {
    setIsLoading(true);

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const res = await axios.post(
          'https://gityzer.vercel.app/api/ai',
          { username },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        if (res.data && res.data.tagline) {
          setTagline(res.data.tagline);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);
        
        // If this is the last attempt
        if (attempt === retries - 1) {
          setIs404(true);
          return;
        } else {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
        }
      }
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (username) {
      fetchTagline();
    }
  }, [username]);

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

  const updateUrl = (theme, color) => {
    const queryString = `?theme=${encodeURIComponent(theme)}&color=${encodeURIComponent(color)}`;
    router.push(`/${username}${queryString}`);
  };

  // Return 404 page if error occurred
  if (is404) {
    return <NotFound />;
  }

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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