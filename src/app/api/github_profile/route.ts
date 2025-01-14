import { GitHubRepo } from "./interface";

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
    const Description: Record<string, string | null> = {};
    const Stars: Record<string, number | null> = {};
    const Forks: Record<string, number | null> = {};
    const Issues: Record<string, number | null> = {};
    const config = {
      star_count: 0,
      fork_count: 0,
      issue_count: 0,
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

        if (item.open_issues_count !== null) {
          Issues[item.name] = item.open_issues_count;
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

      config.issue_count = userData.reduce(
        (acc, item) => acc + (item.open_issues_count || 0),
        0
      );
    }

    return new Response(JSON.stringify({
      Languages,
      Description,
      Stars,
      Forks,
      Issues,
      config,
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}