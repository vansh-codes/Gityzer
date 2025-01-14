export interface GitHubRepo {
    language: string | null;
    description: string | null;
    stargazers_count: number | null;
    forks_count: number | null;
    open_issues_count: number | null;
    owner: { login: string };
    name: string;
  };
  
  export interface Config {
    theme: string;
    font: string;
    pattern: string;
    update: string;
    image: string;
    username: boolean;
    tagline: boolean;
    lang: boolean;
    star: boolean;
    fork: boolean;
    issue: boolean;
    UserName: string;
    Tagline: string;
    star_count: number;
    fork_count: number;
    issue_count: number;
  };