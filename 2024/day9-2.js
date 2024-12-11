rawData = "2333133121414131402";

convertedData = rawData.trim().split("");

id = 0;
isSpace = false;
map = [];
disk = [];

function key(id, count) {
  return `${id}_${count}`;
}

function d(args) {
  return args.join("");
}

for (let n of convertedData) {
  c = isSpace ? "." : id;
  id = isSpace ? id : id + 1;
  disk = disk.concat(Array(parseInt(n)).fill(c));
  map.push(key(c, parseInt(n)));
  isSpace = !isSpace;
}

function createMap(arr) {
  if (arr.length === 0) return [];
  let map = [];
  let id = arr[0];
  let count = 1;
  let i = 1;
  while (i < arr.length) {
    if (arr[i] === id) {
      count += 1;
    } else {
      map.push(key(id, count));
      id = arr[i];
      count = 1;
    }
    i++;
  }
  map.push(key(id, count));
  return map;
}

function replace(leftArr, block) {
  let arr = [...leftArr];
  let [blockId, blockCount] = block.split("_");
  if (blockId === ".") return arr;
  let l = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ".") {
      l = 0;
      continue;
    }
    l++;

    if (l === +blockCount) {
      for (let j = 0; j < blockCount; j++) {
        arr[i - j] = +blockId;
      }
      for (let k = 0; k < blockCount; k++) {
        arr[arr.length - 1 - k] = ".";
      }
      break;
    }
  }
  return arr;
}

function blockToArr(block) {
  let [id, count] = block.split("_");
  return Array(parseInt(count)).fill(id);
}

function resort(disk) {
  let left = [...disk];
  let right = [];
  let block = map[map.length - 1];
  while (left.length > 0) {
    let [id, count] = block.split("_");
    if (+count === 0) {
      continue;
    }

    left = replace(left, block);
    console.log("b", d(left), "|", block);

    right = right.concat(left.slice(-count));
    left = left.slice(0, left.length - count);
    let leftMap = createMap(left);

    block = leftMap[leftMap.length - 1];
    console.log("a", d(left), "|", d(right), "|", block);
  }
  return right.reverse();
}

function mapToDisk(map) {
  let disk = [];
  for (let i = 0; i < map.length; i++) {
    let [id, count] = map[i].split("_");
    disk = disk.concat(Array(parseInt(count)).fill(id));
  }
  return disk.join("");
}

console.log(d(disk));
sortedDisk = resort(disk);

function calculateSum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!+arr[i]) continue;
    total += parseInt(arr[i]) * i;
  }
  return total;
}

console.log(d(sortedDisk));
console.log(calculateSum(sortedDisk));
