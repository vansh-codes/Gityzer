import { validateConfig, Config } from '../utils/configValidation';

describe('Config Validation', () => {
  const validConfig: Config = {
    theme: 'dark',
    font: 'helvetica',
    pattern: 'shape 1',
    update: '14',
    image: '',
    username: true,
    tagline: true,
    lang: false,
    star: false,
    fork: false,
    issue: false,
  };

  test('should validate a correct config', () => {
    const result = validateConfig(validConfig);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should catch missing required fields', () => {
    const invalidConfig: Partial<Config> = {
      font: 'helvetica',
      pattern: 'shape 1',
      update: '14',
      image: '',
      username: true,
      tagline: true,
      lang: false,
      star: false,
      fork: false,
      issue: false,
    };
    
    const result = validateConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('theme is required');
  });

  test('should validate theme values', () => {
    const invalidConfig: Config = {
      ...validConfig,
      theme: 'invalid' as 'dark' | 'light'
    };
    
    const result = validateConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('theme must be either "dark" or "light"');
  });

  test('should validate font values', () => {
    const invalidConfig: Config = {
      ...validConfig,
      font: 'invalid'
    };
    
    const result = validateConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('font must be one of: helvetica, arial, times new roman');
  });

  test('should validate boolean fields', () => {
    const invalidConfig = {
      ...validConfig,
      username: 'true' as unknown as boolean
    };
    
    const result = validateConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('username must be a boolean');
  });

  test('should validate number fields', () => {
    const invalidConfig: Config = {
      ...validConfig,
      star_count: -1
    };
    
    const result = validateConfig(invalidConfig);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('star_count must be a non-negative number');
  });
});
