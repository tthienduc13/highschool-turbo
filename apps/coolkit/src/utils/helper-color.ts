export const renderColorAnswer = (index: number) => {
  switch (index) {
    case 0:
      return "bg-[#F39C12]";
    case 1:
      return "bg-[#3498DB]";
    case 2:
      return "bg-[#2ECC71]";
    case 3:
      return "bg-[#E74C3C]";
    default:
      return "bg-[#F39C12]";
  }
};

export function getRandomHexColor(): string {
  // Generate a random number between 0 and 0xFFFFFF
  const randomNumber = Math.floor(Math.random() * 0xffffff);
  // Convert the number to a hexadecimal string and pad with leading zeros if needed
  const hexString = randomNumber.toString(16).padStart(6, "0");
  // Return the color in hex format
  return `#${hexString}`;
}
