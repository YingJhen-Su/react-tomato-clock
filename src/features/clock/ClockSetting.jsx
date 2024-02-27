import { PERIOD } from "./constants";
import Setting from "./Setting";

const ClockSetting = () => {
    return (
        <section className="clock__setting flex flex-col-reverse items-center sm:flex-row sm:justify-between gap-2">
            <Setting label={PERIOD.BREAK} />
            <Setting label={PERIOD.SESSION} />
        </section>
    );
};

export default ClockSetting;
