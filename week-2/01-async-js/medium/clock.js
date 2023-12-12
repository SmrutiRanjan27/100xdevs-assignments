const counter = new Date();

const formatTime = (time, format = 24) => {
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  if (format == 24) {
    return hour + ":" + minute + "::" + second;
  } else if (format == 12) {
    return (
      parseInt(hour % 12) +
      ":" +
      minute +
      "::" +
      second +
      (hour < 12 ? " AM" : " PM")
    );
  } else {
    return `${format} is not a valid format it should be one of 12 or 24.`;
  }
};

setInterval(() => {
  let currentTime = new Date();
  console.log(formatTime(currentTime));
  console.log(formatTime(currentTime, 12));
}, 1000);
