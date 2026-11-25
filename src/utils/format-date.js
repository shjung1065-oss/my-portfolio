/**
 * ISO 날짜 문자열을 'YYYY.MM.DD' 형태로 바꿉니다.
 * @param {string} value - ISO 날짜 문자열
 * @returns {string}
 */
export function formatDate(value) {
  const date = new Date(value);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}.${month}.${day}`;
}
