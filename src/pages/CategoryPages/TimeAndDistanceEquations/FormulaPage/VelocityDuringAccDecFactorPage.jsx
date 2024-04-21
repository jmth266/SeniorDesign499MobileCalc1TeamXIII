import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import NumericField from "../../../../components/NumericField.jsx";
import { forceOfGravity } from "../../../../utils/Conversions.js";



const toggleFieldMapping = {
  isAcceleration: "Calculating Acceleration",
  isDeceleration: "Calculating Deceleration",
};

function VelocityDuringAccDecFactorPage (){
  const [fields, setFields] = useState({
    time: null,
    friction: null,
    initialVelocity: null,
    isAcceleration: true,
    isDeceleration: false,
  });

  const [result, setResult] = useState(null);

  const handleToggleChange = (fieldName, newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      isAcceleration: fieldName === "isAcceleration" && newValue,
      isDeceleration: fieldName === "isDeceleration" && newValue,
    }));

    // Reset the result when the radio button changes
    setResult(null);
  };

  const handleTimeChange = (newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      time: newValue,
    }));
    return time
  };
  const handleFrictionChange = (newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      friction: newValue,
    }));
    return friction
  };

  const handleVelocityChange = (newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      initialVelocity: newValue,
    }));
    return initialVelocity
  };
  
  

  return (
    <div className={"container mb-5 center"}>
      <Formula
        formulaName={"Velocity at any time during Acceleration/Deceleration when Initial Velocity, adjusted Acc/Dec Factor, and Time are known"}
        toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
          <RadioButtonField
            key={fieldName}
            description={toggleFieldMapping[fieldName]}
            value={fields[fieldName]}
            onChange={(newValue) => handleToggleChange(fieldName, newValue)}
          />
        ))}
        numericFields={[
          <NumericField
            key="coefficient of friction"
            description={"Coefficient of Friction"}
            placeholderText={"Enter Coefficient of Friction Factor"}
            onChange={handleFrictionChange}
            currValue={fields.friction}
          />,
          <NumericField
            key="time"
            description="Time:"
            placeholderText="Enter time (s)"
            onChange={handleTimeChange}
            currValue={fields.time}
          />,
          <NumericField 
            key="initialVelocity"
            description={"Initial Velocity"}
            placeholderText={"Enter Initial Velocity"}
            onChange={handleVelocityChange}
            currValue={fields.initialVelocity}
          />
        ]}
        onCalculate={() => {
            const { initialVelocity, time, isAcceleration, friction } = fields;
            let calculatedResult;
            if (isAcceleration) {
              calculatedResult = initialVelocity + (forceOfGravity *friction * time);
              setResult(`Distance is + ${calculatedResult.toFixed(3)} ft`);
            } else {
              calculatedResult = initialVelocity - (forceOfGravity *friction * time);
              setResult(`Distance is ${calculatedResult.toFixed(3)} ft`);
            }
          }}
        />
      {result !== null && (
        <p>{result}</p>
      )}
    </div>
  );
}

export default VelocityDuringAccDecFactorPage;
