import React, { useState } from 'react';
import Formula from "../../../../components/Formula";
import NumericField from "../../../../components/NumericField";
import { round } from "../../../../utils/Conversions";

const fieldDescriptions = {
    braking: { description: "Braking Efficiency:", placeholderText: "Enter percentage of braking of vehicle " },
    rSlope: { description: "Roadway Slope:", placeholderText: "Enter he slope of the roadway in line with the direction of the lane (degrees)" },
    COF: { description: "Coefficient of Friction:", placeholderText: "Enter coefficient of friction"}
}

function COFWithRoadwayGrade() {

    const [fields, setFields] = useState({
        braking: null,
        rSlope: null,
        COF: null,
    });

    const [grade, setGrade] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Level of Coefficient of Friction by a Percentage of Braking and Percentage of Grade"}
                numericFields={
                    Object.keys(fieldDescriptions).map(fieldName => (
                        <NumericField
                            key={fieldName}
                            description={fieldDescriptions[fieldName].description}
                            onChange={(newValue) => setFields({...fields, [fieldName]: newValue})}
                            placeholderText={fieldDescriptions[fieldName].placeholderText}
                        />
                    ))
                }
                onCalculate={() => {
                    const { braking, rSlope, COF } = fields;


                    // Calculate the grade using the modified formula
                    const calculatedGrade = (COF * braking * rSlope) / (Math.sqrt(1 + (rSlope ** 2)));
                    setGrade(calculatedGrade);
                }}
            />
            {grade !== null && (
                <p>Coefficient of Friction: {round(grade)}</p>
            )}
        </div>
    );
}

export default COFWithRoadwayGrade;