"use client";

interface UserData {
  language: string | null;
  description: string | null;
  stargazers_count: number | null;
  forks_count: number | null;
  open_issues_count: number | null;
  name: string;
}

interface ProcessedData {
  Languages: Record<string, number>;
  Description: Record<string, string | null>;
  Stars: Record<string, number | null>;
  Forks: Record<string, number | null>;
  Issues: Record<string, number | null>;
  config: {
    star_count: number;
    fork_count: number;
    issue_count: number;
  };
}

const processUserData = (userData: UserData[]): ProcessedData => {
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

  return {
    Languages,
    Description,
    Stars,
    Forks,
    Issues,
    config,
  };
};

export default processUserData;
