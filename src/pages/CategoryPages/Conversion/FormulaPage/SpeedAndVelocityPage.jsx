import { useState } from "react";
import ToggleField from "../../../../components/ToggleField";
import Formula from "../../../../components/Formula";
import { fpsToMph, mphToFps, round } from "../../../../utils/Conversions";
import NumericField from "../../../../components/NumericField.jsx";

const numericFieldMapping = {
    speed: { description: "Speed:", placeholderText: "mph" },
    velocity: { description: "Velocity:", placeholderText: "fps" },
};

const toggleFieldMapping = {
    isSpeed: "Velocity to Speed / Speed to Velocity",
};

function SpeedAndVelocityPage() {
    const [fields, setFields] = useState({
        input: null,
        isSpeed: false,
    });

    const [result, setResult] = useState(null);

    const handleValueChange = (fieldName, newValue) => {
        setFields({ ...fields, [fieldName]: newValue });
    };

    // on toggle, set the value of the field to the other field's value and recalculate the result
    const handleToggle = (fieldName, newValue) => {
        if (result) {
            fields.isSpeed
                ? setResult(fpsToMph(fields.input))
                : setResult(mphToFps(fields.input));
        }
        setFields({ ...fields, [fieldName]: newValue });
    };

    const toggleFields = Object.keys(toggleFieldMapping).map((fieldName) => (
        <ToggleField
            key={fieldName}
            description={toggleFieldMapping[fieldName]}
            onChange={(newValue) => handleToggle(fieldName, newValue)}
        />
    ));

    const fieldType = fields.isSpeed ? "speed" : "velocity";

    // create a numeric field (as a map) for the given field type
    const numericFields = Object.keys(numericFieldMapping).map(
        (fieldName) =>
            fieldName === fieldType && (
                <NumericField
                    key={fieldName}
                    description={numericFieldMapping[fieldName].description}
                    placeholderText={
                        numericFieldMapping[fieldName].placeholderText
                    }
                    onChange={(newValue) =>
                        handleValueChange("input", newValue)
                    }
                    currValue={fields.input}
                />
            ),
    );

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Speed (mph) and Velocity (fps) Converter"}
                toggleFields={toggleFields}
                numericFields={numericFields}
                onCalculate={() => {
                    fields.isSpeed
                        ? setResult(mphToFps(fields.input))
                        : setResult(fpsToMph(fields.input));
                }}
            />
            {result !== null && (
                <p>
                    {fields.isSpeed ? "Velocity" : "Speed"}: {round(result)}{" "}
                    {fields.isSpeed ? "fps" : "mph"}
                </p>
            )}
        </div>
    );
}

export default SpeedAndVelocityPage;
