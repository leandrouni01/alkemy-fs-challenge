export const capitalize = (data) => {
  return typeof data === "string" && data.length > 0 ? data.charAt(0).toUpperCase() + data.slice(1) : data;
}