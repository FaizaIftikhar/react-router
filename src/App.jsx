//react router allow navigation without refreshing the page. in react router
//when we navigate from one page to other the page will not reload
//from this we can create complex and dynamic applications
import React from 'react'
import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom'
import About from './pages/About';
import LoginForm from './pages/LoginForm';
import UserList from './pages/UserList';
const App=()=>{
  return(
    <>
    <NavBar/>
    <Routes>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/user' element={<UserList/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </>

  );
}
export default App