import { Link } from "react-router-dom";
import facebook from '../../assets/images/Facebook.png'
import google from '../../assets/images/google.png'
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import Swal from "sweetalert2";

const Regester = () => {
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);
    const [error, setError] = useState('');

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

    const handleRegester = (e) => {
        e.preventDefault();
        setError('');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        const cpass = e.target.cpass.value;
        // console.log(email, pass, cpass);
        if (cpass !== pass) {
            setError('Password Not match. Please try again.');
            return;
        }
        if (pass.length < 6) {
            setError('Password length must up to 6 characters.');
            return;
        }
        if (!/[A-Z]/.test(pass)) {
            setError('Must contain at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(pass)) {
            setError('Must contain at least one lowercase letter.');
            return;
        }
        if (!/[1-9]/.test(pass)) {
            setError('Must include at least one numeric digit.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, pass)
            .then(result => {
                // console.log(result);
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully Regestered. '
                })
                e.target.name.value = '';
                e.target.email.value = '';
                e.target.pass.value = '';
                e.target.cpass.value = '';
                console.log(result);
                updateProfile(auth.currentUser, {
                    displayName: name
                })
            })
            .catch(error => {
                // console.log(error.message);
                const errorMsg = error.message
                setError(errorMsg);
            });
    }

    const handleGoogleLogin = () => {
        // console.log('google');
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                Toast.fire({
                    icon: 'success',
                    title: 'Login Successfully.'
                })
                console.log(result.user);
            })
            .catch(error => {
                const errorMsg = error.message;
                setError(errorMsg);
            })
    }

    const handleFacebookLogin = () => {
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                Toast.fire({
                    icon: 'success',
                    title: 'Login Successfully.'
                })
                console.log(result.user);
            })
            .catch(error => {
                const errorMsg = error.message;
                setError(errorMsg);
            })
            ;
    }

    error !== '' ? Toast.fire({
        icon: 'error',
        title: error
    }) : '';
    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
                <div className="hidden md:inline-block">
                    <h1 className="text-4xl font-medium">Regester to</h1>
                    <p className="text-xl mt-3 mb-10">User Authentication System.</p>
                    <p>If you already have an account </p>
                    <p>You can <Link to='/login' className="text-primary/80 font-medium">Login here !</Link></p>
                </div>

                <div className="flex justify-center">
                    <div className="w-[370px]">
                        <h4 className="text-2xl mb-5 font-medium">Regester Now</h4>
                        <form onSubmit={handleRegester}>
                            <input required name="name" type="text" className="px-5 py-3 w-full rounded-md bg-[#F0EFFF] focus:outline-none placeholder:text-[#A7A3FF]" placeholder="Full Name" />
                            <input required name="email" type="email" className="px-5 py-3 mt-5 w-full rounded-md bg-[#F0EFFF] focus:outline-none placeholder:text-[#A7A3FF]" placeholder="Enter email or user name" />
                            <div className="relative mt-5">
                                <input required name="pass" type={`${showPass === true ? 'text' : 'password'}`} className="px-5 py-3 w-full rounded-md bg-[#F0EFFF] focus:outline-none  placeholder:text-[#A7A3FF]" placeholder="Password" />
                                <button type="button" onClick={() => {
                                    setShowPass(!showPass);
                                    setError('');
                                }} className="absolute right-4 top-[50%] translate-y-[-50%] text-xl p-3 rounded-md cursor-pointer">{showPass === true ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                            </div>

                            <div className="relative mt-5">
                                <input required name="cpass" type={`${showCPass === true ? 'text' : 'password'}`} className="px-5 py-3 w-full rounded-md bg-[#F0EFFF] focus:outline-none  placeholder:text-[#A7A3FF]" placeholder="Confirm Password" />
                                <button type="button" onClick={() => {
                                    setShowCPass(!showCPass);
                                    setError('');
                                }} className="absolute right-4 top-[50%] translate-y-[-50%] text-xl p-3 rounded-md cursor-pointer">{showCPass === true ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                            </div>

                            <button type="submit" className="px-4 py-2 text-white rounded-md w-full mt-7 bg-primary">Register</button>

                            <p className="text-[#B5B5B5] text-center my-4">or continue with</p>
                            <div className="flex items-center justify-center gap-4">
                                <button onClick={handleGoogleLogin} type="button"><img className="w-8" src={google} alt='' /></button>
                                <button onClick={handleFacebookLogin} type="button"><img className="w-8" src={facebook} alt='' /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Regester;