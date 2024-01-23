import ButtonGrid from "../../../components/ButtonGrid";


function KinEnergyCal() {

    const navigationButtons = [
        { route: "/KinEnergyWithMassVelPage", title: "KE using Mass and Velocity" },
        { route: "/KinEnergyWithWeightSpdOrVelPage", title: "KE using Weight and Speed / Velocity" },
        
    ];

    return(
        <ButtonGrid categoryName={"Kinetic Energy Calculations"} buttons={navigationButtons} />
    )
}

export default KinEnergyCal;
