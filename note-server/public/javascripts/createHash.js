// 生成随机hash值
module.exports = function createHash (hashLength) {
  if (!hashLength || typeof(Number(hashLength)) != 'number') {return;}
  let ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let hs = [];
  let hl = Number(hashLength);
  let al = ar.length;
  for (let i = 0; i < hl; i ++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
}