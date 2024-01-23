// Define a functional component for a numeric input field
//
const NumericField = ({
    description,
    onChange,
    disabled,
    placeholderText,
    fieldMin = 0,
    fieldMax = Infinity,
    currValue,
}) => {
    // Function to handle input change
    const handleInputChange = (e) => {
        if (!disabled) {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue)) {
                onChange(newValue);
            }
        }
    };

    return (
        <>
            <label className="form-label">
                {description} {/* Display the provided description */}
            </label>
            <input
                type="number"
                step="any"
                className={`form-control ${disabled ? "bg-gray-200" : ""}`}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder={placeholderText} // Display the provided placeholder text
                min={fieldMin}
                max={fieldMax}
                required={true}
                value={currValue}
            />
        </>
    );
};

export default NumericField; // Export the NumericField component
