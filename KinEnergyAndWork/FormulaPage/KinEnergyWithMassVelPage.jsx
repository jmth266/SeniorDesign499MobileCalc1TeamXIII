import { useState } from 'react';
import NumericField from "../../../../components/NumericField";
import Formula from "../../../../components/Formula";
import { round } from "../../../../utils/Conversions";

const fieldDescriptions = {
    mass: { description: "Mass of the object", placeholderText: "kilograms" },
    velocity: { description: "Velocity of the object", placeholderText: "fps"}
};

function KinEnergyWithMassVel() {

    const [fields, setFields] = useState({
        mass: null,
        velocity: null,
    });

    const [ke, setKE] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Kinetic Energy using Mass and Velocity"}
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
                    setKE((0.5 * fields.mass * fields.velocity));
                }}
            />
            {ke !== null && <p>Kinetic Energy: {round(ke)} ft-lbs</p>}
        </div>
    );
}

export default KinEnergyWithMassVel;