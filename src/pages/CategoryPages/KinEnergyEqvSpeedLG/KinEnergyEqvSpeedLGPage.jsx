import ButtonGrid from "../../../components/ButtonGrid";

function KinEnergyEqvSpeedLG() {

    const navigationButtons = [
        { route: "/SpeedVelocitySlidingToStopPage", title: "Minimum Speed / Velocity Slide to Stop" },
    ];
    
    return (
        <ButtonGrid categoryName={"Kinetic Energy Equivalent"} buttons = {navigationButtons} />
    )
}

export default KinEnergyEqvSpeedLG;