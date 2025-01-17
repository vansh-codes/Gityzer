export interface GenerateTaglineParams {
    username: string;
    Languages: Record<string, any>;
    Description: Record<string, string>;
    config: {
        star_count: number;
        fork_count: number;
        repo_count: number;
    };
}

export interface ApiResponse {
    response: string;
    error?: string;
}