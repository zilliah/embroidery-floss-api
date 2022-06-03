const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
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
flossList.noFlossMatch = {
    name: "No floss of that colour found",
    number: 0,
    hex: "none"
}


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

//get full list of floss colours
app.get("/api/full", (request, response) => {
    console.log("Sending full floss list");
    response.json(flossList);
});

//get a particular colour by DMC number
app.get("/api/number/:number", (request, response) => {
    let inputDMCNumber = request.params.number.toLowerCase();
    console.log(`Searching by number, for ${inputDMCNumber}`);
    if (flossList[inputDMCNumber]) response.json(flossList[inputDMCNumber]);
    else response.json(flossList.noFlossMatch)
});

//get a colour by hex code -> nearest match? or list of matches?
app.get("/api/hex/:hex", (request, response) => {
    let inputHex = request.params.hex.toLowerCase();
    console.log(`Search by hex, for ${inputHex}`);
    //exact match
    let found;
    for (let colour in flossList) {
        if (flossList[colour].hex === inputHex) {
            found = flossList[colour];
            break;
        }
    }
    if (!found) found = flossList.noFlossMatch;
    response.json(found);

    //"no exact match found, closest options are:"
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT || PORT}`);
});