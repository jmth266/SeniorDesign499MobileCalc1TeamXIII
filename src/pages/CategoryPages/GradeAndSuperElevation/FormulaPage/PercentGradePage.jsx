import {useState} from 'react';
import Formula from "../../../../components/Formula";
import NumericField from "../../../../components/NumericField";
import {round} from "../../../../utils/Conversions";

const fieldDescriptions = {
    rise: { description: "Rise:", placeholderText: "Enter rise in feet" },
    run: { description: "Run:", placeholderText: "Enter run in feet" },
}

function PercentGradePage() {

    const [fields, setFields] = useState({
        rise: null,
        run: null,
    });

    const [grade, setGrade] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Percent Grade"}
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
                onCalculate={() => {setGrade(fields.rise / fields.run)}}
            />
            {grade !== null && (
                <p>Calculated Grade: {round(grade)}</p>
            )}
        </div>
    );
}

export default PercentGradePage;