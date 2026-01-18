import { useEffect, useState } from "react";

const Time = () => {
  const getPHTime = () =>
    new Date().toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const [currentTime, setCurrentTime] = useState(getPHTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getPHTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-base">
      {currentTime}
    </span>
  );
};
export default Time;
