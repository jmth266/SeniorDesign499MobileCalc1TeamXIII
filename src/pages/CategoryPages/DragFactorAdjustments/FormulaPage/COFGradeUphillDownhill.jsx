import { useState } from "react";
import RadioButtonField from "../../../../components/ToggleField.jsx";
import Formula from "../../../../components/Formula.jsx";
import NumericField from "../../../../components/NumericField.jsx";

const numericFieldMapping = {
    uphill: { description: "Grade of The Roadway in Percentage (uphill):", placeholderText: "Enter Grade" },
    downhill: { description: "Grade of The Roadway in Percentage (downhill):", placeholderText: "Enter Grade" },
  };
  
  const toggleFieldMapping = {
    isUphill: "Uphill",
    isDownhill: "Downhill",
  };
  
  function COFGradeUphillDownhill() {
    const [fields, setFields] = useState({
      coefficientOfFriction: null,
      braking: null,
      input: null,
      isUphill: true,
      isDownhill: false,
    });
  
    const [result, setResult] = useState(null);
  
    const handleToggleChange = (fieldName, newValue) => {
      setFields((prevFields) => ({
        ...prevFields,
        isUphill: fieldName === "isUphill" && newValue,
        isDownhill: fieldName === "isDownhill" && newValue,
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

    const handleBraking = (newValue) => {
        setFields((prevFields) => ({
          ...prevFields,
          braking: newValue,
        }));
        return braking
    };
  
    return (
      <div className={"container mb-5 center"}>
        <Formula
          formulaName={"This adjusts the level coefficient of friction value (µ) by the percentage of braking and percentage of grade."}
          toggleFields={Object.keys(toggleFieldMapping).map((fieldName) => (
            <RadioButtonField
              key={fieldName}
              description={toggleFieldMapping[fieldName]}
              value={fields[fieldName]}
              onChange={(newValue) => handleToggleChange(fieldName, newValue)}
            />
          ))}
          numericFields={[
            fields.isUphill || fields.isDownhill ? (
              <NumericField
                key={fields.isDownhill ? "downhill" : "uphill"}
                description={numericFieldMapping[fields.isDownhill ? "downhill" : "uphill"].description}
                placeholderText={numericFieldMapping[fields.isDownhill ? "downhill" : "uphill"].placeholderText}
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
            <NumericField
              key="braking"
              description="Percentage of Braking of Vehicle"
              placeholderText="Enter Percentage of Braking"
              onChange={handleBraking}
              currValue={fields.braking}
            />
          ]}
          onCalculate={() => {
            const { input, braking, coefficientOfFriction, isUphill} = fields;
            let calculatedResult;
            if (isUphill) {
              // For whatever reason I can't get it to output when I used "+ 1" at the end so I had to
              // do "- -1" instead. Should not be a big deal but I figured I would write a comment. -JD CS4992024
              calculatedResult = (coefficientOfFriction * braking) - (-1) * input;
            } else {
              calculatedResult = (coefficientOfFriction * braking) - input;
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
  
export default COFGradeUphillDownhill;
