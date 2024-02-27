import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    clockSelector,
    changeSwitch,
    changePeriod,
    changeTimeLeft,
    reset,
} from "./features/clock/clockSlice";
import { PERIOD } from "./features/clock/constants";

import Header from "./features/clock/Header";
import ClockSetting from "./features/clock/ClockSetting";
import ClockDisplay from "./features/clock/ClockDisplay";
import ClockButtons from "./features/clock/ClockButtons";
import Footer from "./features/clock/Footer";
import alarm from "./assets/alarm.mp3";

const App = () => {
    const clock = useSelector(clockSelector);
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const intervalRef = useRef(null);

    // 取得剩餘時間
    const timeSplit = clock.timeLeft.split(":");
    let minuteLeft = Number(timeSplit[0]);
    let secondLeft = Number(timeSplit[1]);

    // 處理倒數
    const countDown = () => {
        // 階段結束 => 鈴響、改階段
        if (minuteLeft === 0 && secondLeft === 0) {
            minuteLeft =
                clock.period === PERIOD.SESSION
                    ? Number(clock.breakLength)
                    : Number(clock.sessionLength);
            secondLeft = 0;
            dispatch(changePeriod());

            // 正常倒數
        } else {
            if (secondLeft === 0) {
                secondLeft = 59;
                minuteLeft -= 1;
            } else {
                secondLeft -= 1;
            }

            // 0秒響鈴
            if (minuteLeft === 0 && secondLeft === 0) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        }

        // 更新 timeLeft
        const timeLeft = `${minuteLeft.toString().padStart(2, "0")}:${secondLeft
            .toString()
            .padStart(2, "0")}`;

        dispatch(changeTimeLeft(timeLeft));
    };

    // start or pause button
    const handleSwitch = () => {
        // if 正在倒數 => 停止
        if (clock.isRunning) {
            clearInterval(intervalRef.current);
            dispatch(changeSwitch());
            return;
        }

        // 開始倒數
        dispatch(changeSwitch());
        intervalRef.current = setInterval(countDown, 1000);
    };

    // reset button
    const handleReset = () => {
        // 停止鈴響
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // 停止倒數
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // 全部reset
        dispatch(reset());
    };

    // TODO:beep file
    return (
        <div className="clock w-full max-w-lg">
            <Header />
            <main>
                <ClockSetting />
                <ClockDisplay />
                <ClockButtons
                    handleSwitch={handleSwitch}
                    handleReset={handleReset}
                />
                <audio id="beep" ref={audioRef} src={alarm}></audio>
            </main>
            <Footer />
        </div>
    );
};

export default App;
