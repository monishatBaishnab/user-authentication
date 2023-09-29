import { Link } from "react-router-dom";
import facebook from '../../assets/images/Facebook.png'
import google from '../../assets/images/google.png'
import { useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [passValue, setPassValue] = useState('');
    const [passError, setPassError] = useState('');
    const emailRef = useRef();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleInputPass = (e) => {
        const pass = e.target.value;
        setPassError('');
        setPassValue(pass);
        if (pass.length < 6) {
            setPassError('Password length must up to 6 characters.');
            return;
        }
        if (!/[A-Z]/.test(pass)) {
            setPassError('Must contain at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(pass)) {
            setPassError('Must contain at least one lowercase letter.');
            return;
        }
        if (!/[1-9]/.test(pass)) {
            setPassError('Must include at least one numeric digit.');
            return;
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.user.value;
        const pass = e.target.pass.value;

    }

    const handleForgotPass = () => {
        const email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Link send Success. Check yout Email.'
                })
            })
            .catch(error => {
                Toast.fire({
                    icon: 'success',
                    title: error.message
                })
            })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
            <div className="hidden md:inline-block">
                <h1 className="text-4xl font-medium">Log In to</h1>
                <p className="text-xl mt-3 mb-10">User Authentication System.</p>
                <p>If you don’t have an account register</p>
                <p>You can <Link to='/regester' className="text-primary/80 font-medium">Register here !</Link></p>
            </div>
            <div className="flex justify-center">
                <div className="w-[370px]">
                    <h4 className="text-2xl mb-5 font-medium">Log In</h4>
                    <form onSubmit={handleLogin}>
                        <input name="user" type="text" ref={emailRef} className="px-5 py-3 w-full rounded-md bg-[#F0EFFF] focus:outline-none placeholder:text-[#A7A3FF]" placeholder="Enter email or user name" />
                        <div className="relative mt-5">
                            <input name="pass" type={`${showPass === true ? 'text' : 'password'}`} value={passValue} onChange={handleInputPass} className="px-5 py-3 w-full rounded-md bg-[#F0EFFF] focus:outline-none  placeholder:text-[#A7A3FF]" placeholder="Password" />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-[50%] translate-y-[-50%] text-xl p-3 rounded-md cursor-pointer">{showPass === true ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                        </div>
                        {passError !== '' ? <p className="text-amber-400 text-sm mt-3">{passError}</p> : ''}
                        <Link onClick={handleForgotPass} className="text-[#B0B0B0] mt-3 block">Forgor password ?</Link>
                        <button type="submit" className="px-4 py-2 text-white rounded-md w-full mt-7 bg-primary">Login</button>
                        <p className="text-[#B5B5B5] text-center my-4">or continue with</p>
                        <div className="flex items-center justify-center gap-4">
                            <button type="button"><img className="w-8" src={google} alt='' /></button>
                            <button type="button"><img className="w-8" src={facebook} alt='' /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;