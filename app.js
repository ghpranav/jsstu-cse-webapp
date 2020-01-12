var express = require("express")
    , app = express()
    , cors = require('cors')
    , mongoose = require("mongoose")
    , User = require("./models/user")
    , bodyParser = require("body-parser");

require('dotenv').config();

const path = require("path");
mongoose.connect(process.env.DB_CONN);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "client", "build")));

const jwt = require("jsonwebtoken");

//passport stuff
const passport = require("passport");
const jwtStrategry = require("./strategies/jwt")
passport.use(jwtStrategry);


const user = require('./routes/user');
const publication = require('./routes/publication');
const research = require('./routes/research');
const award = require('./routes/awards');
const trainingConducted = require('./routes/training');
const trainingAttended = require('./routes/trainingAttended');
const subject = require('./routes/subject');
const securedRoutes = require('./routes/securedRoutes');

app.use('/', user);
// app.use('/publication' ,passport.authenticate('jwt', {session: false}), publication);
app.use('/publication', publication);
app.use('/award', award);
app.use('/research', research);
app.use('/training/conducted', trainingConducted);
app.use('/training/attended', trainingAttended);
app.use('/subject', subject);
app.use('/', passport.authenticate('jwt', { session: false }), securedRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, process.env.IP, function () {
    console.log(`app server has started on ${port}`);
});