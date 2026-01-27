export function formatPhoneNumber(value: string): string {
  // Remove all non-digit and non-plus characters
  let cleaned = value.replace(/[^\d+]/g, '');
  
  // If empty, return empty
  if (cleaned.length === 0) {
    return '';
  }
  
  // Ensure it starts with +
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  // Remove the + to work with digits only
  const digits = cleaned.substring(1);
  
  // Apply format: +XX (XX) XXXXX-XXXX
  if (digits.length === 0) {
    return '+';
  } else if (digits.length <= 2) {
    return `+${digits}`;
  } else if (digits.length <= 4) {
    return `+${digits.substring(0, 2)} (${digits.substring(2)}`;
  } else if (digits.length <= 9) {
    return `+${digits.substring(0, 2)} (${digits.substring(2, 4)}) ${digits.substring(4)}`;
  } else {
    return `+${digits.substring(0, 2)} (${digits.substring(2, 4)}) ${digits.substring(4, 9)}-${digits.substring(9, 13)}`;
  }
}
