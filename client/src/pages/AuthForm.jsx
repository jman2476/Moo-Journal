import { useState } from 'react'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'
import { SIGNUP_USER, LOGIN_USER } from '../graphql/mutations'

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
    const [authenticateUser] = useMutation(formData.isLogin ? LOGIN_USER : SIGNUP_USER, {
        variables: formData
    })

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const resolverName = formData.isLogin ? 'loginUser' : 'signUpUser'

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
            <h1 className="text-center">{formData.isLogin ? 'Log In' : 'Sign Up'}</h1>

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

                {/* <button className="btn submit">Submit</button> */}

                <div className="row justify-center auth-status-wrap">
                    <button className={`btn ${formData.isLogin ? 'active submit' : ''}`} onClick={() => setFormData({ ...formData, isLogin: true })}>
                        {formData.isLogin ? 'Submit' : 'Login'}
                    </button>
                    <span>|</span>
                    <button className={`btn ${formData.isLogin ? 'active' : 'submit'}`}onClick={() => setFormData({ ...formData, isLogin: false })}>
                        {formData.isLogin ? 'Sign Up' : 'Submit'}      
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AuthForm