import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './Firebase'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("hello")
    try {
        await signInWithEmailAndPassword(auth, email, password).then(() => {
            alert("You are Logged In. Now you can enjoy the App.")
            navigate('/')
        })
    } catch (error) {
        alert("Invalid credentials!!")
        console.log(error)
    }
  }

  return (
    <div className= 'p-3 container border border-danger w-25' style={{marginTop: '10%'}}>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-danger">Email address</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-danger">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-danger">Log In</button>
            </form>
            <div className='mt-5'>
                <p className='text-danger'>Don't have an account</p>
                <button type="submit" className="btn btn-danger" onClick={() => navigate('/Signup')}>Sign Up</button>
            </div>
        </div>
  )
}

export default Login
