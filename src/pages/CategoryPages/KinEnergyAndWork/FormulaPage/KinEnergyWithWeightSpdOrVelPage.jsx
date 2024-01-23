import { useState } from "react";
import ToggleField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import { round } from "../../../../utils/Conversions.js";
import NumericField from "../../../../components/NumericField.jsx";
import { getNumericFields } from "../../../../utils/FieldCreator.jsx";

const speedFieldDescription = {
    speed: { description: "Speed of the object:", placeholderText: "mph" },
    weight: { description: "Weight of the object:", placeholderText: "pounds" },
};

const velocityFieldDescription = {
    velocity: { description: "Velocity of the object:", placeholderText: "fps" },
    weight: { description: "Weight of the object:", placeholderText: "pounds" },
};

const toggleFieldDescriptions= {
    isSpeed: "Velocity (fps) / Speed (mph)",
};

function KinEnergyWithWeightSpdOrVel() {
    const [fields, setFields] = useState({
        speed: null,
        isSpeed: false,
        velocity: null,
    });

    const [ke, setKE] = useState(null);

    

    const handleValueChange = (fieldName, newValue) => {
        setFields((prevFields) => ({ ...prevFields, [fieldName]: newValue }));
    };


    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Kinetic Energy using Weight and Speed / Velocity"}
                toggleFields={Object.keys(toggleFieldDescriptions).map(
                    (fieldName) => (
                        <ToggleField
                            key={fieldName}
                            description={toggleFieldDescriptions[fieldName]}
                            onChange={(newValue) =>
                                setFields({ ...fields, [fieldName]: newValue })
                            }
                        />
                    ),
                )}
                numericFields={
                    fields.isSpeed
                        ? getNumericFields(
                              fields,
                              speedFieldDescription,
                              handleValueChange,
                          )
                        : getNumericFields(
                              fields,
                              velocityFieldDescription,
                              handleValueChange,
                          )
                }
                onCalculate={() => {
                    if( fields.isSpeed === true){
                        setKE((fields.weight * ((fields.speed)**2))/64.4);
                    }
                    else{
                        setKE((fields.weight * ((fields.velocity)**2))/30);
                    }

                    
                }}
            />
            {ke !== null && (
                <p>
                    Kinetic Energy: {round(ke)} ft-lbs
                </p>
            )}
        </div>
    );
}

export default KinEnergyWithWeightSpdOrVel;
