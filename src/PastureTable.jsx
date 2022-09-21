import react, { useState } from 'react';
import masterData from '../json-data/pasture.json' assert { type: 'json' };

function PastureTable({ checkedPasture }) {
  const [ productList, setProductList ] = useState(Object.entries(masterData.master).map(i => i[0]).sort().reverse());
}
