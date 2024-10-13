import { NextResponse } from "next/server";
import { generateUserTagline } from "../../../../ai/generateTagline";
const GITHUB_API_URL = "https://api.github.com/graphql";

export async function POST(req) {
  const { username } = await req.json();

  if (!username) {
    return new NextResponse("Username required", { status: 400 });
  }

  const query = `
    query ($login: String!) {
      user(login: $login) {
        login
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
          }
          pullRequestContributionsByRepository {
            repository {
              name
            }
          }
        }
        repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  `;

  try {
    console.log("hii");
    
    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
    });

    // console.log(response)
    console.log("hello");
    

    if (!response.ok) {
      return new NextResponse(await response.text(), {
        status: response.status,
      });
    }

    const data = await response.json();
    // console.log(data);
    if (data.data.user) {
      const contributions = data.data.user.contributionsCollection;
      // console.log(contributions)
      const tagline = await generateUserTagline(username, contributions);
      return NextResponse.json({
        exists: true,
        tagline,
      });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking GitHub username:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}