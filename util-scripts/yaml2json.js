const fs = require('fs');
const path = require('path');
const util = require('util');
const yaml = require('js-yaml');

try {
    const pasture_filename = path.join(__dirname, '../pasture-yaml/pastures.yaml');
    const body = yaml.load(fs.readFileSync(pasture_filename));
    console.log(body);
} catch (err) {
    console.log(err);
}