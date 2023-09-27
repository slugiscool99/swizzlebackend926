//BEGIN SWIZZLE DEPENDENCIES
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'user-hosting')));

const secrets = require('./swizzle-dependencies/swizzle-secrets');
secrets.initialize();

const passport = require('passport');
const {setupPassport} = require('./swizzle-dependencies/swizzle-passport');
const { connectDB, getDb, UID } = require('./swizzle-dependencies/swizzle-db-connection');
const authRoutes = require('./swizzle-dependencies/swizzle-auth');
const dbDriverRoutes = require('./swizzle-dependencies/swizzle-db-driver');
const { storageRoutes } = require('./swizzle-dependencies/swizzle-storage');
const internalRoutes = require('./swizzle-dependencies/swizzle-internal');
const requestSaver = require('./swizzle-dependencies/swizzle-monitoring');
const { setupNotifications } = require('./swizzle-dependencies/swizzle-notifications');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestSaver);
app.use(cors());

app.use(passport.initialize());
app.use('/swizzle/auth', authRoutes);
app.use('/swizzle/db', dbDriverRoutes);
app.use('/swizzle/internal', internalRoutes);
app.use('/swizzle/storage', storageRoutes);
//END SWIZZLE DEPENDENCIES

//BEGIN USER DEPENDENCIES

//_SWIZZLE_NEWREQUIREENTRYPOINT

//END USER DEPENDENCIES

//BEGIN USER ROUTES

//_SWIZZLE_NEWENDPOINTENTRYPOINT

//END USER ROUTES

//Swizzle routes
(async function startServer() {
  try {
    //Required: Passport auth
    setupPassport();

    //Required: DB
    await connectDB();   

    // Optional: Notifications
    try {
      setupNotifications()
    } catch(err) {
      console.warn(`Failed to setup notifications. Continuing without them.`);
    }

    app.listen(port, () => {
      console.log(`Server running!`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
