export async function POST(request: Request) {
  const { username } = await request.json();
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      "Authorization": `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}