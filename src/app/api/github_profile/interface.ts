export interface GitHubRepo {
    language: string | null;
    description: string | null;
    stargazers_count: number | null;
    forks_count: number | null;
    name: string;
}