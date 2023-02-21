import { useEffect, useState } from "react";

function Clock(): JSX.Element {

    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timerId = setInterval(()=> setTime(new Date().toLocaleTimeString()), 1000);

        return () => clearInterval(timerId);
    },[])

    return (
        <div className="Clock">
			<span>Time: {time}</span>
        </div>
    );
}

export default Clock;
