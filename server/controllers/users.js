//sign in and sign up implementation -- backend
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

//sign in
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //finding an existing user by this email
        const existingUser = await User.findOne({ email });

        //if user doesn't exists
        if(!existingUser)
        {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        //if user exists,, check if password is correct -- comparing the hashed version
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        //if password incorrect
        if(!isPasswordCorrect)
        {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        //if existing user and password correct

        //creating token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test' ,{ expiresIn: "1h" } );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

//sign up
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        
        //finding an existing user by this email
        const existingUser = await User.findOne({ email });

        //if user exists
        if(existingUser)
        {
            return res.status(400).json({ message: "User already exists." });
        }

        //if password doesn't matches repeat password
        if(password !== confirmPassword)
        {
            return res.status(400).json({ message: "Passwords don't match." });
        }

        //if user doesn't exists and passwords are matching

        //hash the password with difficulty level 12
        const hashedPassword = await bcrypt.hash(password, 12);

        //create the user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        
        //create the token
        const token = jwt.sign({ email: result.email, id: result._id }, 'test' ,{ expiresIn: "1h" } );
        
        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};