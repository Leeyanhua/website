import React from 'react';

function list2tree(list, pCode, codeTarge, parTarge) {
  // console.log('list');
  var result = list.sort((a, b) => a[parTarge] - b[parTarge]).filter(function(item) { return item[parTarge] === pCode; }).map(function(item) {
    const children = list2tree(list, item[codeTarge], codeTarge, parTarge);
    if (children.length === 0) {
      return item;
    } else {
      item.children = children;
      return item;
    }
  });
  return result;
}

function getParCode(code) {
  const length = code.toString().length;
  let count = 0;
  while (code.substr(count * 2, 2) !== '00' && (count+1)*2 <= length) {
    count += 1;
  }
  let result = code.substr(0, (count - 1) * 2);
  console.log(result);
  const endLength = length - ((count - 1) * 2);
  for (var i = 0; i < endLength; i++) {
    result += '0'
  }

  console.log(result);

  return result;
}

// console.log(getParCode('110100'));
// console.log(getParCode('1231110100'));
// console.log(getParCode('1as101dds000'));

/*
 * 对数据进行筛选返回符合的数据
 * data        @array 被搜索的数据
 * searchValue @string 搜索的内容 数据框中输入的文字
 * searchTarge @array[string,string...] 被搜索列的集
 */
export const SearchData = (data, searchValue, searchTarge) => {
  // 根据筛选信息进行 数据 search filter 匹配
  let userData = data;
  // searchValue 搜索文字 不为空时进行检索
  if (searchValue) {
    userData = data.filter((item) => {
      // 判断搜索范围内 是否存在匹配项
      // search_targe: [ string, string, ... ]
      return !searchTarge.every((target) => {
        // 匹配 是否数据中的 该项 与 目标文字匹配
        if (item[target]) { // 当目标不为 null 进行判断
          return item[target].toString().indexOf(searchValue.toString()) === -1;
        }
        return true;
      });
    });
  }
  return userData;
}

/*
 * 对数据进行筛选返回符合的数据
 * data        @array 被搜索的数据
 * timeStart   @Data 或 moment 开始时间段
 * timeEnd     @Date 或 moment 结束时间段
 * searchTarge @string 被搜索列的集
 */
export const TimeInterval = (data, timeStart, timeEnd, searchTarge) => {
  let result = data;
  if (timeStart && timeEnd) {
    result = data.filter((item) => {
      // 判断搜索范围内 是否存在匹配项
      // search_targe: string
      return moment(item[searchTarge]).isBetween(moment(timeStart), moment(timeEnd))
    });
  }
  return result
}
/*
 * 对数据进行筛选返回符合的数据
 * list        @array 输入的列表数据
 * codeTarge   @string 编码字段名
 */
export const CodeListToTree = (list, codeTarge) => {
  console.log('list in', list);
  let tree = list;
  // let length = 2;
  if (list[0] && list[0][codeTarge]) {
    // length = list[0][codeTarge].toString().length;

    // 判断父级 code
    tree.forEach(item => {
      item.pCode = getParCode(item[codeTarge]);
    });
    console.log('list p_code', list);
    tree.sort((a, b) => a.pCode - b.pCode)
    console.log('list sort', list);
    const tempPCode = tree[0].pCode;
    tree = list2tree(tree, tempPCode, codeTarge, 'pCode')
  }
  return tree
}
/*
 * id p_id 关系 list to tree
 * list        @array 输入的列表数据
 * codeTarge   @string 子 id 字段
 * parTarge    @string 父 id 字段
 */
export const IDListToTree = (list, codeTarge, parTarge) => {
  let tree = list;
  tree.sort((a, b) => a[parTarge] - b[parTarge])
  const tempPCode = tree[0][parTarge];
  return list2tree(tree, tempPCode, codeTarge, parTarge)
};
/*
 * 字符串解析
 * input        @array HTML 字符串
 */
export const htmlDecode = (input) => {
  return (<div dangerouslySetInnerHTML={{__html: input}}></div>)
}

// 桩号转为字符串
export const pileToString = (pile) => {
  if (!pile) return '无桩号信息'
  const arr = pile.toString().split('.');
  let end = '000'
  if (arr[1] && arr[1].length === 2) {
    end = `${arr[1]}0`;
  } else if (arr[1] && arr[1].length === 1) {
    end = `${arr[1]}00`;
  } else if (arr[1] && arr[1].length === 3) {
    end = arr[1];
  }
  return `K${arr[0]}+${end}`;
}

// 数字转为好看的字符串
export const numButty = (num) => {
  let butty = num.toString();
  const cut = butty.split('.');
  const other = cut[1];
  const nums = cut[0].split('').reverse();
  const temp = [];

  nums.forEach((item, index) => {
    if (index%3 === 0 && index !== 0) {
      temp.push(',')
    }
    temp.push(item);
  });
  butty = temp.reverse().join('');
  if (other) butty += other;
  console.log('butty', butty);
  return butty;
}
