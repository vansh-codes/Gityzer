import { GitHubRepo, Config } from "./interface";

export const runtime = 'edge';

export async function POST(request: Request): Promise<Response> {
  try {
    const { username }: { username: string } = await request.json();
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        "Authorization": `token ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const userData: GitHubRepo[] = await response.json();

    const Languages: Record<string, number> = {};
    const Description: Record<string, string> = {};
    const Stars: Record<string, number | null> = {};
    const Forks: Record<string, number | null> = {};
    const config: Config = {
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
      UserName: userData[0].owner.login,
      Tagline: "",
      star_count: 0,
      fork_count: 0,
      repo_count: Object.keys(userData).length || 0,
    };

    if (userData && Array.isArray(userData)) {
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
      });

      config.star_count = userData.reduce(
        (acc, item) => acc + (item.stargazers_count || 0),
        0
      );

      config.fork_count = userData.reduce(
        (acc, item) => acc + (item.forks_count || 0),
        0
      );
    }

    const filteredDescription: Record<string, string> = {};
    for (const key in Description) {
      if (Description[key] !== null) {
        filteredDescription[key] = Description[key] as string;
      }
    }

    const input = {
      username: username,
      Languages: Languages,
      Description: filteredDescription,
      config: config,
    };

    const taglineResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate_tagline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const taglineData = await taglineResponse.json();

    if (!taglineResponse.ok) {
      console.error("Tagline generation failed:", taglineData.error || "Unknown error");
      throw new Error(`Tagline generation failed with status ${taglineResponse.status}`);
    }

    config.Tagline = taglineData.response;

    return new Response(JSON.stringify(config), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}