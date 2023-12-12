let initTime = new Date().getTime();
let counter = 0;
while (true) {
  let newTime = new Date().getTime();
  if (newTime - initTime >= 1000) {
    console.log(counter);
    counter += 1;
    initTime = newTime;
  }
}
