const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Register route
app.post('/register', (req, res) => {
    const { email,password,confirmpassword,phone} = req.body;

    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json("Invalid mobile number. Please provide a 10-digit number.");
    }

   
    if (password !== confirmpassword) {
        return res.status(400).json("Password and confirm password do not match.");
    }
    
    


    FormDataModel.findOne({ email })
        .then(user => {
            if (user) {
                return res.json("Already registered");
            } 
            else{
                return FormDataModel.create(req.body);
                }
           
        
            
            
           
        })
        .then(collection => res.json(collection))
        .catch(err => res.status(500).json(err)); // Send a 500 status code for errors

    

 


});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    FormDataModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return res.json("Success");
                } else {
                    return res.json("Wrong password");
                }
            } 
            return res.json("No records found!");
        })
        .catch(err => res.status(500).json(err)); // Send a 500 status code for errors
});

// Start server
app.listen(3000, () => {
    console.log("Server listening on http://127.0.0.1:3000");
});
