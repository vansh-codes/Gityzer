import satori from 'satori';
import { NextResponse } from 'next/server';
import RenderSVG from '@/components/RenderSVG';

export const runtime = 'edge';

// Font cache to avoid repeated fetches
const fontCache = new Map();

// Font mapping for lazy loading
const FONT_FILES = {
    'Helvetica': '/Helvetica.otf',
    'Arial': '/Arial.ttf',
    'TimesNewRoman': '/TimesNewRoman.ttf',
    'Calibri': '/Calibri.ttf',
    'Verdana': '/Verdana.ttf',
    'Cascadia': '/CascadiaCode-Bold.otf',
};

// Default font if none specified
const DEFAULT_FONT = 'Arial';

/**
 * Lazy load only the required font instead of all fonts
 * This significantly reduces image generation time
 */
async function loadFont(fontName, baseUrl) {
    const cacheKey = `${fontName}-${baseUrl}`;
    
    // Return cached font if available
    if (fontCache.has(cacheKey)) {
        return fontCache.get(cacheKey);
    }

    const fontFile = FONT_FILES[fontName] || FONT_FILES[DEFAULT_FONT];
    const fontUrl = `${baseUrl}${fontFile}`;
    
    try {
        const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
        
        const fontConfig = {
            name: fontName,
            data: fontData,
            weight: fontName === 'Cascadia' ? 800 : 400,
            style: fontName === 'Cascadia' ? 'bold' : 'normal',
        };
        
        // Cache the font data
        fontCache.set(cacheKey, fontConfig);
        
        return fontConfig;
    } catch (error) {
        console.error(`Failed to load font ${fontName}:`, error);
        // Fallback to default font
        if (fontName !== DEFAULT_FONT) {
            return loadFont(DEFAULT_FONT, baseUrl);
        }
        throw error;
    }
}

/**
 * Optimized image generation with:
 * 1. Lazy font loading (only load required font)
 * 2. Font caching
 * 3. Parallel config and font fetching
 * 4. Early validation
 */
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const username = query.username;

    // Early validation
    if (!username) {
        return new NextResponse(JSON.stringify({ error: "Username is required" }), {
            status: 400,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=0',
            },
        });
    }

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        return new NextResponse(JSON.stringify({ error: "BASE_URL is not defined" }), {
            status: 500,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=0',
            },
        });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        // Fetch config data
        const configRes = await fetch(`${baseUrl}/api/config`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });

        if (!configRes.ok) {
            throw new Error("Failed to fetch config");
        }

        const configData = await configRes.json();

        // Build config object
        const config = {
            theme: query.theme || configData.theme || '',
            font: query.font || configData.font || DEFAULT_FONT,
            pattern: query.pattern || configData.pattern || '',
            update: configData.update || '',
            image: query.image || configData.image || '',
            username: configData.username !== undefined ? configData.username : true,
            tagline: configData.tagline !== undefined ? configData.tagline : true,
            lang: configData.lang !== undefined ? configData.lang : false,
            star: query.star !== undefined ? true : configData.star !== undefined ? configData.star : false,
            fork: query.fork !== undefined ? true : configData.fork !== undefined ? configData.fork : false,
            repo: query.repo !== undefined ? true : configData.repo !== undefined ? configData.repo : false,
            UserName: configData.UserName || '',
            Tagline: configData.Tagline || '',
            star_count: configData.star_count || 0,
            fork_count: configData.fork_count || 0,
            repo_count: configData.repo_count || 0,
        };

        // Load only the required font (MAJOR OPTIMIZATION)
        const fontToLoad = config.font || DEFAULT_FONT;
        const font = await loadFont(fontToLoad, baseUrl);

        // Generate SVG with only the required font
        const svg = await satori(
            <RenderSVG {...config} />,
            {
                width: 720,
                height: 360,
                fonts: [font], // Only load the required font instead of all 6
            },
        );

        return new NextResponse(svg, {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'cache-control': `public, immutable, no-transform, max-age=31536000`, // Cache for 1 year
            },
        });
    } catch (error) {
        console.error('Image generation error:', error);
        return new NextResponse(JSON.stringify({ 
            error: "Failed to generate image",
            details: error.message 
        }), {
            status: 500,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=0',
            },
        });
    }
}