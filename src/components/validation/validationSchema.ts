import * as yup from 'yup';

const registerSchema = yup.object().shape({
    fullname: yup.string().required("Fullname is required").min(3, "Fullname must be at least 3 characters"),
    login: yup.string().required("Login is required").min(5, "Login must be at least 5 characters").max(12, "Login length must not exceed 12 characters"),
    password: yup.string().required("Password is required").min(5, 'Password must be at least 5 characters'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must match').required("Confirm Password is requied"),
})

export default registerSchema;