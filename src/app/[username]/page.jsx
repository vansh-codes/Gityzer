"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "@/app/not-found";
import Image from "next/image";
import { FaMapPin, FaClock, FaGithub, FaLink } from "react-icons/fa";
// Create a separate 404 error component

function UserPage({ params }) {
  const { username } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;
  const [theme, setTheme] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [tagline, setTagline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
        setIsLoading(true); // Start loading
        setIs404(false); // Reset 404 state for each new fetch

        try {
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            
            if (userResponse.status === 404) {
                setIs404(true);
                setUserData(null);
                setRepositories([]);
                setIsLoading(false);
                return;
            }

            const userData = await userResponse.json();
            setUserData(userData);

            const reposResponse = await fetch(userData.repos_url);
            const reposData = await reposResponse.json();
            setRepositories(reposData);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    if (username) fetchUserData();
}, [username]);

  const totalPages = Math.ceil(repositories.length / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  



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
    const queryString = `?theme=${encodeURIComponent(
      theme
    )}&color=${encodeURIComponent(color)}`;
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
    <div className="min-h-screen bg-gray-900 text-white p-8 md:p-16 relative">
      {/* Stylish Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-600 opacity-30 -z-10"></div>

      {/* User Profile Section */}
      {userData && (
        <div className="max-w-6xl mx-auto bg-gray-800 bg-opacity-80 rounded-xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Image
                src={userData.avatar_url || "/default_avatar.jpg"}
                alt="Profile"
                width={180}
                height={180}
                className="rounded-full border-4 border-purple-500"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800">
                {userData.name || "Unknown User"}
              </h1>
              <p className="text-gray-400 mt-2">
                @{userData.login || "username"}
              </p>

              <div className="mt-4 space-y-2">
                <p className="flex justify-center md:justify-start items-center gap-2 text-gray-400">
                  <FaMapPin className="w-4 h-4" />
                  {userData.location || "Unknown"}
                </p>
                <p className="flex justify-center md:justify-start items-center gap-2 text-gray-400">
                  <FaClock className="w-4 h-4" />
                  {new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
              </div>

              <div className="mt-4 flex justify-center md:justify-start gap-6 text-gray-500">
                <div>
                  <FaGithub className="inline mr-1" />
                  <span>{userData.followers} followers</span>
                </div>
                <div>
                  <FaLink className="inline mr-1" />
                  <span>{userData.following} following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Repositories Section */}
          <div className="mt-10">
            <h3 className="text-3xl font-semibold mb-6 text-purple-400">
             {userData.login.toUpperCase()}'s Repositories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-gray-700 p-6 rounded-lg overflow-hidden shadow-lg"
                >
                  <h4 className="text-xl font-semibold text-blue-400 hover:underline">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p className="text-gray-300 mt-2">
                    {repo.description || "No description available."}
                  </p>
                  <div className="flex bg-stone-500/10 p-1.5 rounded-md justify-between mt-4 text-gray-400 text-sm">
                    <span>{repo.language || "Unknown"}</span>
                    <span>★ {repo.stargazers_count || 0}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex mb-5 justify-between items-center mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
          <div
            className="flex flex-col justify-center items-center h-screen"
            style={{ backgroundColor: theme, color: textColor }}
          >
            <h1 className="text-2xl font-bold mb-4">{tagline} <FaGithub /></h1>
            <div className="flex space-x-4">
              <div>
                <label className="block mb-2">Background Color</label>
                <input
                  type="color"
                  value={theme}
                  onChange={handleThemeChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
