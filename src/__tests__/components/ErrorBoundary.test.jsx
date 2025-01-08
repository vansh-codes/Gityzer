import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  beforeAll(() => {
    // Silence console.error for our error tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(getByText('Test error')).toBeInTheDocument();
  });

  it('allows user to retry when error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    const reloadButton = getByText('Try again');
    expect(reloadButton).toBeInTheDocument();
    
    // Mock window.location.reload
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });
    
    fireEvent.click(reloadButton);
    expect(mockReload).toHaveBeenCalled();
  });
});
