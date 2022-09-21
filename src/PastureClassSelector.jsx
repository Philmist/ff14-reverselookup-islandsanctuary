import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import masterData from '../json-data/pasture.json' assert { type: 'json' };

function Pasture({ pasture, checked, onChange }) {
  return (
    <label>
      <input type="checkbox" id={pasture} checked={checked} onChange={onChange} />
      {pasture}
    </label>
  );
}

Pasture.propTypes = {
  pasture: PropTypes.string,
  checked: PropTypes.bool
};


function checkboxPastureClass ({ checkedPastureDict, setCheckedPastureDict }) {
  const group = Array.from(Object.entries(masterData["class"]).map(v => v[0])).sort().reverse();
  const onChangePastureCheckbox = (pasture) => {
    const onChange = (_) => {
      const nextCheckbox = !checkedPastureDict[pasture];
      const nextState = {
        ...checkedPastureDict,
        [pasture]: nextCheckbox
      };
      setCheckedPastureDict(nextState);
    };
    return onChange;
  };
  return (
    <form>
      { group.map(g => {
        return (
        <fieldset key={g}>
          <legend>{g}</legend>
          {
            masterData["class"][g].map(p => 
              { return (<Pasture key={p} pasture={p} checked={checkedPastureDict[p]} onChange={onChangePastureCheckbox(p)} />); }
            )
          }
        </fieldset>
        );
      })}
    </form>
  );
}

export default checkboxPastureClass;
