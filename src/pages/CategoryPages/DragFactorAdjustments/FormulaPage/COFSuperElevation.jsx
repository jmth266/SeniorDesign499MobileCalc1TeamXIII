import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import NumericField from "../../../../components/NumericField.jsx";

const numericFieldMapping = {
    rise: { description: "Measurment of rise (+) across the roadway - in the direction of the striations:", placeholderText: "Enter measurement of rise across roadway" },
    fall: { description: "Measurment of fall (-) across the roadway - in the direction of the striations:", placeholderText: "Enter measurement of fall across roadway" },
  };
  
  const toggleFieldMapping = {
    isRise: "Rise",
    isFall: "Fall",
  };
  
  function COFSuperElevation() {
    const [fields, setFields] = useState({
      coefficientOfFriction: null,
      input: null,
      isRise: true,
      isFall: false,
    });
  
    const [result, setResult] = useState(null);
  
    const handleToggleChange = (fieldName, newValue) => {
      setFields((prevFields) => ({
        ...prevFields,
        isRise: fieldName === "isRise" && newValue,
        isFall: fieldName === "isFall" && newValue,
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
  
    const handleCoefficientChange = (newValue) => {
      setFields((prevFields) => ({
        ...prevFields,
        coefficientOfFriction: newValue,
      }));
      return coefficientOfFriction
    };

  
    return (
      <div className={"container mb-5 center"}>
        <Formula
          formulaName={"This adjusts the level coefficient of friction value (µ) by the percentage of superelevation for a vehicle that lost lateral stability"}
          toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
            <RadioButtonField
              key={fieldName}
              description={toggleFieldMapping[fieldName]}
              value={fields[fieldName]}
              onChange={(newValue) => handleToggleChange(fieldName, newValue)}
            />
          ))}
          numericFields={[
            fields.isRise || fields.isFall ? (
              <NumericField
                key={fields.isFall ? "fall" : "rise"}
                description={numericFieldMapping[fields.isFall ? "fall" : "rise"].description}
                placeholderText={numericFieldMapping[fields.isFall ? "fall" : "rise"].placeholderText}
                onChange={handleInputChange}
                currValue={fields.input}
              />
            ) : null,
            <NumericField
              key="coefficientOfFriction"
              description="Coefficient of Friction:"
              placeholderText="Enter Coefficient of Friction"
              onChange={handleCoefficientChange}
              currValue={fields.coefficientOfFriction}
            />,
            
          ]}
          onCalculate={() => {
            const { input, coefficientOfFriction, isRise} = fields;
            let calculatedResult;
            if (isRise) {
                // For whatever reason I can't get it to output when I used "+ 1" at the end so I had to
              // do "- -1" instead. Should not be a big deal but I figured I would write a comment. -JD CS4992024
              calculatedResult = coefficientOfFriction - (-1) * input;
            } else {
              calculatedResult = coefficientOfFriction - input;
            }
            setResult(`COF is ${calculatedResult.toFixed(3)}`);
          }}
        />
        {result !== null && (
          <p>{result}</p>
        )}
      </div>
    );
  }
  
export default COFSuperElevation;
