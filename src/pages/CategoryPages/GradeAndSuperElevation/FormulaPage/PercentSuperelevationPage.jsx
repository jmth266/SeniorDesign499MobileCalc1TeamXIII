import {useState} from 'react';
import Formula from "../../../../components/Formula";
import NumericField from "../../../../components/NumericField";
import {round} from "../../../../utils/Conversions";

const fieldDescriptions = {
    rise: { description: "Rise:", placeholderText: "Enter rise in feet" },
    run: { description: "Run:", placeholderText: "Enter run in feet" },
}

function PercentSuperelevationPage() {

    const [fields, setFields] = useState({
        rise: null,
        run: null,
    });

    const [superelevation, setSuperelevation] = useState(null);

    return (
        <div className={"container mb-5 center"}>
            <Formula
                formulaName={"Percent of Superelevation"}
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
                onCalculate={() => {setSuperelevation(fields.rise / fields.run)}}
            />
            {superelevation !== null && <p>Calculated percent of superelevation: {round(superelevation)}</p>}
        </div>
    );
}

export default PercentSuperelevationPage;