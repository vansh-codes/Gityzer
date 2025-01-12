import { NextResponse } from 'next/server'
import { RequestBody } from './interface'

export async function POST(req: Request): Promise<NextResponse> {
  const { username }: RequestBody = await req.json()

  if (!username) {
    return new NextResponse('Username required', { status: 400 })
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      method: 'GET',
    })

    if (!response.ok) {
      return new NextResponse(await response.text(), {
        status: response.status,
      })
    }

    const data: { login?: string } = await response.json()

    if (data.login) {
      return NextResponse.json({ exists: true, userData: data })
    } else {
      return NextResponse.json({ exists: false })
    }
  } catch (error) {
    console.error('Error checking GitHub username:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
