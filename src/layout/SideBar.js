import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../store/auth-context'

const SideBar = () => {

  const [navbarUser, setNavbarUser] = useState(['nav-parent'])
  const [navbarPayment, setNavbarPayment] = useState(['nav-parent'])
  const [navbarSubject, setNavbarSubject] = useState(['nav-parent'])
  const [navbarBadges, setNavbarBadges] = useState(['nav-parent'])
  const [navbarExam, setNavbarExam] = useState(['nav-parent'])
  const [navbarSettings, setNavbarSettings] = useState(['nav-parent'])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('sidebar-left-position') !== null) {
        var initialPosition = localStorage.getItem('sidebar-left-position'),
          sidebarLeft = document.querySelector('#sidebar-left .nano-content')

        sidebarLeft.scrollTop = initialPosition
      }
    }
  })

  const addclassUser = () => {
    if (navbarUser.includes('nav-parent nav-expanded nav-active')) {
      setNavbarUser(['nav-parent'])
    } else {
      setNavbarUser(['nav-parent nav-expanded nav-active'])
      setNavbarBadges(['nav-parent'])
      setNavbarPayment(['nav-parent'])
      setNavbarSubject(['nav-parent'])
      setNavbarExam(['nav-parent'])
      setNavbarSettings(['nav-parent'])
    }
  }
  const addclassSubject = () => {
    if (navbarSubject.includes('nav-parent nav-expanded nav-active')) {
      setNavbarSubject(['nav-parent'])
    } else {
      setNavbarSubject(['nav-parent nav-expanded nav-active'])
      setNavbarBadges(['nav-parent'])
      setNavbarPayment(['nav-parent'])
      setNavbarUser(['nav-parent'])
      setNavbarExam(['nav-parent'])
      setNavbarSettings(['nav-parent'])
    }
  }
  const addclassPayment = () => {
    if (navbarPayment.includes('nav-parent nav-expanded nav-active')) {
      setNavbarPayment(['nav-parent'])
    } else {
      setNavbarPayment(['nav-parent nav-expanded nav-active'])
      setNavbarBadges(['nav-parent'])
      setNavbarUser(['nav-parent'])
      setNavbarSubject(['nav-parent'])
      setNavbarExam(['nav-parent'])
      setNavbarSettings(['nav-parent'])
    }
  }
  const addclassBadge = () => {
    if (navbarBadges.includes('nav-parent nav-expanded nav-active')) {
      setNavbarBadges(['nav-parent'])
    } else {
      setNavbarBadges(['nav-parent nav-expanded nav-active'])
      setNavbarExam(['nav-parent'])
      setNavbarPayment(['nav-parent'])
      setNavbarSubject(['nav-parent'])
      setNavbarUser(['nav-parent'])
      setNavbarSettings(['nav-parent'])
    }
  }
  const addclassExam = () => {
    if (navbarExam.includes('nav-parent nav-expanded nav-active')) {
      setNavbarExam(['nav-parent'])
    } else {
      setNavbarExam(['nav-parent nav-expanded nav-active'])
      setNavbarBadges(['nav-parent'])
      setNavbarPayment(['nav-parent'])
      setNavbarSubject(['nav-parent'])
      setNavbarUser(['nav-parent'])
      setNavbarSettings(['nav-parent'])
    }
  }

  const addclassSettings = () => {
    if (navbarSettings.includes('nav-parent nav-expanded nav-active')) {
      setNavbarSettings(['nav-parent'])
    } else {
      setNavbarSettings(['nav-parent nav-expanded nav-active'])
      setNavbarExam(['nav-parent'])
      setNavbarBadges(['nav-parent'])
      setNavbarPayment(['nav-parent'])
      setNavbarSubject(['nav-parent'])
      setNavbarUser(['nav-parent'])
    }
  }

  return (
    <aside id='sidebar-left' className='sidebar-left'>
      <div className='sidebar-header'>
        <div className='sidebar-title'>Navigation</div>
        <div
          className='sidebar-toggle d-none d-md-block'
          data-toggle-class='sidebar-left-collapsed'
          data-target='html'
          data-fire-event='sidebar-left-toggle'
        >
          <i className='fas fa-bars' aria-label='Toggle sidebar'></i>
        </div>
      </div>

      <div className='nano'>
        <div className='nano-content'>
          <nav id='menu' className='nav-main' role='navigation'>
            <ul className='nav nav-main'>
              <li>
                <NavLink to='/admin' className='nav-link'>
                  <i className='bx bx-home-alt' aria-hidden='true'></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className={navbarUser.join(' ')}>
                <a
                  className='nav-link'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassUser()
                  }}
                >
                  <i className='fas fa-user' aria-hidden='true'></i>
                  <span>Users</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink
                      to='/admin/list-users'
                      href='admin-list-users.html'
                      className='nav-link'
                    >
                      View Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/register-user' className='nav-link'>
                      Add User
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={navbarPayment.join(' ')}>
                <a
                  className='nav-link'
                  href='/#'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassPayment()
                  }}
                >
                  <i className='fas fa-dollar-sign' aria-hidden='true'></i>
                  <span>Payments</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink to='/admin/view-payment' className='nav-link'>
                      View Payments
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={navbarExam.join(' ')}>
                <a
                  className='nav-link'
                  href='/#'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassExam()
                  }}
                >
                  <i className='fas fa-poll-h' aria-hidden='true'></i>
                  <span>Exam</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink to='/admin/create-exam' className='nav-link'>
                      Create Exam
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/list-exams' className='nav-link'>
                      View Exams
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className={navbarSubject.join(' ')}>
                <a
                  className='nav-link'
                  href='/#'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassSubject()
                  }}
                >
                  <i className='bx bx-file' aria-hidden='true'></i>
                  <span>Subject</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink to='/admin/create-subject'>Create Subject</NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/list-subjects'>View Subjects</NavLink>
                  </li>
                </ul>
              </li>
              <li className={navbarBadges.join(' ')}>
                <a
                  className='nav-link'
                  href='/#'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassBadge()
                  }}
                >
                  <i className='far fa-check-square' aria-hidden='true'></i>
                  <span>Badges</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink to='/admin/create-badge' className='nav-link'>
                      Create Badges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/list-badges' className='nav-link'>
                      View Badges
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className={navbarSettings.join(' ')}>
                <a
                  className='nav-link'
                  href='/#'
                  onClick={(e) => {
                    e.preventDefault()
                    addclassSettings()
                  }}
                >
                  <i className='fa fa-cog' aria-hidden='true'></i>
                  <span>Settings</span>
                </a>
                <ul className='nav nav-children'>
                  <li>
                    <NavLink to='/admin/honorary-payment' className='nav-link'>
                      Honorary Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/conference-payment' className='nav-link'>
                      Conference Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/regular-payment' className='nav-link'>
                      Regular Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/exemption-payment' className='nav-link'>
                      Exemption Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/conversion-payment' className='nav-link'>
                      Conversion Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/subscription-payment' className='nav-link'>
                      Subscription Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/update-password' className='nav-link'>
                      Update Password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/admin/donation' className='nav-link'>
                      Configure Donation
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
