import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, db } from './Auth/Firebase'
import { collection, getDocs } from 'firebase/firestore'


const Navbar = () => {
    let navigate = useNavigate()
    const location = useLocation()
    const notesRef = collection(db, "Points");

    const handleLogout =  () => {
       signOut(auth).then(()=>{
        navigate('/')
       }).catch((err)=>{
        console.log(err)
       })
    }

    const handleLeaderboard = async () => {
      navigate('/Leaderboard')
      const data = await getDocs(notesRef)
      data.forEach((note) => {
        console.log(note.id,note.data())
      })
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand text-danger" href="#">Code-Wars 🚀</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active text-danger" aria-current="page" href="#">Home</a>
                </li>
            </ul>
            {
              (location.pathname==='/Main' || location.pathname==='/Leaderboard')?
              <>
              {
                location.pathname === '/Leaderboard' ?
                <button className='btn btn-danger mx-1' onClick={()=> navigate('/Main')}>App</button>
                :
                <button className='btn btn-danger mx-1' onClick={()=> handleLeaderboard()}>Leaderboard</button>
              }
              
              <button className='btn btn-danger mx-1' onClick={()=> handleLogout()}>Log Out</button>
              </>
              :
              <>
              <button className='btn btn-danger mx-1' onClick={()=> navigate('/Login')}>Login</button>
              <button className='btn btn-danger mx-1' onClick={()=> navigate('/Signup')}>Sign up</button>
              </>
            }
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar
