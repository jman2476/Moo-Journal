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
            console.log(err)
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
        <div className="authform justify-center w-100">

            <div className="flex flex-column tl">
                {formData.isLogin ? (
                    <>
                        <h1 className="bb pb3 ma0">Log In</h1>
                        <p className="ma0 pb3 p f5 pointer">Not a User? <span onClick={() => setFormData({ ...formData,  errorMessage:'', isLogin: false })} className="underline-hover">Sign Up</span></p>

                    </>
                ) : (
                    <>

                        <h1 className="bb pb3 ma0">Sign Up</h1>
                        <p className="ma0 pb3 pt1 f5 pointer">Already a User? <span onClick={() => setFormData({ ...formData, errorMessage:'',isLogin: true })} className="underline-hover">Log In</span></p>
                    </>
                )}
            </div>


            <form onSubmit={handleSubmit} className="flex flex-column items-end">
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

                <button className="btn">{formData.isLogin ? 'Log In' : 'Sign Up' }</button>
            
            </form>
        </div>
    )
}

export default AuthForm