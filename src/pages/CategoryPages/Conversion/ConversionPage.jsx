import ButtonGrid from "../../../components/ButtonGrid";


function Conversion() {

    const navigationButtons = [
        { route: "/Conversions/SpeedAndVelocity", title: "Speed and Velocity" },
    ];

    return(
        <ButtonGrid categoryName={"Conversion"} buttons={navigationButtons} />
    )
}

export default Conversion;
