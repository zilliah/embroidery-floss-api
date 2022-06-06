# Embroidery Floss API

An API for DMC embroidery floss. Currently includes the "basic" DMC colours. Search by name, DMC number, or hex code. CORS is enabled. 

See it at https://embroidery-floss-api.herokuapp.com/

# Usage

The base url is `https://embroidery-floss-api.herokuapp.com/api/`

## All flosses

To get a list of all flosses, use `https://embroidery-floss-api.herokuapp.com/api/full`

## Search by DMC number

To get information for a specific DMC number, use `/number/<number>`

Eg: `https://embroidery-floss-api.herokuapp.com/api/number/912`

## Search by name

To search for a specific name, use `/name/<name>`

Eg, `https://embroidery-floss-api.herokuapp.com/api/name/red`

Exact matches are prioritised: if an exact match is found, it will return only the exact match. 

If an exact match is **not** found, it will return any colours with names that include the search term. 

If you want all the matching flosses even when an exact match is found, add a query parameter: `/name/<name>?searchtype=all`

Eg: `https://embroidery-floss-api.herokuapp.com/api/name/red?searchtype=all`

## Search by hex code

Currently, will only work for exact hex code matches. Hex codes should **not** include the `#`. 

To search, use `/api/hex/<hex code>`

Eg, `https://embroidery-floss-api.herokuapp.com/api/hex/393068`

# Improvements 

1. Expanded floss list: add data for non-"basic" DMC colours, Anchor, Kreinik, etc. Contributions very welcome - [this issue](https://github.com/zilliah/embroidery-floss-api/issues/1) has more details. You don't need to be a technical person to help with this! 
2. Hex colour matching: search by hex colour and find closest matches. Hex colour search currently only returns exact matches.
3. Colour family search: return all floss within a colour family. Searching by colour will only return flosses with the searched colour in the name - eg searching "purple" won't return anything, since the purple colours are all called things like "lavender". Will require some decisions about which categories to include, how to handle overlapping colours (eg is "teal" blue, green, or it's own category?), and probably an amount of manual data entry. 
