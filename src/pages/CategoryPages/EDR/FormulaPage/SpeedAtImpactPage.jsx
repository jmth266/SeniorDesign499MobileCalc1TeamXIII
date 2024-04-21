import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Formula from "../../../../components/Formula";
import NumericField from "../../../../components/NumericField";
import RadioButtonField from "../../../../components/ToggleField.jsx";

const intFieldDescriptions = {
    slipPercentage: { description: "Slip Percentage", isAntiLock: true },
    lastSpeedData: { description: "Last Speed Data Point" },
    samplesPerSecond: { description: "Samples per Second" },
    dragFactor: { description: "Drag Factor / Slowing Rate", fieldMin: 0.01, fieldMax: 1.5 },
    speedometerAccuracy: { description: "Speedometer Accuracy" },
};

const toggleFieldMapping = {
    isHeavy: "Heavy",
    isAntiLock: "Anti-Lock",
};

function SpeedAtImpactPage() {

    const [fields, setFields] = useState({
        lastSpeedData: null,
        samplesPerSecond: null,
        dragFactor: null,
        slipPercentage: 0,
        speedometerAccuracy: null,
        heavy: null,
        antiLock: null,
    });

    const navigate = useNavigate();
    const handleToggleChange = (fieldName, newValue) => {
        setFields((prevFields) => ({
            ...prevFields,
            isHeavy: fieldName === "isHeavy" && newValue,
            isAntiLock: fieldName === "isAntiLock" && newValue,
        }));
        
    };

    // Render the Formula component with the formula name and numeric fields
    return (
        <Formula
            formulaName="Adjusted Speed At Impact"
            toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
                <RadioButtonField
                    key={fieldName}
                    description={toggleFieldMapping[fieldName]}
                    value={fields[fieldName]}
                    onChange={(newValue) => handleToggleChange(fieldName, newValue)}
                />
            ))}
            numericFields={
                Object.keys(intFieldDescriptions).map(fieldName => (
                    <NumericField
                        key={fieldName}
                        description={intFieldDescriptions[fieldName].description}
                        onChange={(newValue) => setFields({ ...fields, [fieldName]: newValue })}
                        disabled={fieldName === 'slipPercentage' ? !fields.isAntiLock : intFieldDescriptions[fieldName].isHeavy ? !fields.isHeavy : false}
                        fieldMin={intFieldDescriptions[fieldName].fieldMin}
                        fieldMax={intFieldDescriptions[fieldName].fieldMax}
                    />
                ))
            }
            onCalculate={() => {
                navigate("/EDR/SpeedAtImpact/Results", { state: { fields: fields } });
            }}
        />
    );
}
export default SpeedAtImpactPage;
