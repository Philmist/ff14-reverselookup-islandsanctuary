import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import masterData from '../json-data/pasture.json';
import './App.css';
import PastureNameToCssClassName from './PastureNameToCssClassName.js'

function Pasture({ pasture, checked, onChange }) {
  return (
    <label className="pasture-label">
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
  const group = Array.from(Object.entries(masterData["class"]).map(v => v[0])).sort().reverse().filter(v => !v.includes('種'));
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
        const adjustLength = Math.floor(masterData.class[g].length / 5) + 1;
        const pastureRows = new Array(adjustLength);
        for (let i = 0; i < pastureRows.length; i++) {
          pastureRows[i] = masterData.class[g].slice(i * 5, i * 5 + 5);
        }
        const materialCssClass = PastureNameToCssClassName(g);
        return (
        <fieldset key={g}>
          <div className={`container pasture-class ${materialCssClass}`}>
          <legend className="row">
          <div className="column column-50 pasture-class-name">{g}</div>
          </legend>
          <div className="pasture-class-body">
          {
            pastureRows.map((row, index) => {
              return (
                <div className="row" key={index}>
                  {
                    row.map((p) => {
                    return (
                      <div className="column column-20" key={p}>
                      <Pasture key={p} pasture={p} checked={checkedPastureDict[p]} onChange={onChangePastureCheckbox(p)} />
                      </div>
                    );
                    })
                  }
                </div>
              );
            })
          }
          </div>
          </div>
        </fieldset>
        );
      })}
    </form>
  );
}

export default checkboxPastureClass;
