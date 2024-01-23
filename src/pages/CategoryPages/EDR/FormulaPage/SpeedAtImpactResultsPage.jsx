import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {fpsToMph, mphToFps, mphToKph, mphToMps, round} from "../../../../utils/Conversions";
import {FORCE_OF_GRAVITY} from "../../../../utils/Constants";

function ResultElement({title, values}) {
    return (
        <>
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className="grid grid-cols-2">
                {values.map((value, index) => (
                    <p key={index} className="text-sm">{value} {index % 2 === 0 ? 'mph' : 'kph'}</p>
                ))}
            </div>
        </>
    );
}

function SpeedResultElement({speedData}) {
    return (
        <>
            <div className={"grid grid-cols-2"}>
                <h1 className="text-md font-semibold">Min Speed</h1>
                <h1 className="text-md font-semibold">Max Speed</h1>
                {speedData.map((speed, index) => (
                    <React.Fragment key={index}>
                        <p>{speed.min} {speed.unit}</p>
                        <p>{speed.max} {speed.unit}</p>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

function SpeedAtImpactResultsPage() {

    const location = useLocation();
    const fields = location.state ? location.state.fields : null;
    const navigate = useNavigate();

    function calculateResults() {
        const {
            lastSpeedData,
            samplesPerSecond,
            dragFactor,
            slipPercentage,
            speedometerAccuracy,
        } = fields;

        const dragFactorConversion = fpsToMph(dragFactor * FORCE_OF_GRAVITY);
        const slipPercentageFactor = slipPercentage / 100;
        const speedometerAccuracyFactor = speedometerAccuracy / 100;

        const speedLoss = (1 / samplesPerSecond) * dragFactorConversion * -1;
        const speedUnderreporting = slipPercentageFactor * lastSpeedData;
        const minSpeedometerTolerance = lastSpeedData * speedometerAccuracyFactor * -1;
        const maxSpeedometerTolerance = lastSpeedData * speedometerAccuracyFactor;

        const minSpeed = round(lastSpeedData + speedLoss + speedUnderreporting + minSpeedometerTolerance);
        const maxSpeed = round(lastSpeedData + maxSpeedometerTolerance + speedUnderreporting);

        const kphConversion = (value) => round(mphToKph(value));
        const fpsMinSpeed = kphConversion(mphToFps(minSpeed));
        const kphMinSpeed = kphConversion(minSpeed);
        const mpsMinSpeed = kphConversion(mphToMps(minSpeed));

        const fpsMaxSpeed = kphConversion(mphToFps(maxSpeed));
        const kphMaxSpeed = kphConversion(maxSpeed);
        const mpsMaxSpeed = kphConversion(mphToMps(maxSpeed));

        return {
            speedPoint: lastSpeedData,
            speedLoss: round(speedLoss),
            speedUnderreporting: round(speedUnderreporting),
            minSpeedometerTolerance: round(minSpeedometerTolerance),
            maxSpeedometerTolerance: round(maxSpeedometerTolerance),
            kphLastSpeed: kphConversion(lastSpeedData),
            kphSpeedLoss: kphConversion(speedLoss),
            kphSpeedUnderreporting: kphConversion(speedUnderreporting),
            kphMinSpeedometerTolerance: kphConversion(minSpeedometerTolerance),
            kphMaxSpeedometerTolerance: kphConversion(maxSpeedometerTolerance),
            speedData: [
                { unit: "mph", min: minSpeed, max: maxSpeed },
                { unit: "fps", min: fpsMinSpeed, max: fpsMaxSpeed },
                { unit: "kph", min: kphMinSpeed, max: kphMaxSpeed },
                { unit: "mps", min: mpsMinSpeed, max: mpsMaxSpeed }
            ],
        };
    }

    function renderContent() {
        if (!fields) {
            return (
                <>
                    <h1>No Data Available</h1>
                </>
            );
        }
        let results = calculateResults();
        return (
            <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div></div>
                    <div className={"grid grid-cols-2"}>
                        <h2 className="text-sm font-semibold">Min</h2>
                        <h2 className="text-sm font-semibold">Max</h2>
                    </div>
                    <ResultElement title={"Last Speed Data Point"}
                                   values={[results.speedPoint, results.speedPoint, results.kphLastSpeed, results.kphLastSpeed]}/>
                    <ResultElement title={"Possible Braking Speed Loss"}
                                   values={[results.speedLoss, 0.0, results.kphSpeedLoss, 0.0]}/>
                    <ResultElement title={"Speed Slip Underreporting"}
                                   values={[results.speedUnderreporting, results.speedUnderreporting, results.kphSpeedUnderreporting, results.kphSpeedUnderreporting]}/>
                    <ResultElement title={"Speedometer Tolerance Gain/Loss"}
                                   values={[results.minSpeedometerTolerance, results.maxSpeedometerTolerance, results.kphMinSpeedometerTolerance, results.kphMaxSpeedometerTolerance]}/>
                </div>
                <SpeedResultElement speedData={results.speedData}/>
            </div>
        );
    }

    return (
        <div className={"container mb-5 center"}>
            <div className="px-4 flex flex-col items-center">
                {renderContent()}
                <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
}
export default SpeedAtImpactResultsPage;