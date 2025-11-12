import Link from 'next/link';

export default function MultilingualTest() {
    const testCases = [
        {
            lang: 'en',
            langName: 'English',
            description: 'Default English language',
            url: '/api/image?username=torvalds&star=true&fork=true&repo=true&lang=en',
        },
        {
            lang: 'hin',
            langName: 'हिंदी (Hindi)',
            description: 'Hindi language for stats labels',
            url: '/api/image?username=torvalds&star=true&fork=true&repo=true&lang=hin',
        },
        {
            lang: 'marathi',
            langName: 'मराठी (Marathi)',
            description: 'Marathi language for stats labels',
            url: '/api/image?username=torvalds&star=true&fork=true&repo=true&lang=marathi',
        },
    ];

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
        }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌍 Multilingual Image Support Test</h1>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                    Testing the new lang parameter for Gityzer image generation
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
                {testCases.map((testCase) => (
                    <div key={testCase.lang} style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}>
                        <h2 style={{ marginTop: 0, color: '#333' }}>{testCase.langName}</h2>
                        <p style={{ color: '#666', marginBottom: '15px' }}>{testCase.description}</p>

                        <div style={{
                            backgroundColor: '#f9f9f9',
                            padding: '15px',
                            borderRadius: '6px',
                            marginBottom: '15px',
                            border: '1px solid #e0e0e0',
                            fontSize: '0.9rem',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                        }}>
                            {testCase.url}
                        </div>

                        <div style={{
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '200px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '6px',
                        }}>
                            <img
                                src={testCase.url}
                                alt={`Gityzer image with ${testCase.langName}`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '360px',
                                    objectFit: 'contain',
                                }}
                            />
                        </div>

                        <a href={testCase.url} target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                        }}>
                            Open Full Image
                        </a>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '50px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
                <h2>📝 Usage Instructions</h2>
                <div style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                    <h3>Supported Languages:</h3>
                    <ul>
                        <li><strong>en</strong> - English (Default)</li>
                        <li><strong>hin</strong> - Hindi</li>
                        <li><strong>marathi</strong> - Marathi</li>
                    </ul>

                    <h3>Example URLs:</h3>
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        overflow: 'auto',
                    }}>
                        <pre style={{ margin: 0 }}>{`# English (Default)
https://gityzer.vercel.app/api/image?username=torvalds&lang=en

# Hindi
https://gityzer.vercel.app/api/image?username=torvalds&lang=hin

# Marathi
https://gityzer.vercel.app/api/image?username=torvalds&lang=marathi`}</pre>
                    </div>

                    <h3>Translation Mappings:</h3>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '10px',
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>English</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Hindi</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Marathi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>Star</td>
                                <td style={{ padding: '10px' }}>स्टार</td>
                                <td style={{ padding: '10px' }}>तारा</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>Fork</td>
                                <td style={{ padding: '10px' }}>फोर्क</td>
                                <td style={{ padding: '10px' }}>फोर्क</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px' }}>Repo</td>
                                <td style={{ padding: '10px' }}>रिपो</td>
                                <td style={{ padding: '10px' }}>रिपो</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>⚠️ Note:</h3>
                    <p>
                        If you use an invalid language code, the system will automatically fallback to English (en).
                        This ensures that the image generation always works correctly.
                    </p>
                </div>
            </div>

            <div style={{
                marginTop: '30px',
                textAlign: 'center',
                color: '#666',
                fontSize: '0.9rem',
            }}>
                <Link href="/">← Back to Home</Link>
            </div>
        </div>
    );
}
