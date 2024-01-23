import ButtonGrid from "../../../components/ButtonGrid";

function EDRPage() {

    const navigationButtons = [
        { route: "/EDR/SpeedAtImpact", title: "Adjusted Speed at Impact" },
    ];

    return (
        <ButtonGrid categoryName={"EDR"} buttons={navigationButtons} />
    );
}

export default EDRPage;