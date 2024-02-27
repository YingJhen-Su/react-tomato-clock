import { useSelector } from "react-redux";
import { clockSelector } from "./clockSlice";

const ClockDisplay = () => {
    const clock = useSelector(clockSelector);

    return (
        <section className="clock__display bg-[rgba(255,255,255,0.4)] w-full text-center p-2 my-4 rounded-md">
            <h2 id="timer-label" className="text-3xl mb-2">
                {clock.period}
            </h2>
            <div id="time-left" className="text-7xl">
                {clock.timeLeft}
            </div>
        </section>
    );
};

export default ClockDisplay;
