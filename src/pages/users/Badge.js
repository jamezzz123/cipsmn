import React, { useState, useEffect, useCallback, useContext } from 'react'
import Loader from '../../components/loader'
import axios from '../../default_axios'
import AuthContext from '../../store/auth-context'
const Badge = () => {
  const authCtx = useContext(AuthContext)
  const [badges, setBadges] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchBadges = useCallback(() => {
    setIsLoading(true)
    axios
      .get('user/badge/get', {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      })
      .then((response) => {
        setIsLoading(false)
        console.log(response)
        if (response.status === 200 || response.status === 200) {
          setBadges(response.data)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
      })
  }, [authCtx.token])

  useEffect(() => {
    try {
      fetchBadges()
    } catch (error) {
      console.log(error)
    }
  }, [fetchBadges])

  return (
    <section role='main' className='content-body'>
      <header className='page-header'>
        <h2>My Badge</h2>
      </header>
      <h4 className='pt-4 mb-0 mt-0 font-weight-bold text-dark'>My badge</h4>
      <p className>Below are all the badges you have earned</p>
      {
        isLoading ? <Loader /> :
          <div className='row show-grid'>
            {badges && badges.length > 0 ? (
              badges.map((badge, index) => (
                <div className='col m-3' key={index}>
                  <section className='card'>
                    <header className='card-header bg-tertiary'>
                      <div className='card-header-profile-picture'>
                        <img src={badge.image_url} />
                      </div>
                    </header>
                    <div className='card-body'>
                      <p className='mb-1'>
                        <a href='#'>
                          <i className='bx bx-badge-check me-1 text-4 top-3 position-relative' />{' '}
                          {badge.name}
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              ))
            ) : (
              <div>User has earned no Badges</div>
            )}
          </div>
      }
    </section>
  )
}

export default Badge
