import React, { Fragment, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import AdminDashboard from '../admin/Dashboard'
import UserDashboard from '../users/Dashboard'


export default function Default() {

  const authCtx = useContext(AuthContext)

return authCtx.isLoggedIn ? authCtx.usertype == 1 ? <AdminDashboard /> : <UserDashboard/> : <Redirect to='/login' />

}
