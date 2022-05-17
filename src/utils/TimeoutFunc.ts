export default function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function sleep(fn, ...args) {
  await timeout(5000);
  return fn(...args);
}
