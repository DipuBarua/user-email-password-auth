
const Register = () => {
    const handleRegisterForm = e => {
        e.preventDefault();
        console.log('register form submited');

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

    }
    return (
        <div>
            <div className=" border border-black bg-blue-300 w-1/2 mx-auto text-center mt-10">
                <h2 className=" text-3xl bg-blue-700 mb-2 p-5">please Register</h2>
                <form onSubmit={handleRegisterForm}>
                    <input className=" mb-4 w-1/2 p-2" type="email" name="email" id="" placeholder="Email" />
                    <br />
                    <input className=" mb-4 w-1/2 p-2" type="password" name="password" id="" placeholder="Password" />
                    <br />
                    <input className=" btn btn-secondary mb-4 w-1/2" type="submit" value="Register" />
                </form>
            </div>
        </div>
    );
};

export default Register;