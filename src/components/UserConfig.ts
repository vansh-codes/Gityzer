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

      if (!res.ok) {
        console.error('GitHub API Error:', await res.text());
        throw new Error(`Failed to fetch user data: ${res.status}`);
      }

      const data = await res.json();
      console.log('GitHub API Response:', data);
      
      if (data.userInfo) {
        config.UserName = data.userInfo.name || username;
      }

      if (data.Languages && data.Description && data.Stars && data.Forks && data.Issues) {
        const processed = processUserData(Object.values(data));
        processedData = processed;
        
        if (processed.config) {
          config.star_count = processed.config.star_count;
          config.fork_count = processed.config.fork_count;
          config.issue_count = processed.config.issue_count;
        }
      }

      // Generate tagline after getting user data
      if (data.userInfo && data.userInfo.bio) {
        try {
          const taglineResponse = await generateTagline(data.userInfo.bio);
          if (taglineResponse) {
            config.Tagline = taglineResponse;
          }
        } catch (error) {
          console.error('Error generating tagline:', error);
          config.Tagline = data.userInfo.bio;
        }
      }
    } catch (error) {
      throw new Error("Failed to fetch user data.");
    }
  };

  await handleUser();

  return config;
}