export const generateVPSName = (prefix = "DESKTOP") => {

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomSegment = Array.from({ length: 4 }, () => {
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
    return `${randomLetter}${randomNumber}`;
  }).join("");
  
  return `${prefix}-${randomSegment}`;
}

export const generateRandomIP = () =>
  `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;

export const generateRandomPort = () =>
  Math.floor(Math.random() * (65535 - 1024) + 1024).toString();

export const generateRandomPassword = () =>
  Math.random().toString(36).slice(-10);

export const generateRandomOS = () => {
  const osList = ["Ubuntu", "Windows Server", "Debian", "CentOS", "Fedora"];
  return osList[Math.floor(Math.random() * osList.length)];
};

export const generateRandomLocation = () => {
  const locations = ["USA", "Germany", "France", "UK", "Canada", "Netherlands"];
  return locations[Math.floor(Math.random() * locations.length)];
};