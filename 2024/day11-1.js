rawData = "4 4841539 66 5279 49207 134 609568 0";

data = rawData.trim().split(" ").map(Number);
console.log(data);

function doBlink(arr) {
  let newArr = [];
  for (s of arr) {
    if (s === 0) {
      newArr.push(1);
      continue;
    }
    if (String(s).length % 2 === 0) {
      len = String(s).length / 2;
      let slice = (pos) =>
        Number(
          String(s)
            .split("")
            .slice(pos, pos + len)
            .join("")
        );

      newArr.push(slice(0));
      newArr.push(slice(len));

      continue;
    }
    newArr.push(s * 2024);
  }
  return newArr;
}

blinks = 25;
i = 0;
start = new Date().getTime();
while (i < blinks) {
  console.log(i);
  
  data = doBlink(data);
  i++;
}

end = new Date().getTime();
console.log(data, data.length);
console.log("Time: ", (end - start) / 1000, "s");
