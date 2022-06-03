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
        dmc[line[0]] = {
            name: line[1].trim(),
            hex: line[2].trim()
        }
        delete dmc.DMC_COLOR;
    }
    console.log(dmc);

    //write to flossList.json
    fs.writeFile("flossList.json", JSON.stringify(dmc), err => {
        if (err) console.error(err);
    })
});
