import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [securityquestion, setSecurityquestion] = useState("");
    const [securityanswer, setSecurityanswer] = useState("");
    const [retrievedPassword, setRetrievedPassword] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send request to the backend
       axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, {
              email,
              securityquestion,
              securityanswer
             })

            .then(response => {
                // Display the retrieved password
                if (response.data.password) {
                    setRetrievedPassword(response.data.password);
                    alert("Password retrieved successfully!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Invalid details! Please try again.");
            });
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100">
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className="mb-3 text-primary">Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="exampleInputQuestion" className="form-label">
                                <strong>Security Question</strong>
                            </label>
                            <select
                                type="text"
                                className="form-control"
                                id="exampleQuestion"
                                onChange={(event) => setSecurityquestion(event.target.value)}
                                required
                            >
                                <option value={""}>--Select--</option>
                                <option value={"petname"}>What Is Your Pet Name?</option>
                                <option value={"schoolname"}>What Is Your First School Name?</option>
                                <option value={"favoritecar"}>What Is Your Favorite Car?</option>
                                <option value={"hobby"}>What Is Your Hobby?</option>
                            </select>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputAnswer" className="form-label">
                                <strong>Security Answer</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Security Answer"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(event) => setSecurityanswer(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Retrieve Password
                        </button>
                        
                    </form>
                    <div>
                    <Link to='/login' className="btn btn-primary m-3">Login</Link>
                    </div>
                    

                    {retrievedPassword && (
                        <div className="alert alert-success mt-3">
                            <strong>Your Password: </strong> {retrievedPassword}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;
