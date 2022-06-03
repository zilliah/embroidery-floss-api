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

//search
//TODO is currently exact match only
//allow for substrings and partial matches for some search types
function searchFlossList(property, inputValue) {
    let found;
    for (let colour in flossList) {
        if (flossList[colour][property] === inputValue) {
            found = flossList[colour];
            break;
        }
    }
    if (!found) found = flossList.noFlossMatch;
    return found;
}


app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

//get full list of floss colours
app.get("/api/full", (request, response) => {
    console.log("Sending full floss list");
    response.json(flossList);
});

//get a floss by DMC number
app.get("/api/number/:number", (request, response) => {
    let inputDMCNumber = request.params.number.toLowerCase();
    console.log(`Searching by number, for: ${inputDMCNumber}`);
    if (flossList[inputDMCNumber]) response.json(flossList[inputDMCNumber]);
    else response.json(flossList.noFlossMatch)
});

//get a floss by hex code
app.get("/api/hex/:hex", (request, response) => {
    let inputHex = request.params.hex.toLowerCase();
    console.log(`Searching by hex, for: ${inputHex}`);
    //exact match
    let found = searchFlossList("hex", inputHex);
    response.json(found);

    //TODO "no exact match found, closest options are:"
});

//get a floss by name
app.get("/api/name/:name", (request, response) => {
    let inputName = request.params.name.toLowerCase();
    console.log(`Searching by name, for: ${inputName}`);
    
    let found = searchFlossList("searchName", inputName);
    response.json(found);


});

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT || PORT}`);
});