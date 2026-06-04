export const alphabet = "abcdefghijklmnopqrstuvwxyz";

export function randomAlpha(length = 4): string {
  return Array.from(
    { length },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join("");
}

export function randomNumeric(min = 1000, max = 9999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPassword(prefix = "Secure!Password"): string {
  return `${prefix}${randomNumeric()}`;
}

export function randomName(prefix = "Test", length = 4): string {
  return `${prefix}${randomAlpha(length)}`;
}
