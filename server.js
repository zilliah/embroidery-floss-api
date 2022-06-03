const fs = require("fs");
const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();

app.use(cors());

//get the floss list data
let stringList;
try {
    stringList = fs.readFileSync("flossList.json", "utf8");

} catch (err) {
    console.error(console.error());
}
//put it into JSON
let flossList = JSON.parse(stringList);
let noFlossMatch = {
    name: "No floss of that colour found",
    number: 0,
    hex: "#fffff"
}


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

//get full list of floss colours
app.get("/api/full", (request, response) => {
    response.json(flossList);
});

//get a particular colour by DMC number
app.get("/api/:number", (request, response) => {
    let inputDMCNumber = request.params.number.toLowerCase();
    console.log(inputDMCNumber);
    if (flossList[inputDMCNumber]) response.json(flossList[inputDMCNumber]);
    else response.json(noFlossMatch)
});
//working for numbers but not written colours like white


app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT || PORT}`);
});