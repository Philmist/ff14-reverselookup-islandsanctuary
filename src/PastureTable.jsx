import React, { useState, useEffect } from 'react';
import masterData from '../json-data/pasture.json';
import PastureNameToCssClassName from './PastureNameToCssClassName.js'

function PastureTable({ checkedPasture }) {
  const initialList = Object.entries(masterData.master).map(i => i[0]).sort().reverse();
  const [ productList, setProductList ] = useState(initialList);
  const [ checkedProduct, setCheckedProduct ] = useState({});

  const materialToClassDict = Object.values(masterData["class"]).flat().reduce((prev, current) => {
    return ({
      ...prev,
      [current]: PastureNameToCssClassName(current)
    });
  }, {});

  // 対象素材に応じて順番を変える
  useEffect(() => {
    // 対象になった素材があるかどうかを辞書に入れる
    const checkedProductDict = productList.reduce((prev, value) => {
      const targetProductMaterial = masterData.master[value].material;
      const hasMaterial = checkedPasture.map((p) => {
        if (Object.hasOwn(targetProductMaterial, p)) {
          // 対象になっていれば最低でも100、数に応じてさらにプラス
          // 最終的には素材種類が2つでそれぞれ1個と2個なら(101 + 102)
          return [(targetProductMaterial[p] * 1 + 100), [p]];
        } else {
          return [0, []];
        }
      });
      // 実際の計算結果を辞書にする
      // reduceは前のと後ろのをつなぎあわせる
      return ({
        ...prev,
        [value]: hasMaterial.reduce((p, n) => { return [p[0] + n[0], p[1].concat(n[1])]; }, [0, []])
      });
    }, {});

    // setStateするために以前の値を参照するアロー関数を作る
    const changeProductState = (prev) => {
      const targetProductList = [...prev];
      targetProductList.sort().reverse();
      // 対象数が大きいものを前にもっていきたい
      targetProductList.sort((f, s) => {
        return (checkedProductDict[s][0] - checkedProductDict[f][0]);
      });
      return targetProductList;
    };
    setProductList(changeProductState);

    // 対象となっている素材を製品から引けるようにする
    const changeCheckedProductState = (prev) => {
      const resultDict = initialList.reduce((p, n) => {
        return ({
          ...p,
          [n]: [...checkedProductDict[n][1]]
        });
      }, {});
      return {...prev, ...resultDict};
    };
    setCheckedProduct(changeCheckedProductState);

  }, [checkedPasture]);

  // 対象素材なら色塗ってそれ以外なら色塗らないリスト
  const MaterialComponent = ({ productName, checked }) => {
    return (
      <dd>
        <ul className="row">
        {
          Object.entries(masterData.master[productName].material).map(([k, v]) => {
            const containClassName = (Object.hasOwn(checked, productName) && checked[productName].includes(k)) ? materialToClassDict[k] : "";
            return (
              <li className={`column column-33 ${containClassName}`} key={k}>{k}: {v}</li>
            );
          })
        }
        </ul>
      </dd>
    );
  };

  return (
    <div>
      <dl>
        {
          productList.map((v) => {
            const treatStr = masterData.master[v].treat.sort().reduce((p, v) => {return (p + v + " ")}, "");
            const valueStr = new String(masterData.master[v].value);
            return (
              <div key={v} className="container product-entry">
                <dt className="row">
                  <div className="column column-40">{v}</div>
                  <div className="column">{`@${valueStr}: ${treatStr}`}</div>
                </dt>
                <MaterialComponent productName={v} checked={checkedProduct} />
              </div>
            );
          })
        }
      </dl>
    </div>
  );
}

export default PastureTable;
