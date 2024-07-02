export const formatDateYMD = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateMD = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}-${day}`;
};

export const formatTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds} S`;
  } else {
    const minutes = Math.floor(seconds / 60);
    if (seconds % 60 === 0) {
      return `${minutes} MIN`;
    } else {
      return `${minutes + 1} MIN`; // Round up if not an exact minute
    }
  }
};
