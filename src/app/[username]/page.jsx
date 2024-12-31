'use client'
import UserProfile from '@/pages/UserProfile'

function UserPage({ params }) {
  const { username } = params
  return <UserProfile username={username} />
}

export default UserPage
