let count = 0;

export function randomUUID() {
  const n = count.toString().padStart(12, "0");
  count++;

  return `bb679230-9ee8-4e7d-a08e-${n}`;
}
