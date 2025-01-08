import processUserData from "@/app/api/github_profile/user";
import generateTagline from "@/app/api/generate_tagline/generateTagline";

interface Config {
  theme: string;
  font: string;
  pattern: string;
  update: string;
  image: string;
  username: boolean;
  tagline: boolean;
  lang: boolean;
  star: boolean;
  fork: boolean;
  issue: boolean;
  UserName: string;
  Tagline: string;
  star_count: number;
  fork_count: number;
  issue_count: number;
}

export default async function UserConfig(username: string): Promise<Config> {
  let userData: any = null;
  let processedData: any = null;
  let tagline = "";
  let config: Config = {
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
  };

  const handleUser = async () => {
    try {
      const res = await fetch("/api/github_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (res.ok) {
        userData = data;
        const processed = processUserData(data.repos);
        processedData = processed;
      } else {
        throw new Error("Failed to fetch user data.");
      }
    } catch (error) {
      throw new Error("Failed to fetch user data.");
    }
  };

  await handleUser();

  if (userData !== null) {
    const Languages: { [key: string]: number } = {};
    const Description: { [key: string]: string } = {};
    let starCount = 0;
    let forkCount = 0;
    let issueCount = 0;

    config.UserName = userData[0].owner.login;

    userData.forEach((item: any) => {
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

    config = {
      ...config,
      star_count: starCount,
      fork_count: forkCount,
      issue_count: issueCount,
    };
  }

  const handleGenerate = async () => {
    const input = {
      username: username,
      Languages: processedData?.Languages || {},
      Description: processedData?.Description || {},
      config: config,
    };

    try {
      tagline = await generateTagline(input);
    } catch (error) {
      console.error("Error:", error.message);
      tagline = "Failed to generate a tagline. Please try again.";
    }
  };

  await handleGenerate();

  config.Tagline = tagline;

  return config;
}