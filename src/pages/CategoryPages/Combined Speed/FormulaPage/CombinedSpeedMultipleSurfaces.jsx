import { useState } from "react";
import Formula from "../../../../components/Formula";
import NumericField from "../../../../components/NumericField";

// Field descriptions for the numeric input fields

// I was not able to finish this formula. Could not figure out best way to implement in alotted time.
const fieldDescriptions = {
    velocity: {
        description: "The velocity of the object in feet per second.",
        placeholderText: "Enter velocity in fps",
    },
    time: {
        description: "The time traveled in seconds.",
        placeholderText: "Enter time in seconds",
    },
};

// Define a functional component for Combined Speed Multiple Surfaces
function CombinedSpeedMultipleSurfaces() {
    // State for input fields and calculated distance
    const [fields, setFields] = useState({
        velocity: null,
        time: null,
    });

    const [distance, setDistance] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Combined Speed Gain/Loss Over Multiple Surfaces (mph)"}
                numericFields={Object.keys(fieldDescriptions).map(
                    (fieldName) => (
                        <NumericField
                            key={fieldName}
                            description={
                                fieldDescriptions[fieldName].description
                            }
                            onChange={(newValue) =>
                                setFields({ ...fields, [fieldName]: newValue })
                            }
                            placeholderText={
                                fieldDescriptions[fieldName].placeholderText
                            }
                        />
                    ),
                )}
                onCalculate={() => {
                    setDistance(fields.velocity * fields.time);
                }}
            />
            {distance !== null && <p>Constant Distance: {distance} ft</p>}
        </div>
    );
}

export default CombinedSpeedMultipleSurfaces;
