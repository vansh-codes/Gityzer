interface GitHubRepo {
  language: string | null;
  description: string | null;
  stargazers_count: number | null;
  forks_count: number | null;
  open_issues_count: number | null;
  name: string;
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { username }: { username: string } = await request.json();
    
    // First fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!userResponse.ok) {
      console.error(`GitHub User API failed with status ${userResponse.status}`);
      throw new Error(`GitHub User API failed with status ${userResponse.status}`);
    }

    const userInfo: GitHubUser = await userResponse.json();

    // Then fetch repos
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!reposResponse.ok) {
      console.error(`GitHub Repos API failed with status ${reposResponse.status}`);
      throw new Error(`GitHub Repos API failed with status ${reposResponse.status}`);
    }

    const userData: GitHubRepo[] = await reposResponse.json();

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
      userInfo,
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