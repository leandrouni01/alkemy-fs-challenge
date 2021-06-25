export const capitalize = (data) => {
  return typeof data === "string" && data.length > 0 ? data.charAt(0).toUpperCase() + data.slice(1) : data;
}

export const cleanDate = (date) => {
  return date && typeof date === "string" ? date.split('T')[0] : date;
}

export const getCurrentDate = () => {
  const d = new Date()

  return [
    d.getFullYear(),
    d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1),
    d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()].join('-');
}