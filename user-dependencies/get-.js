const express = require('express');
const router = express.Router();
const passport = require('passport');
//TODO: Add Swizzle NPM package!

router.get('/', async (request, response) => {
    //Your code goes here
    return response.json({ message: "It works!" });
});

module.exports = router;