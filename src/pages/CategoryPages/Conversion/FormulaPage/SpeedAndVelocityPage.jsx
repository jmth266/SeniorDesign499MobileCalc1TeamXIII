import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField";
import Formula from "../../../../components/Formula";
import { fpsToMph, mphToFps, round } from "../../../../utils/Conversions";
import NumericField from "../../../../components/NumericField.jsx";

const numericFieldMapping = {
    speed: { description: "Speed:", placeholderText: "mph" },
    velocity: { description: "Velocity:", placeholderText: "fps" },
  };
  
  const toggleFieldMapping = {
    isSpeed: "Speed (mph)",
    isVelocity: "Velocity (fps)",
  };
  
  function SpeedAndVelocityPage() {
    const [fields, setFields] = useState({
      input: null,
      isSpeed: false,
      isVelocity: false,
    });
  
    const [result, setResult] = useState(null);
  
    const handleToggleChange = (fieldName, newValue) => {
      setFields((prevFields) => ({
        ...prevFields,
        isSpeed: fieldName === "isSpeed" && newValue,
        isVelocity: fieldName === "isVelocity" && newValue,
      }));
  
      // Reset the result when the radio button changes
      setResult(null);
    };
  
    const handleInputChange = (newValue) => {
      setFields((prevFields) => ({
        ...prevFields,
        input: newValue,
      }));
    };
  
    const toggleFields = Object.keys(toggleFieldMapping).map((fieldName) => (
      <RadioButtonField
        key={fieldName}
        description={toggleFieldMapping[fieldName]}
        value={fields[fieldName]}
        onChange={(newValue) => handleToggleChange(fieldName, newValue)}
      />
    ));
  
    const fieldType = fields.isSpeed ? "speed" : "velocity";
  
    const numericFields = Object.keys(numericFieldMapping).map(
      (fieldName) =>
        fieldName === fieldType && (
          <NumericField
            key={fieldName}
            description={numericFieldMapping[fieldName].description}
            placeholderText={numericFieldMapping[fieldName].placeholderText}
            onChange={(newValue) => handleInputChange(newValue)}
            currValue={fields.input}
          />
        )
    );
  
    return (
      <div className={"container mb-5 center"}>
        <Formula
          formulaName={"Speed (mph) and Velocity (fps) Converter"}
          toggleFields={toggleFields}
          numericFields={numericFields}
          onCalculate={() => {
            if (fields.isSpeed) {
              setResult(mphToFps(fields.input));
            } else if (fields.isVelocity) {
              setResult(fpsToMph(fields.input));
            }
          }}
        />
        {result !== null && (
          <p>
            {fields.isSpeed ? "Velocity" : "Speed"}: {Number((result).toFixed(2))}{" "}
            {fields.isSpeed ? "fps" : "mph"}
          </p>
        )}
      </div>
    );
  }
  
  export default SpeedAndVelocityPage;