const express = require('express');
const router = express.Router();

const { optionalAuthentication, requiredAuthentication } = require('swizzle-js');

router.get('/hi', optionalAuthentication, async (request, response) => {
    //Your code goes here
    //for loop
    
    return response.json({ message: "It works!" });
});

module.exports = router;