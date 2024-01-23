import { useState } from 'react';
import NumericField from "../../../../components/NumericField";
import Formula from "../../../../components/Formula";
import { round } from "../../../../utils/Conversions";

const fieldDescriptions = {
    skidDistance: { description: "Skid (slide to stop) distance:", placeholderText: "feet" },
    frictionCoefficient: { description: "Friction Coefficient", placeholderText: "Enter Friction coefficient", fieldMax: 1 }
};

function SpeedAndVelocityConverter() {

    const [fields, setFields] = useState({
        skidDistance: null,
        frictionCoefficient: null,
    });

    const [speed, setSpeed] = useState(null);
    const [velocity, setVelocity] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Minimum Speed / Velocity Slide to Stop"}
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
                    setSpeed(Math.sqrt(30 * fields.skidDistance * fields.frictionCoefficient));
                    setVelocity(Math.sqrt(64.4 * fields.skidDistance * fields.frictionCoefficient));
                }}
            />
            {speed !== null && <p>Calculated Speed: {round(speed)} mph</p>}
            {velocity !== null && <p>Calculated Velocity: {round(velocity)} fps</p>}
        </div>
    );
}

export default SpeedAndVelocityConverter;
