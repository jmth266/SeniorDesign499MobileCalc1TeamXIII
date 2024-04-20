import ButtonGrid from "../../../components/ButtonGrid";

// Define a functional component for the CombinedSpeedPage
function DragFactorAdjustmentsPage() {
    // Define an array of navigation buttons with their corresponding routes and titles
    const navigationButtons = [
        { route: "/COFWithRoadwaySlope", title: "Level of COF with Braking and Roadway Slope" },
        { route: "/COFWithRoadwayGrade", title: "Level of COF with Roadway Grade" },
        { route: "/COFGradeUphillDownhill", title: "COF Slope < 10%" },
        { route: "/COFSuperElevation", title: "COF by % of Superelevation" },
        
        
    ];

    return (
        <ButtonGrid categoryName={"Drag Factor Adjustment Equations"} buttons={navigationButtons} />
        // Render the ButtonGrid component with the category name and navigation buttons
    )
}

export default DragFactorAdjustmentsPage; // Export the CombinedSpeedPage component