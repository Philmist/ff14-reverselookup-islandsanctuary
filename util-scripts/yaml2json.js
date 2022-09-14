const fs = require('fs');
const path = require('path');
const util = require('util');
const yaml = require('js-yaml');

try {
    const pasture_filename = path.join(__dirname, '../pasture-yaml/pastures.yaml');
    const body = yaml.load(fs.readFileSync(pasture_filename));
    let hour = new Map();
    let value = new Map();
    let treat = new Map();
    let material = new Map();
    for (const [k, v] of Object.entries(body)) {
        if (!hour.has(v["hour"])) {
            hour.set(v["hour"], []);
        }
        const hourData = hour.get(v["hour"]);
        hourData.push(k);
        hour.set(v["hour"], hourData);

        if (!value.has(v["value"])) {
            value.set(v["value"], []);
        }
        const valueData = value.get(v["value"]);
        valueData.push(k);
        value.set(v["value"], valueData);

        v["treat"].forEach(e => {
            if (!treat.has(e)) {
                treat.set(e, new Array());
            }
            const treatData = treat.get(e);
            treatData.push(k);
            treat.set(e, treatData);
        });

        for (const [materialName, pieces] of Object.entries(v["material"])) {
            if (!material.has(materialName)) {
                material.set(materialName, new Map());
            }
            const materialData = material.get(materialName);
            materialData.set(k, pieces);
            material.set(materialName, materialData);
        }
    }

    // @seealso https://qiita.com/bananacoffee/items/1c8d42cf2bdf24fd5ea7
    const jsonReplacer = (k, v) => {
        if (v instanceof Map) {
            return Object.fromEntries(v);
        } else {
            return v;
        }
    };

    const fullData = {
        "hour": hour,
        "value": value,
        "treat": treat,
        "material": material,
        "master": body
    };
    const jsonString = JSON.stringify(fullData, jsonReplacer, 2);
    // console.log(JSON.parse(jsonString));

    const jsonPath = path.join(__dirname, "../json-data/pasture.json");
    console.log(jsonPath);
    fs.writeFileSync(jsonPath, jsonString);
} catch (err) {
    console.log(err);
}