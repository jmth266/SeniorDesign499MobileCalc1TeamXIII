import { useState } from 'react';
import NumericField from "../../../../components/NumericField";
import Formula from "../../../../components/Formula";
import { round } from "../../../../utils/Conversions";

const fieldDescriptions = {
    weight: { description: "Weight of the object:", placeholderText: "pounds" },
    distance: { description: "Distance displaced:", placeholderText: "feet" },
    frictionCoefficient: { description: "Friction Coefficient", placeholderText: "Enter Friction coefficient", fieldMax: 1 }
};

function WorkWithWeightAndDistPage() {

    const [fields, setFields] = useState({
        weight: null, 
        distance: null,
        frictionCoefficient: null,
    });

    const [work, setWork] = useState(null);
  

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Work with friction coefficient"}
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
                    setWork(fields.distance * fields.weight * fields.frictionCoefficient);
                }}
            />
            {work !== null && <p>Work: {round(work)} ft-lbs</p>}
        </div>
    );
}

export default WorkWithWeightAndDistPage;
