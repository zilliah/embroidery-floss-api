const fs = require("fs");
const express = require("express");
const cors = require("cors");
const PORT = 8000;

//get the floss list data
let stringList
try {
    stringList = fs.readFileSync("flossList.json", "utf8");

} catch (err) {
    console.error(console.error());
}

//put it into JSON
stringList = JSON.parse(stringList);
console.log(stringList["3866"]);

const app = express();
app.use(cors());

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

//TODO API get


app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT || PORT}`);
});