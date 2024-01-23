import { useState } from "react";
import Formula from "../../../../components/Formula";
import ToggleField from "../../../../components/ToggleField";
import { round } from "../../../../utils/Conversions";
import { getNumericFields } from "../../../../utils/FieldCreator.jsx";

// Toggle field description
const toggleFieldDescriptions = {
    isRear: "Front / Rear",
};

// Field descriptions for the front side
const frontFieldDescriptions = {
    axle_weight: {
        description: "Weight of front axle",
        placeholderText: "Enter weight in pounds",
    },
    wheelbase_width: {
        description: "Wheelbase - distance between front and rear axle",
        placeholderText: "Enter the distance in inches",
    },
    weight: {
        description: "Total weight of the vehicle",
        placeholderText: "Enter weight in pounds",
    },
};

// Field descriptions for the rear side
const rearFieldDescriptions = {
    axle_weight: {
        description: "Weight of rear axle",
        placeholderText: "Enter weight in pounds",
    },
    wheelbase_width: {
        description: "Wheelbase - distance between front and rear axle",
        placeholderText: "Enter the distance in inches",
    },
    weight: {
        description: "Total weight of the vehicle",
        placeholderText: "Enter weight in pounds",
    },
};

// Define a functional component for COMLongitudinalPage
function COMLongitudinalPage() {
    const [comdist, setCOMdist] = useState(null);

    const [fields, setFields] = useState({
        axle_weight: null,
        wheelbase_width: null,
        weight: null,
        isRear: false,
    });

    // TODO: do we need this?
    const handleValueChange = (fieldName, newValue) => {
        setFields({ ...fields, [fieldName]: newValue });
    };

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Longitudinal CoM (in)"}
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
                    fields.isRear
                        ? getNumericFields(
                              fields,
                              rearFieldDescriptions,
                              handleValueChange,
                          )
                        : getNumericFields(
                              fields,
                              frontFieldDescriptions,
                              handleValueChange,
                          )
                }
                onCalculate={() => {
                    setCOMdist(
                        (fields.axle_weight * fields.wheelbase_width) /
                            fields.weight,
                    );
                }}
            />
            {comdist !== null && (
                <p>
                    Calculated Distance behind the{" "}
                    {fields.isRear ? "Rear" : "Front"} Axle of COM Location:{" "}
                    {round(comdist)}
                </p>
            )}
        </div>
    );
}

export default COMLongitudinalPage;
