function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await delay(1000);
  console.log("Прошла 1 секунда");

  await delay(2000);
  console.log("Прошло ещё 2 секунды");
}

module.exports = run