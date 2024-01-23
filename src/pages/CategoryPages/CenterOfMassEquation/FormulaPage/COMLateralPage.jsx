import { useState } from "react";
import Formula from "../../../../components/Formula";
import { round } from "../../../../utils/Conversions";
import ToggleField from "../../../../components/ToggleField";
import { getNumericFields } from "../../../../utils/FieldCreator.jsx";

// Field descriptions for the right side
const rightFieldDescriptions = {
    axleWeight: {
        description: "Weight of front axle on right side",
        placeholderText: "Enter weight in pounds",
    },
    trackWidth: {
        description: "Track Width",
        placeholderText: "Enter track width in inches",
    },
    weight: {
        description: "Total weight of the vehicle",
        placeholderText: "Enter weight in pounds",
    },
};

// Field descriptions for the left side
const leftFieldDescriptions = {
    axleWeight: {
        description: "Weight of front axle on left side",
        placeholderText: "Enter weight in pounds",
    },
    trackWidth: {
        description: "Track Width",
        placeholderText: "Enter track width in inches",
    },
    weight: {
        description: "Total weight of the vehicle",
        placeholderText: "Enter weight in pounds",
    },
};

// Toggle field descriptions
const toggleFieldDescriptions = {
    isRight: "Left / Right",
};

// Define a functional component for COMLateralPage
function COMLateralPage() {
    const [comdist, setCOMdist] = useState(null);
    const [fields, setFields] = useState({
        axleWeight: null,
        trackWidth: null,
        weight: null,
        isRight: false,
    });

    // TODO: do we need this?
    const handleValueChange = (fieldName, newValue) => {
        setFields((prevFields) => ({ ...prevFields, [fieldName]: newValue }));
    };

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Lateral CoM (in)"}
                toggleFields={Object.keys(toggleFieldDescriptions).map(
                    (fieldName) => (
                        <ToggleField
                            key={fieldName}
                            description={toggleFieldDescriptions[fieldName]}
                            onChange={(newValue) =>
                                setFields({ ...fields, [fieldName]: newValue })
                            }
                        />
                    ),
                )}
                numericFields={
                    fields.isRight
                        ? getNumericFields(
                              fields,
                              rightFieldDescriptions,
                              handleValueChange,
                          )
                        : getNumericFields(
                              fields,
                              leftFieldDescriptions,
                              handleValueChange,
                          )
                }
                onCalculate={() => {
                    setCOMdist(
                        (fields.axleWeight * fields.trackWidth) / fields.weight,
                    );
                }}
            />
            {comdist !== null && (
                <p>
                    Calculated distance of COM from the{" "}
                    {fields.isRight ? "right" : "left"} side of vehicle:{" "}
                    {round(comdist)} in
                </p>
            )}
        </div>
    );
}

export default COMLateralPage;
