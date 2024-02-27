import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { PERIOD } from "./constants";
import {
    clockSelector,
    decrementSession,
    incrementSession,
    decrementBreak,
    incrementBreak,
} from "./clockSlice";

const Setting = ({ label }) => {
    const clock = useSelector(clockSelector);
    const dispatch = useDispatch();
    const labelLow = label.toLowerCase();

    // 根據label判斷類別
    const handleDecrement = () => {
        if (label === PERIOD.SESSION) {
            return dispatch(decrementSession());
        }
        return dispatch(decrementBreak());
    };

    // 根據label判斷類別
    const handleIncrement = () => {
        if (label === PERIOD.SESSION) {
            return dispatch(incrementSession());
        }
        return dispatch(incrementBreak());
    };

    return (
        <div className="setting__block w-1/2 min-w-[240px] flex flex-col items-center gap-2">
            <h2 id={`${labelLow}-label`}>{`${label} Length`}</h2>
            <div className="w-1/2 grid grid-cols-3">
                <button id={`${labelLow}-decrement`} onClick={handleDecrement}>
                    <i className="fa-solid fa-minus"></i>
                </button>
                <p
                    id={`${labelLow}-length`}
                    className="grid place-content-center text-2xl"
                >
                    {label === PERIOD.SESSION
                        ? clock.sessionLength
                        : clock.breakLength}
                </p>
                <button id={`${labelLow}-increment`} onClick={handleIncrement}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
};

Setting.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Setting;
