import { useState } from "react";
import Formula from "../../../../components/Formula.jsx";
import { round } from "../../../../utils/Conversions.js";
import NumericField from "../../../../components/NumericField.jsx";


const fieldDescriptions = {
    ke: {
        description: "Kinetic energy of the object",
        placeholderText: "ft-lbs"
    },
    weight: {
        description: "Weight of the object",
        placeholderText: "lbs",
    },
};

function MphAndFpsDueToKE() {
    
    const [fields, setFields] = useState({
        ke: null,
        weight: null,
        
    });
    
    const [mph, setMph] = useState(null);
    const [fps, setFps] = useState(null);


    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Velocity (mph / fps) due to Kinetic Energy"}
                numericFields = {
                    Object.keys(fieldDescriptions).map(fieldName => (
                        <NumericField
                            key={fieldName}
                            description={fieldDescriptions[fieldName].description}
                            onChange={(newValue) => setFields({...fields, [fieldName]: newValue})}
                            placeholderText={fieldDescriptions[fieldName].placeholderText}
                            fieldMax={fieldDescriptions[fieldName].fieldMax}
                        />
                    ))
                }
                onCalculate={() => {
                    setMph(Math.sqrt((30 * fields.ke) / fields.weight));
                    setFps(Math.sqrt((64.4 * fields.ke) / fields.weight));
                }}
            />
            {mph !== null && <p> {round(mph)} mph</p>}
            {fps !== null && <p> {round(fps)} fps</p>}
        </div>
    );
}

export default MphAndFpsDueToKE;