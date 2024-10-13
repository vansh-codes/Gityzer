const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateUserTagline(username, contributions) {
  const prompt = `
    Generate a custom tagline for the GitHub user "${username}" based on the following activity and contribution patterns:
    - Total Contributions: ${contributions.totalCommitContributions}
    - Active Coding Days: ${contributions.contributionCalendar.totalContributions}
    
    The tagline should be consistent, meaningful, and provide an at-a-glance summary of the user's work..
    Only generate one tagline, only one.
  `;

  try {
    const result = await model.generateContent(prompt);
    console.log("AI");
    
    console.log(result.response.text());
    
    if (result.response) {
      return result.response.text();
    } else {
      throw new Error("Tagline not found in the response");
    }
  } catch (error) {
    console.error("Error generating tagline:", error);
    return "No tagline available";
  }
}