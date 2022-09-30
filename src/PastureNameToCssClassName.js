import masterData from "../json-data/pasture.json" assert { type: "json" };

function pastureNameToCssClassName(name) {
    const materialClassNames = {
        "素材(採取)": "material-pick",
        "素材(レア)": "material-rare",
        "耕作物資": "material-cultivation",
        "畜産": "material-farming"
    };
    const getClassName = (n) => {
        for (const v of Object.keys(materialClassNames)) {
            if (n.includes(v)) {
                return materialClassNames[v];
            }
        }
        return null;    
    };

    // そもそもの素材種類自体かを調べる
    const firstSelect = getClassName(name);
    if (firstSelect !== null) {
        return firstSelect;
    }

    // 素材から種類を引く
    for (const [className, materials] of Object.entries(masterData.class)) {
        for (const material of materials) {
            if (name.includes(material)) {
                return getClassName(className);
            }
        }
    }

    return "";
}

export default pastureNameToCssClassName;