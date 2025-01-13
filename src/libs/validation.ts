export interface ConfigValidation {
  username: string;
  Languages?: Record<string, any>;
  Description?: Record<string, string>;
  config?: {
    star_count?: number;
    fork_count?: number;
    issue_count?: number;
  };
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateConfig = (config: ConfigValidation): void => {
  if (!config.username || typeof config.username !== 'string') {
    throw new ValidationError('Username is required and must be a string');
  }

  if (config.Languages && typeof config.Languages !== 'object') {
    throw new ValidationError('Languages must be an object');
  }

  if (config.Description && typeof config.Description !== 'object') {
    throw new ValidationError('Description must be an object');
  }

  if (config.config) {
    const { star_count, fork_count, issue_count } = config.config;
    
    if (star_count !== undefined && (typeof star_count !== 'number' || star_count < 0)) {
      throw new ValidationError('star_count must be a non-negative number');
    }
    
    if (fork_count !== undefined && (typeof fork_count !== 'number' || fork_count < 0)) {
      throw new ValidationError('fork_count must be a non-negative number');
    }
    
    if (issue_count !== undefined && (typeof issue_count !== 'number' || issue_count < 0)) {
      throw new ValidationError('issue_count must be a non-negative number');
    }
  }
};
