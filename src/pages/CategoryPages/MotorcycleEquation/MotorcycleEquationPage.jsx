import ButtonGrid from "../../../components/ButtonGrid";

function SwerveToAvoidEquationPage() {

    const navigationButtons = [
        { route: "/TimeToAccOrDecToStopPage", title: "Time To Accelerate/Decelerate To Stop Page" },
    ];
    
    return (
        <ButtonGrid categoryName={"Swerve to Avoid"} buttons = {navigationButtons} />
    )
}

export default SwerveToAvoidEquationPage;