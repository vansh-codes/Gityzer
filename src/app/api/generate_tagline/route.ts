import { ApiResponse, GenerateTaglineParams } from "./interface";

export const runtime = 'edge';

export async function POST(request: Request): Promise<Response> {
  try {
    const { username, Languages, Description, config }: GenerateTaglineParams = await request.json();

    const prompt = `Generate a unique tagline for ${username} based on their GitHub profile activity:
    
                    The user works with the following languages: ${Object.keys(Languages).join(", ")}  
                    Repo highlights:  
                    ${Object.entries(Description)
                      .map(([repo, desc]) => `${repo}: ${desc}`)
                      .join(", ")}  
                    Total Stars: ${config.star_count}, Total Forks: ${config.fork_count}, Total Repositories: ${config.repo_count}  
    
                    The tagline should summarize their impactfulness, quality, and strength, everything in 100 characters or less, in a meaningful professional tone. Also, the tagline should be unique and not generic. Should inculde user's personal or professional traits.
    
                    Only generate one tagline. Do not include any code or code-like syntax in the response. Do not include any personal information. 
                    Do not include any offensive or inappropriate content. Do not include any content that is not safe for work.
                    Do not include Usernames, URLs, or any other personal information in the response.`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data: ApiResponse = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify({ response: data.response }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Tagline generation failed:", data.error || "Unknown error");
      throw new Error(data.error || "Failed to generate tagline.");
    }
  } catch (error) {
    console.error("Error generating tagline:", (error as Error).message);
    return new Response(JSON.stringify({ error: `Error communicating with the server: ${(error as Error).message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
