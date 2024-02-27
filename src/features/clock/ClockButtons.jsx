import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { clockSelector } from "./clockSlice";

const ClockButtons = ({ handleSwitch, handleReset }) => {
    const clock = useSelector(clockSelector);

    return (
        <section className="clock__buttons grid grid-cols-2 gap-2">
            <button id="start_stop" onClick={handleSwitch}>
                {clock.isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={handleReset}>
                Reset
            </button>
        </section>
    );
};

ClockButtons.propTypes = {
    handleSwitch: PropTypes.func,
    handleReset: PropTypes.func,
};

export default ClockButtons;
