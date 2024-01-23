import ButtonGrid from "../../../components/ButtonGrid";


function KinEnergyAndWork() {

    const navigationButtons = [
        { route: "/KinEnergyCalPage", title: "Kinetic Energy Calculation" },
        { route: "/WorkCalPage", title: "Work Calculation" },
        { route: "/MphAndFpsDueToKEPage", title: "Velocity (mph / fps) due to Kinetic Energy" },
    ];

    return(
        <ButtonGrid categoryName={"Kinetic Energy and Work"} buttons={navigationButtons} />
    )
}

export default KinEnergyAndWork;