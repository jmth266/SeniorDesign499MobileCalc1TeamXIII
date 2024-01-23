import ButtonGrid from "../components/ButtonGrid";

// Define an array of buttons with their corresponding routes and titles
const buttons = [
    { route: "/Conversions", title: "Conversion" },
    { route: "/KinEnergyEqvSpeedLGPage", title: "Kinetic Energy Equivalent Speed Loss/Gain" },
    { route: "/GradeAndSuperElevationPage", title: "Grade and Superelevation" },
    { route: "/EDR", title: "EDR" },
    { route: "/ConstUniAvgEquationPage", title: "Constant, Uniform, or Average Kinematic Equations" },
    { route: "/CenterOfMassEquationPage", title: "Center of Mass Equations" },
    { route: "/RadiusCalculationPage", title: "Radius Calculation"},
    { route: "/AcceDeceRatePage", title: "Acceleration / Deceleration rate when Acceleration / Deceleration factor is known"},
    { route: "/KinEnergyAndWorkPage", title: "Kinetic Energy and Work"}
]

// Define a functional component for the CalculatorPage
function CalculatorPage() {
    return (
        <ButtonGrid categoryName={"Categories"} buttons={buttons} />
    );
}

export default CalculatorPage; // Export the CalculatorPage component
