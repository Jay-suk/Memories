/*
    middleware to verify and decode the token included in the request 
    headers and extract the user ID from it
*/
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        //extracting token from request headers
        const token = req.headers.authorization.split(" ")[1];

        //token length < 500 then it is manual login else Google Oauth login
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            //verifying the authenticity of the token and if the verificiation is successfull,,
            //it decodes the token and returns it
            decodedData = jwt.verify(token, 'test');

            //extracting the userId from the decoded data
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        //now calling the callback function to get executed
        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;