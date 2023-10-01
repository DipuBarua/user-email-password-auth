import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterForm = e => {
        e.preventDefault();
        console.log('register form submited');

        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted);

        // reset error msg 
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
        else if(!accepted){
            setRegisterError("Please accept the terms and conditions!");
            return;
        }

        // create user 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Registration Successful.');
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            });


    }
    return (
        <div>
            <div className=" border border-black bg-blue-300 w-1/2 mx-auto text-center mt-10">
                <h2 className=" text-3xl bg-blue-700 mb-2 p-5 text-white">Please Register</h2>
                <form onSubmit={handleRegisterForm}>
                    <input className=" mb-4 w-1/2 p-2" type="email" name="email" id="" placeholder="Email" required />
                    <br />
                    <div className="relative">
                        <input
                            className=" mb-4 w-1/2 p-2"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id=""
                            placeholder="Password"
                            required />
                        <span className=" absolute right-1/4 top-1/4" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </span>
                    </div>
                    <div className=" mb-1">
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms" className=" ml-5">Please accept Our <a href="">Terms and Conditions</a> </label>
                    </div>
                    <br />
                    <input className=" btn btn-secondary mb-4 w-1/2" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className=" text-red-700">{registerError}</p>
                }
                {
                    success && <p className=" text-green-600">{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;