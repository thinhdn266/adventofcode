rawData = "4 4841539 66 5279 49207 134 609568 0";

data = rawData.trim().split(" ").map(Number);
console.log(data);
memo = {0:1};

total = 0;
blinks = 25;
start = new Date().getTime();

function doBlink(s, i) {
  if (i >= blinks) return;
  if (memo[s]) {
    if (Array.isArray(memo[s])) {
      doBlink(memo[s][0], i + 1);
      doBlink(memo[s][1], i + 1);
      console.log("+", memo[s]);
      total += 1;
    } else {
      doBlink(memo[s], i + 1);
    }
    return;
  }

  let str = String(s);
  if (str.length % 2 === 0) {
    let len = str.length / 2;

    let p1 = Number(str.substring(0, len));
    let p2 = Number(str.substring(len, len + len));
    memo[s] = [p1, p2];
    doBlink(p1, i + 1);
    doBlink(p2, i + 1);
    total += 1;
    return;
  }
  memo[s] = s * 2024;
  doBlink(s * 2024, i + 1);
}

for (let d = 0; d < data.length; d++) {
  doBlink(data[d], 0);
}

end = new Date().getTime();
console.log(total + data.length);
console.log("Time: ", (end - start) / 1000, "s");
