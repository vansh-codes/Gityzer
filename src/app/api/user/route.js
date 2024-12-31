import { NextResponse } from 'next/server'

export async function POST(req) {
  // Parse the request body to extract the username
  const { username } = await req.json()

  if (!username) {
    return new NextResponse('Username required', { status: 400 })
  }

  try {
    // Fetch the user's GitHub profile using the REST API
    const response = await fetch(`https://api.github.com/users/${username}`, {
      method: 'GET', // Using GET since it's a public REST API request
    })

    if (!response.ok) {
      // Handle different errors from the GitHub API
      return new NextResponse(await response.text(), {
        status: response.status,
      })
    }

    const data = await response.json()
    console.log(data)

    // If the user exists, return a response with `exists: true`
    if (data && data.login) {
      return NextResponse.json({ exists: true, userData: data })
    } else {
      return NextResponse.json({ exists: false })
    }
  } catch (error) {
    console.error('Error checking GitHub username:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
