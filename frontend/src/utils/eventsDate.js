function formatDateToReadable(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}

export default formatDateToReadable;
