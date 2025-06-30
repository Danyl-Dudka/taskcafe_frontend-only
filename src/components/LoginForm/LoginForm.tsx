import { useContext, useState } from "react";
import { AuthContext } from "../../content";
import './LoginForm.css';
import RegisterForm from "../RegisterForm/RegisterForm";
import { toast } from "react-toastify";
export default function LoginForm() {
    const { setIsAuth } = useContext(AuthContext);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[login];
        if (user && user.password === password) {
            toast.success('Login successful!')
            setTimeout(() => {
                setIsAuth(true);
                localStorage.setItem('isAuth', 'true');
            }, 1500)
        } else {
            toast.error('Incorrect login or password!')
            setError('Incorrect login or password!')
        }
    };

    return (
        <div className="main">
            <div className="image_hpage">
                <img src="../../images/login_picture_human.svg" alt="login_picture" className="human_logo" />
            </div>
            <div className="form_wrapper">
                <form onSubmit={(e) => e.preventDefault()}>
                    <img src="../../images/taskcafe_main_logo.png" alt="taskcafe-logo" className="main_logo" />
                    {isRegistering ? (
                        <RegisterForm />
                    ) : (
                        <div>
                            <h2>Sign in</h2>
                            <input
                                type="text"
                                className="login_input"
                                placeholder="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <input
                                type="password"
                                className="password_input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className="error_message">Incorrect login or password</p>}

                            <button type="button" className="confirm_button" onClick={handleLogin}>Login</button>


                        </div>
                    )}
                    <p style={{ marginTop: "1rem" }}>
                        {isRegistering ? "Already have an account?" : "No account?"}
                        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Sign in" : "Registration"}</button>
                    </p>
                </form>
            </div>
        </div>
    )
}