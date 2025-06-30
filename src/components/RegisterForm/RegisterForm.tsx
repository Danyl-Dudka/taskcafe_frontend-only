import { useState } from 'react';
import type { FormErrors } from "../types.tsx";
import registerSchema from '../validation/validationSchema';
import { ValidationError } from "yup";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function RegisterForm() {
    const [fullname, setFullName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerSchema.validate(
                { fullname, login, password, confirmPassword },
                { abortEarly: false }
            );

            const users = JSON.parse(localStorage.getItem('users') || "{}");
            if (users[login]) {
                setFormErrors({ login: 'User is already registered' });
            } else {
                users[login] = { password, fullname };
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('fullname', fullname);
                localStorage.setItem('login', login);
                localStorage.setItem('isAuth', 'true');
                setFormErrors({});
                toast.success('User succesfully registered!')
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1500)
            }
        } catch (err: unknown) {
            if (err instanceof ValidationError) {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((e) => {
                    if (e.path) errors[e.path] = e.message;
                });
                setFormErrors(errors);
            } else {
                toast.error('Unexpected error during validation.')
            }
        }
    };



    return (
        <div>
            <h2>Register</h2>
            <b style={{ fontSize: 22, marginBottom: 30, fontFamily: "serif" }}>Please create your user</b>
            <p>Full name</p>
            <input type="text"
                className="fullname_input"
                value={fullname}
                placeholder="Enter your fullname"
                onChange={(e) => setFullName(e.target.value)} />
            {formErrors.fullname && <p className="error">{formErrors.fullname}</p>}

            <p>Login</p>
            <input
                type="text"
                className="login_input"
                placeholder="Enter your login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            {formErrors.login && <p className="error">{formErrors.login}</p>}

            <p>Password</p>
            <input
                type="password"
                className="password_input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className="error">{formErrors.password}</p>}

            <p>Password (Confirm)</p>
            <input
                type="password"
                className="password_input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}

            <button type="button" className="confirm_button" onClick={handleRegister}>Register</button>

        </div>
    )
}