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

function formatDateToShort(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}

export default { eventDatesOnToast, formatDateToShort };
