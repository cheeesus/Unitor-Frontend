/*const express = require("express");
const router = express.Router();
let data_live;
// CREATING THE ROUTE AT ANY GET REQUEST ON "http://localhost:5000/temperature"
router.get("/temperature", (req, res) => {
  function readData() {
    db.ref("/data_live").once("value", (snapshot) => {
      data_live = snapshot.val();
    });
    console.log(data_live);
    res.sendJSON(data_live);
  }
  setInterval(readData, 10000);
});
module.exports = router;*/
