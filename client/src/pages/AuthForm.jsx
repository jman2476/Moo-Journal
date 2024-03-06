import { useState } from 'react';
import { useStore } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../graphql/mutations';

function AuthForm() {
    const navigate = useNavigate();
    const { state, setState } = useStore();
    const [formData, setFormData] = useState({
        errorMessages: [],
        username: '',
        email: '',
        password: '',
        isLogin: true
    });

    const [authenticateUser] = useMutation(formData.isLogin ? LOGIN_USER : REGISTER_USER);

    const location = useLocation();
    const message = location.state && location.state.message;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resolverName = formData.isLogin ? 'loginUser' : 'registerUser';

            const { data: userData } = await authenticateUser({
                variables: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            });

            setState({
                ...state,
                user: userData[resolverName]
            });

            setFormData({
                ...formData,
                username: '',
                email: '',
                password: '',
                errorMessages: []
            });

            navigate('/');
        } catch (err) {
            setFormData({
                ...formData,
                errorMessages: err.message.split(',')
            });
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="authform justify-center w-100">
            {message && <p>{message}</p>}
            <div className="flex flex-column tl">
                {formData.isLogin ? (
                    <>
                        <h1 className="bb pb3 ma0">Log In</h1>
                        <p className="ma0 pb3 p f5 pointer">Not a User? <span onClick={() => setFormData({ ...formData, errorMessages: [], isLogin: false })} className="underline-hover">Sign Up</span></p>
                    </>
                ) : (
                    <>
                        <h1 className="bb pb3 ma0">Sign Up</h1>
                        <p className="ma0 pb3 pt1 f5 pointer">Already a User? <span onClick={() => setFormData({ ...formData, errorMessages: [], isLogin: true })} className="underline-hover">Log In</span></p>
                    </>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-column items-end">
                {formData.errorMessages.length > 0 && (
                    <div className="error-container">
                        {formData.errorMessages.map((error, index) => (
                            <p key={index} className="error text-center">{error}</p>
                        ))}
                    </div>
                )}
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
                <button className="btn">{formData.isLogin ? 'Continue' : 'Start MyMooJournal Journey'}</button>
            </form>
        </div>
    );
}

export default AuthForm;