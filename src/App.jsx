import React, { useState } from 'react';
import './App.css';
import PastureClassSelector from './PastureClassSelector.jsx';
import PastureTable from './PastureTable.jsx';
import masterData from '../json-data/pasture.json' assert { type: 'json' };

function App() {
  const pastures = Array.from(Object.entries(masterData["class"]).reduce((prev, next) => [...prev, ...next[1]], []));
  const [checkedPastureDict, setCheckedPastureDict] = useState(pastures.reduce((prev, next) => ({...prev, [next]: false}), {}));

  const deselectCheckboxes = () => {
    Object.keys(checkedPastureDict).forEach(k => {
      setCheckedPastureDict(prev => ({
        ...prev,
        [k]: false
      }));
    });
  };

  return (
    <div className="App">
      <PastureClassSelector checkedPastureDict={checkedPastureDict} setCheckedPastureDict={setCheckedPastureDict} />
      <div className="container">
        <button type="button" className="button button-outline" onClick={deselectCheckboxes}>リセット</button>
      </div>
      <PastureTable checkedPasture={ Object.entries(checkedPastureDict).filter((ary) => { 
        return (ary[1] === true); 
      }).map((ary) => {
        return ary[0];
      })} />
    </div>
  );
}

export default App;
