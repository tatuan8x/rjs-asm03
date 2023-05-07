// hàm lưu vào storage
export function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// hàm lấy storage
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
