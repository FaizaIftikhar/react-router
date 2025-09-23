//now add link and to property and in to property i add the path
import React from 'react'
import {NavLink,useNavigate} from 'react-router-dom'

const NavBar = () => {
    const navigate=useNavigate();
  return (
    <div>
        <img src="" alt=""/>
        <ul>
            <NavLink to='/login'><li>Login Form</li></NavLink>
            <NavLink to ='/user'><li>Users List </li></NavLink>
            <NavLink to ='/about'><li>About</li></NavLink>
        </ul>
        <button onClick={()=>navigate('/about',{replace:true})}>Get Started</button>
      
    </div>
  )
}

export default NavBar
