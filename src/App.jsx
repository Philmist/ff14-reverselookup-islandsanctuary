import React, { useState } from 'react';
import './App.css';
import PastureClassSelector from './PastureClassSelector.jsx';
import masterData from '../json-data/pasture.json' assert { type: 'json' };

function MasterRow(props) {
  const { name } = props;
  const { product } = props;
  return (
    <li>
      <dl>
        <dt>{name}</dt>
        <dd>
          <dl>
            <div>
              <dt>所要時間</dt>
              <dd>{product.hour}</dd>
            </div>
            <div>
              <dt>出荷単位</dt>
              <dd>{product.unit}</dd>
            </div>
            <div>
              <dt>基礎価値</dt>
              <dd>{product.value}</dd>
            </div>
            <div>
              <dt>特性</dt>
              <dd>
                <ul>
                  {product.treat.map((e) => (
                    <li key={e}>
                      {e}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>必要素材</dt>
              <dd>
                <ul>
                  {Object.entries(product.material).map((e) => (
                    <li key={e[0]}>
                      {e[0]}
                      :
                      {' '}
                      {e[1]}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </dd>
      </dl>
    </li>
  );
}

function App() {
  const pastures = Array.from(Object.entries(masterData["class"]).reduce((prev, next) => [...prev, ...next[1]], []));
  const [checkedPastureDict, setCheckedPastureDict] = useState(pastures.reduce((prev, next) => ({...prev, [next]: false}), {}));
  return (
    <div className="App">
      <PastureClassSelector checkedPastureDict={checkedPastureDict} setCheckedPastureDict={setCheckedPastureDict} />
      <ul>
        {Object.entries(masterData.master).map((e) => (
          <MasterRow key={e[0]} name={e[0]} product={e[1]} />
        ))}
      </ul>
    </div>
  );
}

export default App;
