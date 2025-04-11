import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles.css';
import background from '../assets/login-background.png';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [phone,setPhone] = useState();
    const [gender,setGender] = useState();
    const [securityquestion,setSecurityquestion] = useState();
    const [securityanswer,setSecurityanswer] = useState();
    const passwordcontain = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const navigate = useNavigate();
    // const backgroundStyle = {
    //     backgroundImage: `url(${background})`,
    //     backgroundSize: 'cover', // Scales the image to cover the entire container
    //     backgroundPosition: 'center', // Centers the image
    //     backgroundRepeat: 'no-repeat', // Prevents repeating
    //     height: '100vh', // Full viewport height
    //     width: '100%', // Full viewport width
    //   };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!passwordcontain.test(password)) {
            alert(
                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
            );
            return;
        }
        
      
        if (password !== confirmpassword) {
            alert("Confirm password doesn't match.");
            return;
        }
        
        axios.post( 'http://localhost:3000/register', {name, email, password,confirmpassword,phone,gender,securityquestion,securityanswer})
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else if (result.data === "Mobile number is already registered.") {
                alert("Mobile number already registered! Use another number.");
            }
          
            
           
            else{
                alert("Registered successfully! Please Login to proceed.")
                navigate('/login');
            }
            
        })
        .catch(err => console.log(err));
    }


    return (
        <body >
        <div style={{backgroundImage:`url(${background})`, backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
            
            <div className="d-flex justify-content-center align-items-center text-center vh-100 "   >
                <div className="p-3 rounded "  style={{width : '40%',maxHeight:'80vh',overflowY:'auto',scrollbarWidth:'none'}}>
                    <h2 className='mb-3 fs-1 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
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
                        <div className='mb-3 text-start'>
                            <label htmlFor='exampleInputConformPassword1' className='from-label'>
                                <strong>ConfirmPassword</strong>
                            </label>
                            <input
                               type='password'
                               placeholder='Enter confirm password'
                               className='form-control'
                               id='exampleInputConfirmPassword1'
                               onChange={(event) => setConfirmpassword(event.target.value)}
                               required
                            
                            >
                            </input>

                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='examplePhone' className='form-label'>
                                <strong>Mobile Number</strong>
                            </label>
                            <input
                                type='number'
                                placeholder='Enter Mobile Number'
                                className='form-control'
                                id='examplePhone'
                                onChange={(event) => setPhone(event.target.value)}
                                onInput={(e) => e.target.value = e.target.value.slice(0, 10)}

                                required
                                >
                            </input>

                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='exampleGender' className='form-label'>
                                <strong>Gender</strong>

                            </label>
                            <select 
                                type='text'
                                className='form-control'
                                id='exampleGender'
                                onChange={(event) => setGender(event.target.value)}
                                required
                            
                            >    
                                <option value={""}>--Select--</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}> Female</option>
                                <option value={"Transgender"}> Transgender</option>
                            </select>

                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='exampleQuestion' className='form-label'>
                                <strong>Security Question</strong>
                            </label>
                            <select
                                type="text"
                                className='form-control'
                                id='exampleQuestion'
                                onChange={(event) => setSecurityquestion(event.target.value)}
                                required
                            >
                                <option value={""}>--Select--</option>
                                <option value={"petname"}>What Is Your Pet Name?</option>
                                <option value={"schoolname"}>What Is your First School Name?</option>
                                <option value={"favoritecar"}>What Is Your Favorite Car?</option>
                                <option value={"hobby"}>What Is Your Hobby?</option>
                               

                            </select>

                        </div>
                        <div className='mb-3 text-start'>
                            <label htmlFor='exampleSecurityAnswer' className='form-label'>
                                <strong>Security Answer</strong>
                                
                            </label>
                            <input

                               type='text'
                               placeholder='Enter Security Answer'
                               className='form-control'
                               id='exampleSecurityAnswer'
                               onChange={(event) => setSecurityanswer(event.target.value)}
                               required

                            
                            
                            >
                            </input>
                        </div>
                        <button type="submit" class="btn text-light shadow-lg bg-light">Register</button>
                    </form>

                    <p className='container '>Already have an account ?</p>
                    <Link to='/login' className="btn btn-danger w-25 shadow-lg  mb-5  rounded">Login</Link>
                </div>
            </div>
        </div>
        </body>
    )
}

export default Register

