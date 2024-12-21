function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // Lấy từng phần của ngày giờ
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Ghép thành chuỗi đã format
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export { formatDateTime };
