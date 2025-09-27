"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function useCountdown(targetTimeISO: string) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [localTargetTime, setLocalTargetTime] = useState<string>("");

  useEffect(() => {
    // Force-append 'Z' if missing to ensure UTC parsing
    let parsedTargetTimeISO = targetTimeISO;
    if (!parsedTargetTimeISO.endsWith("Z")) {
      parsedTargetTimeISO += "Z";
    }

    // Validate targetTimeISO
    const targetUTC = Date.parse(parsedTargetTimeISO);
    if (isNaN(targetUTC)) {
      console.error("Invalid targetTimeISO:", targetTimeISO);
      setTimeLeft("Invalid Date");
      setIsExpired(true);
      setLocalTargetTime("Invalid Date");
      return;
    }

    // Convert UTC to local time (Asia/Colombo)
    const targetDate = new Date(targetUTC);
    const localTime = targetDate.toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    // Parse toLocaleString output (e.g., "08/30/2025, 07:20:45 AM")
    const [datePart, timePart] = localTime.split(", ");
    const [month, day, year] = datePart.split("/");
    const [time, period] = timePart.split(" ");
    const [hour, minute, second] = time.split(":");
    const hour24 =
      period === "PM" && +hour !== 12
        ? +hour + 12
        : period === "AM" && +hour === 12
        ? 0
        : +hour;
    const localDate = new Date(
      +year,
      +month - 1,
      +day,
      hour24,
      +minute,
      +second
    );
    const formattedLocalTime = format(localDate, "MM/dd/yyyy, h:mm:ss a");
    setLocalTargetTime(formattedLocalTime);

    let interval: NodeJS.Timeout | null = null;

    const updateCountdown = () => {
      const nowUTC = Date.now();
      const distance = targetUTC - nowUTC;

      if (distance <= 0) {
        setTimeLeft("00h : 00m : 00s");
        setIsExpired(true);
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(
          2,
          "0"
        )}m : ${String(seconds).padStart(2, "0")}s`
      );
      setIsExpired(false);
    };

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [targetTimeISO]);

  return { timeLeft, isExpired, localTargetTime };
}

export { useCountdown };
