import { NextResponse } from "next/server";

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
      }
    }
  `;

    try {
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

        if (!response.ok) {
            return new NextResponse(await response.text(), {
                status: response.status,
            });
        }

        const data = await response.json();
        console.log(data);
        if (data.data.user) {
            return NextResponse.json({ exists: true });
        } else {
            return NextResponse.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking GitHub username:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
