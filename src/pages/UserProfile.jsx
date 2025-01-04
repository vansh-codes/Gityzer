'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import NotFound from '@/pages/NotFound'
import Image from 'next/image'
import { FaMapPin, FaClock, FaGithub, FaLink, FaDownload, FaBackward, FaPlusCircle } from 'react-icons/fa'
import { IoArrowBackCircle } from "react-icons/io5";
import React from 'react'

export default function UserProfile({ username }) {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const reposPerPage = 6
  const [theme, setTheme] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')
  const [tagline, setTagline] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [is404, setIs404] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true) // Start loading
      setIs404(false) // Reset 404 state for each new fetch

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`)

        if (userResponse.status === 404) {
          setIs404(true)
          setUserData(null)
          setRepositories([])
          setIsLoading(false)
          return
        }

        const userData = await userResponse.json()
        setUserData(userData)

        const reposResponse = await fetch(userData.repos_url)
        const reposData = await reposResponse.json()
        setRepositories(reposData)
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setIsLoading(false) // End loading
      }
    }

    if (username !== 'contributors') fetchUserData()
  }, [username])

  const totalPages = Math.ceil(repositories.length / reposPerPage)
  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleThemeChange = (e) => {
    const newTheme = e.target.value
    setTheme(newTheme)
    updateUrl(newTheme, textColor)
  }

  const handleTextColorChange = (e) => {
    const newTextColor = e.target.value
    setTextColor(newTextColor)
    updateUrl(theme, newTextColor)
  }

  const updateUrl = (theme, color) => {
    const queryString = `?theme=${encodeURIComponent(theme)}&color=${encodeURIComponent(color)}`
    router.push(`/${username}${queryString}`)
  }

  const handleBadgeCreation = () => {
    window.location.href = `${window.location.origin}${window.location.pathname}/badge`;
  }

  // Function to download repo stats in .md format
  const downloadRepoStats = (repo) => {
    const statsMarkdown = `# Repository: ${repo.name}
  
  **Description**: ${repo.description || 'No description available'}
  
  ## Stats:
  - **Stars**: ${repo.stargazers_count}
  - **Forks**: ${repo.forks_count}
  - **Open Issues**: ${repo.open_issues_count}
  - **Language**: ${repo.language || 'Unknown'}
  
  ## Links:
  - **Repository URL**: [${repo.html_url}](${repo.html_url})
  - **Created At**: ${new Date(repo.created_at).toLocaleDateString()}
  - **Last Updated**: ${new Date(repo.updated_at).toLocaleDateString()}
  `

    const blob = new Blob([statsMarkdown], { type: 'text/markdown' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${repo.name}_stats.md`
    link.click()
  }

  // Function to download profile stats in .md format with additional info
  const downloadProfileStats = () => {
    const profileMarkdown = `# GitHub Profile: ${userData.name || 'Unknown User'}
  
  **Username**: ${userData.login}
  
  **Bio**: ${userData.bio || 'No bio available'}
  
  **Location**: ${userData.location || 'Unknown'}
  
  **Company**: ${userData.company || 'Unknown'}
  
  **Email**: ${userData.email || 'Not provided'}
  
  **Followers**: ${userData.followers}
  
  **Following**: ${userData.following}
  
  **Public Repositories**: ${userData.public_repos}
  
  **Public Gists**: ${userData.public_gists}
  
  **Account Created On**: ${new Date(userData.created_at).toLocaleDateString()}
  
  **Last Updated On**: ${new Date(userData.updated_at).toLocaleDateString()}
  
  ---
  
  ## Additional Information:
  
  - **URL**: [GitHub Profile Link](https://github.com/${userData.login})
  - **Profile Image**: ![Profile Image](${userData.avatar_url})
  `

    const blob = new Blob([profileMarkdown], { type: 'text/markdown' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${userData.login}_profile_stats.md`
    link.click()
  }

  if (is404) {
    return <NotFound />
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    )
  }
  return (
        <div className='min-h-screen bg-gray-900 text-white relative'>
      <header className='p-4 flex flex-row items-center'>
          <svg
            width='40px'
            height='40px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.35003 16.88C9.35003 16.95 9.28003 17 9.18003 17C9.08003 17 9.00003 17 9.00003 16.88C9.00003 16.76 9.08003 16.76 9.17003 16.76C9.26003 16.76 9.35003 16.81 9.35003 16.88ZM8.35003 16.73C8.35003 16.8 8.35003 16.88 8.49003 16.9C8.52584 16.9172 8.56701 16.9195 8.6045 16.9064C8.642 16.8933 8.67275 16.8658 8.69003 16.83C8.69003 16.76 8.69003 16.69 8.55003 16.66C8.41003 16.63 8.37003 16.66 8.35003 16.73ZM9.77003 16.68C9.68003 16.68 9.62003 16.76 9.63003 16.84C9.64003 16.92 9.72003 16.95 9.82003 16.93C9.92003 16.91 9.97003 16.84 9.96003 16.77C9.95003 16.7 9.87003 16.67 9.77003 16.68ZM11.9 4.00002C10.8454 3.99009 9.79962 4.19333 8.82547 4.59754C7.85132 5.00175 6.96887 5.5986 6.23107 6.35227C5.49328 7.10594 4.91535 8.0009 4.53197 8.98343C4.14859 9.96597 3.96765 11.0158 4.00003 12.07C3.97211 13.7969 4.48426 15.4894 5.46493 16.9111C6.4456 18.3328 7.84582 19.4127 9.47003 20C9.88003 20.07 10.03 19.81 10.03 19.6C10.03 19.39 10.03 18.26 10.03 17.6C10.03 17.6 7.77003 18.1 7.29003 16.6C7.29003 16.6 6.93003 15.6 6.40003 15.39C6.40003 15.39 5.66003 14.87 6.45003 14.88C6.70877 14.9149 6.95573 15.01 7.17108 15.1576C7.38643 15.3052 7.56417 15.5013 7.69003 15.73C7.79466 15.9351 7.9401 16.1167 8.11742 16.2635C8.29473 16.4104 8.50019 16.5195 8.72118 16.5841C8.94218 16.6487 9.17404 16.6675 9.40255 16.6393C9.63106 16.6111 9.85139 16.5364 10.05 16.42C10.0879 16.0025 10.2679 15.6107 10.56 15.31C8.76003 15.1 6.94003 14.84 6.94003 11.65C6.92091 11.2896 6.97881 10.9293 7.10985 10.5931C7.2409 10.2569 7.44209 9.95241 7.70003 9.70002C7.45667 8.96799 7.48507 8.17282 7.78003 7.46002C8.46003 7.24002 10.01 8.35002 10.01 8.35002C11.3342 7.97655 12.7359 7.97655 14.06 8.35002C14.06 8.35002 15.61 7.24002 16.29 7.46002C16.5914 8.17142 16.6198 8.96894 16.37 9.70002C16.6371 9.94893 16.8489 10.2511 16.9919 10.587C17.1348 10.9229 17.2057 11.285 17.2 11.65C17.2 14.85 15.3 15.1 13.5 15.31C13.6809 15.5129 13.8186 15.7506 13.9046 16.0085C13.9905 16.2664 14.023 16.5391 14 16.81C14 17.93 14 19.31 14 19.58C13.9994 19.6475 14.015 19.7142 14.0456 19.7744C14.0763 19.8346 14.1209 19.8866 14.1759 19.9258C14.2308 19.9651 14.2945 19.9905 14.3613 19.9999C14.4282 20.0094 14.4964 20.0025 14.56 19.98C16.1813 19.3978 17.5786 18.321 18.5547 16.9017C19.5309 15.4824 20.0364 13.7922 20 12.07C20.0094 11.0051 19.8061 9.94902 19.402 8.96371C18.9979 7.9784 18.4011 7.08369 17.6467 6.33205C16.8923 5.58041 15.9953 4.98696 15.0085 4.58651C14.0217 4.18606 12.9649 3.98667 11.9 4.00002ZM7.14003 15.41C7.14003 15.41 7.14003 15.52 7.14003 15.58C7.15118 15.5912 7.16442 15.6001 7.17901 15.6061C7.1936 15.6122 7.20923 15.6153 7.22503 15.6153C7.24082 15.6153 7.25646 15.6122 7.27105 15.6061C7.28563 15.6001 7.29888 15.5912 7.31003 15.58C7.31003 15.58 7.31003 15.47 7.31003 15.4C7.31003 15.33 7.18003 15.37 7.14003 15.41ZM6.79003 15.14C6.79003 15.14 6.79003 15.24 6.86003 15.27C6.86846 15.2805 6.87913 15.2889 6.89124 15.2947C6.90335 15.3004 6.91661 15.3035 6.93003 15.3035C6.94345 15.3035 6.9567 15.3004 6.96881 15.2947C6.98093 15.2889 6.99159 15.2805 7.00003 15.27C7.00003 15.27 7.00003 15.17 6.93003 15.14C6.86003 15.11 6.81003 15.11 6.79003 15.14ZM7.79003 16.32C7.79003 16.32 7.79003 16.46 7.79003 16.53C7.79003 16.6 7.96003 16.61 8.00003 16.53C8.04003 16.45 8.00003 16.39 8.00003 16.32C8.00003 16.25 7.87003 16.27 7.83003 16.32H7.79003ZM7.42003 15.83C7.42003 15.83 7.42003 15.95 7.42003 16.03C7.42003 16.11 7.56003 16.14 7.61003 16.11C7.63535 16.0809 7.6493 16.0436 7.6493 16.005C7.6493 15.9664 7.63535 15.9291 7.61003 15.9C7.56003 15.82 7.48003 15.79 7.42003 15.83Z'
              fill='#fff'
            />
          </svg>
          <a href='/'>
            <h1 className='text-xl font-bold text-white'>Gityzer</h1>
          </a>
        </header>
      <div className='p-4 pb-14 pt-0'>
        <div className='absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-600 opacity-30 -z-10'></div>
        {userData && (
          <div className='max-w-6xl mx-auto bg-gray-800 bg-opacity-80 rounded-xl p-8 shadow-lg'>
          <a href="/" className='text-lg flex gap-2 text-gray-400 items-center m-4 font-semibold hover:underline'><FaBackward /> Try Another Profile </a>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
              <div className='flex-shrink-0'>
                <Image
                  src={userData.avatar_url || '/default_avatar.jpg'}
                  alt='Profile'
                  width={180}
                  height={180}
                  className='rounded-full border-4 border-purple-500'
                />
              </div>
              <div className='text-center md:text-left'>
                <h1 className='text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-800'>
                  {userData.name || 'Unknown User'}
                </h1>
                <p className='text-gray-400 mt-2'>@{userData.login || 'username'}</p>
                <div className='mt-4 space-y-2'>
                  <p className='flex justify-center md:justify-start items-center gap-2 text-gray-400'>
                    <FaMapPin className='w-4 h-4' />
                    {userData.location || 'Unknown'}
                  </p>
                  <p className='flex justify-center md:justify-start items-center gap-2 text-gray-400'>
                    <FaClock className='w-4 h-4' />
                    {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>
                </div>
                <div className='mt-4 flex justify-center md:justify-start gap-6 text-gray-500'>
                  <div>
                    <FaGithub className='inline mr-1' />
                    <span>{userData.followers} followers</span>
                  </div>
                  <div>
                    <FaLink className='inline mr-1' />
                    <span>{userData.following} following</span>
                  </div>
                </div>
              </div>
              <div>
                <button onClick={handleBadgeCreation} className='bg-slate-700 p-8 rounded-xl border-gray-50 border-[2px] border-dashed flex items-center justify-center gap-2'>
                  <FaPlusCircle className='inline' /> Create your badge
                </button>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className='text-3xl font-semibold mb-6 text-purple-400'>
                {userData.login.toUpperCase()}'s Repositories
              </h3>
              <button
                onClick={downloadProfileStats}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2'
              >
                <FaDownload />
                Profile Stats
              </button>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
              {currentRepos.map((repo) => (
                <div key={repo.id} className='bg-gray-700 p-6 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between'>  
                  <h4 className='text-xl font-semibold text-blue-400 hover:underline'>
                    <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                      {repo.name}
                    </a>
                  </h4>
                  <p className='text-gray-300 mt-2 grow'>
                    {repo.description || 'No description available.'}
                  </p>
                  <div className='flex bg-stone-500/10 p-1.5 rounded-md justify-between mt-4 text-gray-400 text-sm'>
                    <span>{repo.language || 'Unknown'}</span>
                    <span>★ {repo.stargazers_count || 0}</span>
                  </div>
                  <button
                    onClick={() => downloadRepoStats(repo)}
                    className='mt-4 px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 justify-center'>
                    <FaDownload />
                    Stats
                  </button>
                </div>
              ))}
            </div>

              <div className='flex mb-5 justify-between items-center mt-8'>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className='px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50'
                >
                  Previous
                </button>
                <span className='text-gray-300'>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className='px-4 py-2 bg-purple-600 text-white rounded-md disabled:opacity-50'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
