import React from 'react'
import AuthContext from '../store/auth-context'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'
import { useContext } from 'react'

const Index = (props) => {
  const authCtx = useContext(AuthContext)

  if (authCtx.usertype == 1) {
    return <AdminLayout>{props.children}</AdminLayout>
  } else if (authCtx.usertype > 1) {
    return <UserLayout>{props.children}</UserLayout>
  } else {
    return <div>{props.children}</div>
  }
}

export default Index
