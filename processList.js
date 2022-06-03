const fs = require("fs");

let dmc = {};
let totalArr;

//parse the data from the CSV
fs.readFile("result.csv", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    //get it into an array
    totalArr = data.split("\r\n")
    totalArr.pop();

    //format it into an object
    for (let colour of totalArr) {
        let line = colour.split(",");
        dmc[line[0].toLowerCase()] = {
            number: line[0].toLowerCase().trim(), //this is redundant, but it's useful for managing search responses
            readableName: line[1].trim(),
            searchName: line[1].toLowerCase().trim().replace(/ /g, "_"),
            hex: line[2].trim().slice(1)
        }
    }
    delete dmc.dmc_color;
    console.log(dmc);

    //write to flossList.json
    fs.writeFile("flossList.json", JSON.stringify(dmc), err => {
        if (err) console.error(err);
    })
});
