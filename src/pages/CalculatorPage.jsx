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
    { route: "/AcceDeceRatePage", title: "Acceleration / Deceleration Rate},
    { route: "/KinEnergyAndWorkPage", title: "Kinetic Energy and Work"},
    { route: "/ChangeInVelocitySpeedScalarPage", title: "Change in Speed/Velocity Scalar"},
    { route: "/VectorSumAnalysisPage", title: "Vector Sum Analysis"},
    { route: "/CombinedSpeedPage", title: "Combined Speed"},
    { route: "/AccelDecelFactorsPage", title: "Acceleration / Deceleration Factors"},
    { route: "/AirborneEquationsPage", title: "Airborne Equations"},
    { route: "/DragFactorAdjustmentsPage", title: "Drag Factor Adjustments"}
    { route: "/TimeAndDistanceEquationsPage", title: "Time and Distance Equations"},
    { route: "/ProjectionEfficiencyPage", title: "Projection Efficiency"},
]

// Define a functional component for the CalculatorPage
function CalculatorPage() {
    return (
        <ButtonGrid categoryName={"Categories"} buttons={buttons} />
    );
}

export default CalculatorPage; // Export the CalculatorPage component
