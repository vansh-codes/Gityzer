import type { MetadataRoute } from 'next'

//* refer here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/*.js$', '/*.json$', '/static/', '/build/'],
    },
    sitemap: 'https://gityzer.vercel.app/sitemap.xml',
  }
}

/* User-agent: *

# Block access to any API endpoints
Disallow: /api/

# Allow access to content
Allow: /

# Block access to any js-specific files
Disallow: /*.js$
Disallow: /*.json$

# Block access to development or build-specific directories
Disallow: /static/
Disallow: /build/

# Specify the location of your XML sitemap
Sitemap: https://bridgewise.tech/sitemap.xml

# Specify the location of your Progressive Web App manifest
Allow: /manifest.json */
