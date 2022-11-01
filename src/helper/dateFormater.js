export const formatDate = (d) => {
  const date = new Date(d);
  const today = new Date();

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  let day = dayFormat(new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date));
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", hourCycle: "h23" }).format(date);

  const finalDate = dayName + " " + month + " " + day + ", " + year + ", " + time;

  return finalDate;
};

const dayFormat = function (d) {
  if (d > 3 && d < 21) return d + "th";
  switch (d % 10) {
    case 1:
      return d + "st";
    case 2:
      return d + "nd";
    case 3:
      return d + "rd";
    default:
      return d + "th";
  }
};
