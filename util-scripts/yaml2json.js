/* eslint no-restricted-syntax: off */
/* eslint no-console: off */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

try {
  const pastureFilename = path.join(__dirname, '../pasture-yaml/pastures.yaml');
  const body = yaml.load(fs.readFileSync(pastureFilename));
  const pastureClassFilename = path.join(__dirname, '../pasture-yaml/material.yaml');
  const pastureClass = yaml.load(fs.readFileSync(pastureClassFilename));
  const granaryFileName = path.join(__dirname, '../pasture-yaml/granary.yaml');
  const granary = yaml.load(fs.readFileSync(granaryFileName));
  const hour = new Map();
  const value = new Map();
  const treat = new Map();
  const material = new Map();

  for (const [k, v] of Object.entries(body)) {
    if (!hour.has(v.hour)) {
      hour.set(v.hour, []);
    }
    const hourData = hour.get(v.hour);
    hourData.push(k);
    hour.set(v.hour, hourData);

    if (!value.has(v.value)) {
      value.set(v.value, []);
    }
    const valueData = value.get(v.value);
    valueData.push(k);
    value.set(v.value, valueData);

    v.treat.forEach((e) => {
      if (!treat.has(e)) {
        treat.set(e, []);
      }
      const treatData = treat.get(e);
      treatData.push(k);
      treat.set(e, treatData);
    });

    for (const [materialName, pieces] of Object.entries(v.material)) {
      if (!material.has(materialName)) {
        material.set(materialName, new Map());
      }
      const materialData = material.get(materialName);
      materialData.set(k, pieces);
      material.set(materialName, materialData);
    }
  }

  const pClass = new Map();
  for (const [k, v] of Object.entries(pastureClass)) {
    if (!pClass.has(k)) {
      pClass.set(k, new Set());
    }
    v.forEach((i) => {
      const p = pClass.get(k);
      p.add(i);
      pClass.set(k, p);
    });
  }

  const granaryMap = new Map();
  for (const [k, v] of Object.entries(granary)) {
    granaryMap.set(k, new Set(v));
  }

  // @seealso https://qiita.com/bananacoffee/items/1c8d42cf2bdf24fd5ea7
  const jsonReplacer = (k, v) => {
    if (v instanceof Map) {
      return Object.fromEntries(v);
    }
    if (v instanceof Set) {
      return Array.from(v);
    }
    return v;
  };

  const hourSet = Array.from(hour.keys());
  const valueSet = Array.from(value.keys());
  const treatSet = Array.from(treat.keys());
  const materialSet = Array.from(material.keys());
  const classSet = Array.from(pClass.keys());
  const fullData = {
    /*
    'hour-set': hourSet.sort((f, s) => f - s),
    'value-set': valueSet.sort((f, s) => f - s),
    'treat-set': treatSet.sort(),
    'material-set': materialSet.sort(),
    'class-set': classSet.sort().reverse(),
    */
    class: pClass,
    granary: granaryMap,
    /*
    hour,
    value,
    treat,
    material,
    */
    master: body,
  };
  const jsonString = JSON.stringify(fullData, jsonReplacer, 2);
  // console.log(JSON.parse(jsonString));

  const jsonPath = path.join(__dirname, '../json-data/pasture.json');
  console.log(jsonPath);
  fs.writeFileSync(jsonPath, jsonString);
} catch (err) {
  console.log(err);
}
