const shangye_map = {
  1: 1,
  2: 1.05,
  3: 1.1,
  4: 1.15,
  5: 1.2,
};
const kaifa_map = {
  1: 1.1,
  2: 1.15,
  3: 1.2,
  4: 1.25,
  5: 1.3,
};
const guanli_map = {
  1: 1.2,
  2: 1.25,
  3: 1.3,
  4: 1.35,
  5: 1.4,
};
export default (val) => {
  const type = [
    guanli_map[val.star_value1],
    kaifa_map[val.star_value2],
    shangye_map[val.star_value3],
  ];
  let score_arr = [];
  for (let i = 0; i < val.number; i++) {
    score_arr[i] = 0;
  }
  score_arr = score_arr.slice(0, val.number);
  score_arr[val.danxuan_value1] += 3 * type[1];
  score_arr[val.danxuan_value2] += 3 * type[1];
  score_arr[val.danxuan_value3] += 3 * type[2];
  val.check_value1.forEach((ele) => { score_arr[ele] += (3 / val.check_value1.length) * type[1]; });
  val.check_value2.forEach((ele) => { score_arr[ele] += (3 / val.check_value2.length) * type[0]; });
  val.check_value3.forEach((ele) => { score_arr[ele] += (3 / val.check_value3.length) * type[0]; });
  val.check_value4.forEach((ele) => { score_arr[ele] += (3 / val.check_value4.length) * type[2]; });
  val.check_value5.forEach((ele) => { score_arr[ele] += (3 / val.check_value5.length) * type[0]; });
  val.check_value6.forEach((ele) => { score_arr[ele] += (3 / val.check_value6.length) * type[1]; });
  val.check_value7.forEach((ele) => { score_arr[ele] += (3 / val.check_value7.length) * type[2]; });
  val.check_value8.forEach((ele) => { score_arr[ele] += (3 / val.check_value8.length) * type[2]; });
  val.check_value9.forEach((ele) => { score_arr[ele] += (3 / val.check_value9.length) * type[1]; });
  val.check_valueA.forEach((ele) => { score_arr[ele] += (3 / val.check_valueA.length) * type[0]; });
  val.check_valueB.forEach((ele) => { score_arr[ele] += (3 / val.check_valueB.length) * type[2]; });
  val.check_valueC.forEach((ele) => { score_arr[ele] += (3 / val.check_valueC.length) * type[2]; });
  val.check_valueD.forEach((ele) => { score_arr[ele] -= (3 / val.check_valueD.length) * type[0]; });
  console.log('cal score arr', isNaN(score_arr[3]));
  return score_arr.filter(ele => !isNaN(ele)).map((ele) => {
    return ele > 0 ? ele : 0;
  });
};
