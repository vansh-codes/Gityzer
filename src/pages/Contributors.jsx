'use client'

import React from 'react'
import MyCard from '@/components/MyCard'
import { useState, useEffect } from 'react'

function Contributors() {
  const [contributors, setContributors] = useState()

  useEffect(() => {
    async function fetchAllContributors() {
      const contributors = []
      let page = 1
      const perPage = 100

      try {
        while (true) {
          const response = await fetch(
            `https://api.github.com/repos/vansh-codes/Gityzer/contributors?per_page=${perPage}&page=${page}`
          )
          const data = await response.json()

          // If the data is empty, we have no more pages
          if (data.length === 0) break

          // Add contributors from this page to the array
          contributors.push(...data)
          page++
        }
        console.log(contributors)
      } catch (error) {
        console.error('Error fetching contributors data:', error)
      }

      setContributors(contributors)
    }
    fetchAllContributors()
  }, [])
  return (
    <>
      <div className='flex text-xl font-bold text-white mb-10'> ❤️ Our Repo Contributors ❤️</div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6'>
        {contributors?.map((contributor) => {
          return (
            <MyCard
              login={contributor.login}
              img={contributor.avatar_url}
              url={contributor.html_url}
              contributions={contributor.contributions}
            />
          )
        })}
      </div>
    </>
  )
}

export default Contributors
