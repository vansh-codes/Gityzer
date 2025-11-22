'use client'

import React from 'react'
import MyCard from '@/components/MyCard'
import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'

function Contributors() {
  const [contributors, setContributors] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchAllContributors() {
      const contributors = []
      let page = 1
      const perPage = 100

      try {
        setLoading(true)
        
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
      } finally {
        setLoading(false);
      }

      setContributors(contributors)
    }
    fetchAllContributors()
  }, [])

  return (
    <section>
      <h2 className='flex text-xl md:text-3xl font-bold justify-center text-white mb-10'> ❤️ Our Repo Contributors ❤️</h2>
      {loading ? (
        <Loader message="Loading contributors..." />
      ) : (
        <div className='px-4 md:px-10 pb-10 grid grid-cols-1 gap-5 md:gap-7 md:grid-cols-4 lg:grid-cols-5'>
          {contributors?.map((contributor) => {
            return (
              <MyCard
                key={contributor?.login}
                login={contributor?.login}
                img={contributor?.avatar_url}
                url={contributor?.html_url}
                contributions={contributor?.contributions}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Contributors
