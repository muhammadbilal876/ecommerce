import React, { useContext } from 'react'
import { AuthContext } from '../context/Context'
import Login from '../pages/authentication/Login'

export default function PrivateRoutes(props) {
    const { isAuthenticated } = useContext(AuthContext)

    const { Components} = props

    if(!isAuthenticated){
        return <Login />
    }
    return (
        <Components />
    )
}
