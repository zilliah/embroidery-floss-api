const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const PORT = 8000;
const app = express();


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
    number: 0,
    readableName: "No floss of that colour found",
    searchName: "no_floss",
    hex: "none"
}

//exact match search
//returns single element array of match
function searchFlossList(property, inputValue) {
    for (let currFloss in flossList) {
        if (flossList[currFloss][property] === inputValue) {
            return [flossList[currFloss]];
            break;
        }
    }
}


//inexact match: allow for substrings and partial matches for some search types
//returns array of matches
function multipleSearchFlossList(property, inputValue) {
    const inputWords = inputValue.split("_");
    let matches = [];

    //search by name
    if (property === "searchName") {
        for (let currFloss in flossList) {
            for (let word of inputWords) {
                if (flossList[currFloss][property].search(word) >= 0) {
                    matches.push(flossList[currFloss]);
                }
            }
        }
    }
    if (matches.length < 1) return [flossList.noFlossMatch];
    else return matches;
}


app.use(cors());
app.use(express.static(__dirname + '/public/'));
app.get("/", (request, response) => {
    response.sendFile(__dirname + "index.html");
})

//get full list of floss colours
app.get("/api/full", (request, response) => {
    console.log("Sending full floss list");
    response.json(flossList);
});

//get a floss by DMC number (exact match only)
app.get("/api/number/:number", (request, response) => {
    let inputDMCNumber = request.params.number.toLowerCase().trim();
    console.log(`Searching by number, for: ${inputDMCNumber}`);
    if (flossList[inputDMCNumber]) response.json(flossList[inputDMCNumber]);
    else response.json(flossList.noFlossMatch)
});

//get a floss by hex code
app.get("/api/hex/:hex", (request, response) => {
    let inputHex = request.params.hex.toLowerCase().trim();
    console.log(`Searching by hex, for: ${inputHex}`);

    //validate hex input
    if (inputHex.length !== 6 || !/([a-f]|[0-9]){6}/.test(inputHex)) {
        response.json("Error: invalid hex input");
    }
    
    //exact match
    let found = searchFlossList("hex", inputHex);

    //TODO inexact match
    //how to handle finding "closest" colours with hex?
    //calclate differences in RGB channels? convert to HSL or RGB to make it easier?
    
    response.json(found);

});

//get a floss by name
//returns array  of either exact match or set of partial matches
//if searchtype=all query parameter is added, will return all matches even if there's an exact match
app.get("/api/name/:name", (request, response) => {
    let inputName = request.params.name.toLowerCase().trim().replace(/ +/g, "_");
    let searchType = request.query.searchtype;
    console.log(`Searching by name, for: ${inputName}, searchType ${searchType}`);
    
    let found;
    if (!searchType) found = searchFlossList("searchName", inputName);
    if (!found) found = multipleSearchFlossList("searchName", inputName);

    response.json(found);
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT || PORT}`);
});