import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import NumericField from "../../../../components/NumericField.jsx";
import { forceOfGravity } from "../../../../utils/Conversions.js";

const numericFieldMapping = {
  noAngle: {
    force: { description: "Force to move the object:", placeholderText: "pounds" },
    distance: { description: "Distance the object displaced:", placeholderText: "feet" },
  },
  angle: { description: "Angle between the force and the direction of displacement :", placeholderText: "degrees", isToggled: true }
};

const toggleFieldMapping = {
  isNoAngle: "No Angle",
  isAngle: "Angle",
};

function WorkWithForceAndDist() {
  const [fields, setFields] = useState({
    force: null,
    distance: null,
    angle: null,
    isNoAngle: null,
    isAngle: null,
  });

  const [result, setResult] = useState(null);

  const handleToggleChange = (fieldName, newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      isNoAngle: fieldName === "isNoAngle" && newValue,
      isAngle: fieldName === "isAngle" && newValue,
    }));
  
    // Reset the result when the radio button changes
    setResult(null);
  };
  

  const handleInputChange = (fieldName, newValue) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  return (
    <div className={"container mb-5 center"}>
      <Formula
        formulaName={"Accelerate from Stop or Decelerate to Stop"}
        toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
          <RadioButtonField
            key={fieldName}
            description={toggleFieldMapping[fieldName]}
            value={fields[fieldName]}
            onChange={(newValue) => handleToggleChange(fieldName, newValue)}
          />
        ))}
        numericFields={[
            fields.isAngle ? (
                <>
                <NumericField
                  key="angle"
                  description="Angle between the force and distance of displacement:"
                  placeholderText="Enter Angle (degrees)"
                  onChange={(newValue) => handleInputChange("angle", newValue)}
                  currValue={fields.angle}
                />
              </>
            ) : (<></>),
          
            <NumericField
            key="force"
            description={numericFieldMapping.noAngle.force.description}
            placeholderText={numericFieldMapping.noAngle.force.placeholderText}
            onChange={(newValue) => handleInputChange("force", newValue)} // Pass "force" as fieldName
            currValue={fields.force}
            />,

            <NumericField
            key="distance"
            description={numericFieldMapping.noAngle.distance.description}
            placeholderText={numericFieldMapping.noAngle.distance.placeholderText}
            onChange={(newValue) => handleInputChange("distance", newValue)} // Pass "distance" as fieldName
            currValue={fields.distance}
            />

          ]}
          
          
          onCalculate={() => {
            const { force, distance, angle, isAngle } = fields;
            let calculatedResult;
          
            if (isAngle) {
              calculatedResult = (force * distance * Math.cos(angle/180));
              setResult(`Result is ${calculatedResult.toFixed(3)}`);

            } else {
              calculatedResult = force * distance;
              setResult(`Result is ${calculatedResult.toFixed(3)}`);

            }
            
          }}
          
      />
      {result !== null && <p>{result}</p>}
    </div>
  );
}

export default WorkWithForceAndDist;
