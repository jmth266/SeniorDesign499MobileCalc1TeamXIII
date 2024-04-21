import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import { forceOfGravity } from "../../../../utils/Conversions.js";
import NumericField from "../../../../components/NumericField.jsx";

const numericFieldMapping = {
    speed: { description: "Speed of the object:", placeholderText: "mph" },
    velocity: { description: "Velocity of the object:", placeholderText: "fps" },
    weight: { description: "Weight of the object:", placeholderText: "pounds" },
};

const toggleFieldMapping = {
  isSpeed: "Speed (mph)",
  isVelocity: "Velocity (fps)",
};

function KinEnergyWithWeightSpdOrVel() {
  const [fields, setFields] = useState({
    weight: null,
    input: null,
    isSpeed: null,
    isVelocity: null,
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
    return input
  };

  const handleWeightChange = (newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      weight: newValue,
    }));
    return weight
  };

  return (
    <div className={"container mb-5 center"}>
      <Formula
        formulaName={"Kinetic Energy using Weight and Speed / Velocity"}
        toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
          <RadioButtonField
            key={fieldName}
            description={toggleFieldMapping[fieldName]}
            value={fields[fieldName]}
            onChange={(newValue) => handleToggleChange(fieldName, newValue)}
          />
        ))}
        numericFields={[
          fields.isSpeed || fields.isVelocity ? (
            <NumericField
              key={fields.isVelocity ? "velocity" : "speed"}
              description={numericFieldMapping[fields.isVelocity ? "velocity" : "speed"].description}
              placeholderText={numericFieldMapping[fields.isVelocity ? "velocity" : "speed"].placeholderText}
              onChange={handleInputChange}
              currValue={fields.input}
            />
          ) : null,
          <NumericField
            key="weight"
            description="Weight:"
            placeholderText="Enter weight"
            onChange={handleWeightChange}
            currValue={fields.weight}
          />
        ]}
        onCalculate={() => {
          const { weight, isSpeed, input } = fields;
          let calculatedResult;
          if (isSpeed) {
            calculatedResult = weight * ((input)**2)/64.4;
          } else {
            calculatedResult = (weight * ((input)**2))/30;
          }
          setResult(`Time is ${calculatedResult.toFixed(3)}s`);
        }}
      />
      {result !== null && (
        <p>{result}</p>
      )}
    </div>
  );
}

export default KinEnergyWithWeightSpdOrVel;
