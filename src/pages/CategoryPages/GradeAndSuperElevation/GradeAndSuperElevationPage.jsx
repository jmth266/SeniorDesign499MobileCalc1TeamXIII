import ButtonGrid from "../../../components/ButtonGrid";

function GradeAndSuperElevation() {

    const navigationButtons = [
        { route: "/PercentGradePage", title: "Percent Grade" },
        { route: "/PercentSuperelevationPage", title: "Percent of Superelevation" },
        // Add more buttons as needed
    ];


    return (
        <ButtonGrid categoryName={"Grade and Superelevation"} buttons={navigationButtons} />
    )
}

export default GradeAndSuperElevation;