import { render, screen } from '@testing-library/react';
import UserCard from '@/components/UserCard';

describe('UserCard Component', () => {
  const mockConfig = {
    theme: 'dark',
    font: 'helvetica',
    pattern: 'shape 1',
    update: '14',
    username: true,
    tagline: true,
    UserName: 'testuser',
    Tagline: 'Test tagline',
    star: true,
    fork: true,
    issue: true,
    star_count: 10,
    fork_count: 5,
    issue_count: 3
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information', () => {
    render(<UserCard config={mockConfig} />);
    
    expect(screen.getByText(mockConfig.UserName)).toBeInTheDocument();
    expect(screen.getByText(mockConfig.Tagline)).toBeInTheDocument();
  });

  test('renders stats when enabled', () => {
    render(<UserCard config={mockConfig} />);
    
    expect(screen.getByText('Star')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Fork')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Issue')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('does not render stats when disabled', () => {
    const configWithoutStats = {
      ...mockConfig,
      star: false,
      fork: false,
      issue: false
    };

    render(<UserCard config={configWithoutStats} />);
    
    expect(screen.queryByText('Star')).not.toBeInTheDocument();
    expect(screen.queryByText('Fork')).not.toBeInTheDocument();
    expect(screen.queryByText('Issue')).not.toBeInTheDocument();
  });
});
