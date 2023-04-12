import React, {useContext} from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Navigate } from 'react-router-dom'

const Profile = () => {
    const {ready, user} = useContext(UserContext)

    if (!ready) {
        return 'Loading...'
    }

    if ( ready && !user ) {
        return <Navigate to={'/login'} />
    }
  return (
    <div>acount page for {user?.name} </div>
  )
}

export default Profile