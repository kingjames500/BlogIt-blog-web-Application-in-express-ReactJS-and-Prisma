function eventDatesOnToast() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const now = new Date();
  return now.toLocaleString("en-US", options);
}

export default eventDatesOnToast;
