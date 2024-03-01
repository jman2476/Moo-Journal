import { useState } from 'react'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations'

function AuthForm() {
  const navigate = useNavigate()
  const { state, setState } = useStore()
  const [formData, setFormData] = useState({
    errorMessage: '',
    username: '',
    email: '',
    password: '',
    isLogin: true
  })
  const [authenticateUser] = useMutation(formData.isLogin ? LOGIN_USER : REGISTER_USER, {
    variables: formData
  })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const resolverName = formData.isLogin ? 'loginUser' : 'registerUser'

      const { data: userData } = await authenticateUser()

      setState({
        ...state,
        user: userData[resolverName]
      })

      setFormData({
        ...formData,
        username: '',
        email: '',
        password: '',
        errorMessage: ''
      })

      navigate('/')
    } catch (err) {
      setFormData({
        ...formData,
        errorMessage: err.message
      })
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="note-form">
      <h1 className="text-center">{formData.isLogin ? 'Log In' : 'Register'}</h1>

      <form onSubmit={handleSubmit} className="column">
        {formData.errorMessage && <p className="error text-center">{formData.errorMessage}</p>}

        {!formData.isLogin && (
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your username" />
        )}
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          placeholder="Enter your email address" />

        <input
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          placeholder="Enter your password" />

        <button>Submit</button>

        <div className="row justify-center auth-status-wrap">
          <span onClick={() => setFormData({ ...formData, isLogin: true })} className={formData.isLogin ? 'active' : ''}>Log In</span>
          <span>|</span>
          <span onClick={() => setFormData({ ...formData, isLogin: false })} className={!formData.isLogin ? 'active' : ''}>Register</span>
        </div>
      </form>
    </div>
  )
}

export default AuthForm