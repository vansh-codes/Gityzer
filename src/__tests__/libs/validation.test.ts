import { validateConfig, ValidationError } from '@/libs/validation';

describe('validateConfig', () => {
  it('should validate a correct config object', () => {
    const validConfig = {
      username: 'testuser',
      Languages: { JavaScript: 60, Python: 40 },
      Description: { repo1: 'Test description' },
      config: {
        star_count: 10,
        fork_count: 5,
        issue_count: 2
      }
    };

    expect(() => validateConfig(validConfig)).not.toThrow();
  });

  it('should throw error for missing username', () => {
    const invalidConfig = {
      Languages: { JavaScript: 60 }
    };

    expect(() => validateConfig(invalidConfig as any)).toThrow(ValidationError);
    expect(() => validateConfig(invalidConfig as any)).toThrow('Username is required');
  });

  it('should throw error for invalid star_count', () => {
    const invalidConfig = {
      username: 'testuser',
      config: {
        star_count: -1
      }
    };

    expect(() => validateConfig(invalidConfig)).toThrow(ValidationError);
    expect(() => validateConfig(invalidConfig)).toThrow('star_count must be a non-negative number');
  });

  it('should validate config with minimal required fields', () => {
    const minimalConfig = {
      username: 'testuser'
    };

    expect(() => validateConfig(minimalConfig)).not.toThrow();
  });
});
