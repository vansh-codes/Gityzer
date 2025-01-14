export interface RequestData {
    prompt: string;
}

export interface ResponseData {
    response?: string;
    success: boolean;
    error?: string;
}