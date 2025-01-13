interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
}

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
  UserName?: string;
  Tagline?: string;
  star_count?: number;
  fork_count?: number;
  issue_count?: number;
}

export function validateConfig(config: Partial<Config>): ConfigValidationResult {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ['theme', 'font', 'pattern', 'update'];
  requiredFields.forEach(field => {
    if (!config[field]) {
      errors.push(`${field} is required`);
    }
  });

  // Theme validation
  if (config.theme && !['dark', 'light'].includes(config.theme)) {
    errors.push('theme must be either "dark" or "light"');
  }

  // Font validation
  const validFonts = ['helvetica', 'arial', 'times new roman'];
  if (config.font && !validFonts.includes(config.font.toLowerCase())) {
    errors.push(`font must be one of: ${validFonts.join(', ')}`);
  }

  // Pattern validation
  const validPatterns = ['shape 1', 'shape 2'];
  if (config.pattern && !validPatterns.includes(config.pattern)) {
    errors.push(`pattern must be one of: ${validPatterns.join(', ')}`);
  }

  // Boolean fields validation
  const booleanFields = ['username', 'tagline', 'lang', 'star', 'fork', 'issue'];
  booleanFields.forEach(field => {
    if (config[field] !== undefined && typeof config[field] !== 'boolean') {
      errors.push(`${field} must be a boolean`);
    }
  });

  // Number fields validation
  const numberFields = ['star_count', 'fork_count', 'issue_count'];
  numberFields.forEach(field => {
    if (config[field] !== undefined && (
      typeof config[field] !== 'number' || 
      config[field] < 0
    )) {
      errors.push(`${field} must be a non-negative number`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}
