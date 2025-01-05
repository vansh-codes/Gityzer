interface GenerateTaglineParams {
  username: string;
  Languages: Record<string, any>;
  Description: Record<string, string>;
  config: {
    star_count: number;
    fork_count: number;
    issue_count: number;
  };
}

const generateTagline = async ({ username, Languages, Description, config }: GenerateTaglineParams): Promise<string> => {
  const prompt = `Generate a unique tagline for ${username} based on their GitHub profile activity:
  
                  The user works with the following languages: ${Object.keys(Languages).join(", ")}  
                  Repo highlights:  
                  ${Object.entries(Description)
                    .map(([repo, desc]) => `${repo}: ${desc}`)
                    .join(", ")}  
                  Total Stars: ${config.star_count}, Total Forks: ${config.fork_count}, Total Issues: ${config.issue_count}  
  
                  The tagline should summarize their impact, versatility, quality, and strength, everything in 120 characters or less, in a meaningful professional tone.
  
                  Only generate one tagline. Do not include any code or code-like syntax in the response. Do not include any personal information. 
                  Do not include any offensive or inappropriate content. Do not include any content that is not safe for work.
                  Do not include Usernames, URLs, or any other personal information in the response.`;

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (res.ok) {
      return data.response; // Return the tagline from the server response
    } else {
      throw new Error(data.error || "Failed to generate tagline.");
    }
  } catch (error) {
    throw new Error(`Error communicating with the server: ${error.message}`);
  }
};

export default generateTagline;
