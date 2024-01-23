import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Link, useNavigate } from 'react-router-dom';

// Define a functional component for a search bar with formula suggestions
const SearchBarFormula = () => {
  // Initialize state variables for input value and suggestions
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // React Router's navigation hook

  // Define a mapping of formula keywords to their corresponding routes
  const searchKeywords = {
    // Formula Keywords
    "Speed/Velocity Converter Formula": "/Conversions/SpeedAndVelocity",
    "Minimum Speed / Velocity Slide to Stop": "/SpeedVelocitySlidingToStopPage",
    "Percent Grade Formula": "/PercentGradePage",
    "Percent Superelevation Formula": "/PercentSuperelevationPage",
    "Adjusted Speed at Impact": "/EDR/SpeedAtImpact",
    "Constnat Velocity (fps)": "/ConstantVelocityPage",
    "Constant Time (s) Formula": "/ConstantTimePage",
    "Constant Distance (ft) Formula": "/ConstantDistancePage",
    "Slide to Stop Dist with Drag Formula": "/SlidetoStopDistWithDragPage",
    "CoM Longitudinal Formula": "/COMLongitudinalPage",
    "CoM Lateral Formula": "/COMLateralPage",
  };

  // This function is called to update suggestions when input changes
  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    // Filter keywords based on input value
    const matchingRoutes = Object.keys(searchKeywords).filter((route) =>
      route.toLowerCase().includes(inputValue)
    );
    setSuggestions(matchingRoutes);
  };

  // This function is called to clear suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // When a suggestion is selected, navigate to the corresponding route
  const onSuggestionSelected = (event, { suggestionValue }) => {
    navigate(searchKeywords[suggestionValue]);
  };

  // Input properties for Autosuggest component
  const inputProps = {
    className: 'form-control',
    placeholder: 'Search Formula',
    value,
    onChange: (e, { newValue }) => {
      setValue(newValue);
    },
  };

  return (
    <div className="input-group"> {/* Use Bootstrap's input-group for styling */}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => (
          <Link to={searchKeywords[suggestion]} className="suggestion">
            {suggestion}
          </Link>
        )}
        inputProps={inputProps}
      />
      
    </div>
  );
};

export default SearchBarFormula; // Export the SearchBarFormula component
