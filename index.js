// INCLUDING LIBRARIES AND NODE MODULES
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const firebase = require("firebase-admin");
const serviceAccount = require("./real-time-pwr-plant-monitoring-firebase-adminsdk-28hzl-35b2f8cfca.json");
const productionRouter = require("./routes/production");
const analyticsRouter = require("./routes/analytics");

// DEFINING THE PORT
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// DECLARING GLOBAL VARIABLES
let data,
  data_keys,
  last_data_key,
  reference,
  reading_ref,
  reading,
  time,
  localDate,
  last_data,
  timee;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/production", productionRouter);
app.use("/analytics", analyticsRouter);
 
// INITIALIZING THE DATABASE 
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL:
    "https://real-time-pwr-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
});
// CREATING AN INSTANCE OF FIREBASE.DATABASE.REFERENCE
var db = firebase.database();

// MOUNTING THE MIDDLEWARE FUNCTION FOR db-data ROUTE
app.use("/db-data", (req, res) => {
  // Accessing data on database
  db.ref("/data").once("value", (snapshot) => {
    data = snapshot.val();
    data_keys = Object.keys(data);
    // RETRIEVING THE KEY FOR THE LAST ADDED OBJECT TO RTDB
    last_data_key = data_keys.slice(-1)[0];
    // ADDING IT TO THE REFERENCE LINK  
    reference = "/data/" + last_data_key;
    reading_ref = db.ref(reference);
    // READING THE "reading" OBJECT
    reading_ref.on("value", (snapshot) => {
      reading = snapshot.val();
      // CONVERTING THE TIME KEY TO A DATE DD/MM/YY, HOURS:MINUTES:SECONDS 
      time = new Date(last_data_key * 1000);
      // GETTING THE TIME HOURS:MINUTES:SECONDS FOR THE PLOTS
      timee =
        time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
      localDate = time.toLocaleString();
      // STORING EVERYTHING IN AN OBJECT
      last_data = {
        date: localDate,
        time: timee,
        reading: reading,
      };
      // SENDING IT
      res.json(last_data);
    });
  });
});


// CREATING OUR FUNCTION FOR THE GET REQUEST THAT RENDERS "index.ejs" AT "http://localhost:5000/"
app.get("/", (req, res) => {
  res.render("index");
});


// STARTING THE SERVER
server.listen(PORT, console.log("listening on port 5000"));
