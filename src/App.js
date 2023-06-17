import React, { Fragment, useContext } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import AuthContext from './store/auth-context'
import Layout from './layout/Index'
import Default from './pages/common'

import ListUsers from './pages/admin/ListUsers'
import ViewUser from './pages/admin/ViewUser'
import AdminDashboard from './pages/admin/Dashboard'
import AdminRegisterUser from './pages/admin/AdminRegisterUser'
import CreateBadge from './pages/admin/CreateBadge'
import EditUser from './pages/admin/EditUser'
import ViewExam from './pages/admin/ViewExam'
import UserDashboard from './pages/users/Dashboard'
import UserCerts from './pages/users/Certs'
import Signup from './pages/users/Signup'
import EditExam from './pages/admin/EditExam'

import EditBadge from './pages/admin/EditBadge'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
// minified version is also included
import Login from './pages/common/Login'
import CreateExam from './pages/admin/CreateExam'
import ListExam from './pages/admin/ListExam'
import ListBadge from './pages/admin/ListBadge'
import ViewBadge from './pages/admin/ViewBadge'
import CreateSubject from './pages/admin/CreateSubject'
import ListSubject from './pages/admin/ListSubject'
import EditSubject from './pages/admin/EditSubject'
import ViewSubject from './pages/admin/ViewSubject'
import ViewPayment from './pages/admin/ViewPayment'
import Badge from './pages/users/Badge'
import Payments from './pages/users/Payments'
import Donate from './pages/users/Donate'
import Profile from './pages/users/Profile'

import AdminHonoraryPayment from './pages/admin/AdminHonoraryPayment'
import AdminConferencePayment from './pages/admin/AdminConferencePayment'
import AdminRegularPayment from './pages/admin/AdminRegularPayment'
import AdminExemptionPayment from './pages/admin/AdminExemptionPayment'
import AdminConversionPayment from './pages/admin/AdminConversionPayment'
import AdminSubscriptionPayment from './pages/admin/AdminSubscriptionPayment'
import UpdatePassword from './pages/admin/UpdatePassword'
import AdminDonation from './pages/admin/AdminDonation'


function App() {

  const route = useLocation()

  React.useEffect(() => {
    if (route.pathname?.includes("/login")) {
      localStorage.clear()
    }
  }, [route]);
  
  const authCtx = useContext(AuthContext)



  return (
    <Fragment>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout>
        <Switch>
          <Route path='/' exact>
            {/* <Login /> */}
            <Default />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/admin' exact>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminDashboard />}
            {authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/register-user'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && (
              <AdminRegisterUser />
            )}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/list-users' exact>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ListUsers />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/view-user/:id' exact>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ViewUser />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/edit-user/:id' exact>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <EditUser />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/create-exam'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <CreateExam />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/list-exams'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ListExam />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/exam/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ViewExam />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/edit-exam/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <EditExam />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/create-badge'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <CreateBadge />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/create-subject'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <CreateSubject />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/list-badges'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ListBadge />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/list-subjects'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ListSubject />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/badge/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ViewBadge />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/view-subject/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ViewSubject />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/edit-badge/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <EditBadge />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/edit-subject/:id'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <EditSubject />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/view-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <ViewPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/user' exact>
            {authCtx.isLoggedIn && <UserDashboard />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/user/certs' exact>
            {authCtx.isLoggedIn && <UserCerts />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/user/badge' exact>
            {authCtx.isLoggedIn && <Badge />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/user/payments' exact>
            {authCtx.isLoggedIn && <Payments />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/user/donate' exact>
            {authCtx.isLoggedIn && <Donate />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/user/profile' exact>
            {authCtx.isLoggedIn && <Profile />}
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path='/admin/honorary-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminHonoraryPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/conference-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminConferencePayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/regular-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminRegularPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/exemption-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminExemptionPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/conversion-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminConversionPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/subscription-payment'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminSubscriptionPayment />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/update-password'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <UpdatePassword />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/admin/donation'>
            {authCtx.isLoggedIn && authCtx.usertype == 1 && <AdminDonation />}
            {!authCtx.isLoggedIn && authCtx.usertype != 1 && (
              <Redirect to='/login' />
            )}
          </Route>
          {/* MUST ALWAYS BE AT THE END !!!!!!!!!! */}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
          {/* DONT ADD ANY ROUTES AFTER THIS LINE / */}
        </Switch>
      </Layout>
    </Fragment>
  )
}

export default App
