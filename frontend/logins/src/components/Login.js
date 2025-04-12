import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';
import particlesJS from 'particles.js';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    useEffect(() => {
    particlesJS.load('particles-js', '/particles.json', function () {
        console.log('particles.js config loaded');
    });
}, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('https://your-backend.vercel.app/login', { email, password }, { withCredentials: true })

        .then(result => {
            console.log(result);
           if (result.data === "Success") {
    localStorage.setItem("isLoggedIn", true);
    alert('Login successful!');
    navigate('/home');
}

            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" >
                <div className=" p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" >Login</button>
                    </form>
                  
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-danger w-25 shadow-lg  mb-5  rounded">Register</Link>
                    <div>
                        <Link to='/Forgotpassword' className="btn btn-primary w-25 shadow-lg  mb-5  rounded" >Forgot Password</Link>
                    </div>

                    <div>
                    <a href='https://mail.google.com/'><img src={require('./search.png')} alt='search' style={{height:'30px',width:'30px',margin:'30px 0px 0px 0px'}} ></img></a>
                    <a href='https://mail.google.com/mail/u/0/#inbox'><img src={require('./yahoo.png')} alt='search' style={{height:'30px',width:'30px',margin:'30px 0px 0px 40px'}} ></img></a>
                    </div>
                </div>
            </div>
              
<canvas class=
"background"
></canvas>
  
<script src=
"path/to/particles.min.js"
></script>

        </div>
    )
}
export default Login




