import satori from 'satori';
import { NextResponse } from 'next/server';
import RenderSVG from '@/components/RenderSVG'; // Ensure this path is correct

export const runtime = 'edge';

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const query = Object.fromEntries(searchParams)
    const username = query.username

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        return new NextResponse(JSON.stringify({ error: "BASE_URL is not defined" }), {
            status: 500,
            headers: {
            'content-type': 'application/json',
            'cache-control': 'public, max-age=0',
            },
        });
    }

    const requestBody = { username: username };

    const configRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!configRes.ok) {
      throw new Error("Failed to fetch config");
    }

    const configData = await configRes.json();

    const config = {
        theme: query.theme || configData.theme || '',
        font: query.font || configData.font || '',
        pattern: query.pattern || configData.pattern || '',
        update: configData.update || '',
        image: query.image || configData.image || '',
        username: configData.username !== undefined ? configData.username : true,
        tagline: configData.tagline !== undefined ? configData.tagline : true,
        lang: configData.lang !== undefined ? configData.lang : false,
        star: query.star !== undefined ? true : configData.star !== undefined ? configData.star : false,
        fork: query.fork !== undefined ? true : configData.fork !== undefined ? configData.fork : false,
        issue: query.issue !== undefined ? true : configData.issue !== undefined ? configData.issue : false,
        UserName: configData.UserName || '',
        Tagline: configData.Tagline || '',
        star_count: configData.star_count || 0,
        fork_count: configData.fork_count || 0,
        issue_count: configData.issue_count || 0,
    };


    const svg = await satori(
        <RenderSVG {...config} />,
        {
            width: 720,
            height: 360,
            fonts: [
            {
                name: 'Helvetica',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Helvetica.otf`).then((res) => res.arrayBuffer()),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Arial',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Arial.ttf`).then((res) => res.arrayBuffer()),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'TimesNewRoman',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/TimesNewRoman.ttf`).then((res) => res.arrayBuffer()),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Calibri',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Calibri.ttf`).then((res) => res.arrayBuffer()),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Verdana',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Verdana.ttf`).then((res) => res.arrayBuffer()),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Cascadia',
                data: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/CascadiaCode-Bold.otf`).then((res) => res.arrayBuffer()),
                weight: 800,
                style: 'bold',
            },
            ],
        },
    )

    return new NextResponse(svg, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
            'cache-control': `public, immutable, no-transform, max-age=0`,
        },
    })
}