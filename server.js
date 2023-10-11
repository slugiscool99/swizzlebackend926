//BEGIN SWIZZLE DEPENDENCIES
require('dotenv').config();
const { secrets } = require('swizzle-js');

const express = require('express');
const app = express();
const port = 3001;
const path = require('path');

const { 
  analyticsMiddleware,
  authRoutes,
  dbRoutes,
  internalRoutes,
  appleRoutes,
  storageRoutes,
  setupNotifications,
  setupPassport,
  connectDB
} = require('swizzle-js');

const passport = require('passport');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(analyticsMiddleware);
app.use(cors());

app.use(passport.initialize());
app.use('/swizzle/auth', authRoutes);
app.use('/swizzle/db', dbRoutes);
app.use('/swizzle/internal', internalRoutes);
app.use('/swizzle/storage', storageRoutes);
app.use('/swizzle/apple', appleRoutes);
//END SWIZZLE DEPENDENCIES


//BEGIN USER DEPENDENCIES

//_SWIZZLE_NEWREQUIREENTRYPOINT
const get_ = require("./user-dependencies/get-.js");

//END USER DEPENDENCIES


//BEGIN USER ROUTES

//_SWIZZLE_NEWENDPOINTENTRYPOINT
app.use('', get_);

//END USER ROUTES

//Swizzle routes
app.use(express.static(path.join(__dirname, 'user-hosting/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'user-hosting/build', 'index.html'));
});

(async function startServer() {
  try {
    await connectDB()

    setupPassport();

    try {
      setupNotifications()
    } catch(err) { }

    app.listen(port, () => {
      console.log(`Server running!`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
