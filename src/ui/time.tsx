import { count } from "./helpers/plural";

// Constants in milliseconds
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

// Format is day/month/year
export const formatDate = ({
  timestamp,
}: {
  timestamp: number; // In milliseconds
}) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  // CAUTION: getMonth is 0-indexed
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return (
    <span>
      {day}
      {day === 1 ? <sup>er</sup> : undefined} {month} {year}
    </span>
  );
};

export const formatDurationInDays = ({
  duration,
}: {
  duration: number; // In days
}) => {
  if (!duration) {
    return "aujourd'hui";
  }

  return `il y a ${count(duration, "jour")}`;
};
