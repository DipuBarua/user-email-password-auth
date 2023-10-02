import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Login = () => {
    const [success, setSuccess] = useState('');
    const [registerError, setRegisterError] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        // reset error and success msg 
        setRegisterError('');
        setSuccess('');

        // console.log(typeof password);
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or more longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password should have at least 1 Upper Case character.");
            return;
        }

        // sign in or login using registered email, password. 
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccess('Successful Login.')
                }
                else {
                    alert('Verify your email');
                }
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }

    // send email to reset forget password. 
    const handleForgetPassword = e => {
        const forgetPasswordEmail = emailRef.current.value;
        if (!forgetPasswordEmail) {
            console.log('please provide the forget password email ');
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(forgetPasswordEmail)) {
            console.log('please write a valid email.');
            return;
        }

        sendPasswordResetEmail(auth, forgetPasswordEmail)
            .then(() => {
                alert('please check your email.');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPassword} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {
                                registerError && <p className=" text-red-700">{registerError}</p>
                            }
                            {
                                success && <p className=" text-green-600">{success}</p>
                            }

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>New to this website? Please <Link to={'/register'}>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;