const counter = (num) => {
  return num + 1;
};

let num = 0;
setInterval(() => {
  num = counter(num);
  console.log(num);
}, 1000);
