const getTestInput = function(exampleArrayData = null, countExamples = 5) {
  var ret = [];
  ret.push(undefined);
  ret.push(null);
  ret.push(true);
  ret.push(false);
  ret.push('undefined');
  ret.push('');
  ret.push(-0);
  ret.push([]);
  ret.push({});
  ret.push(Array(5));
  ret.push(Array(5).fill(null));

  //if exampleArrayData is not null array, insert many examples
  if (exampleArrayData !== null && isArray(exampleArrayData)) {
    if (isNaN(countExamples)) {
      countExamples = 5;
    }
    i = 0;
    let pushRandomExample;
    do {
      pushRandomExample = exampleArrayData[
        Math.floor(
          Math.random() * exampleArrayData.length
        )
      ];
      if (ret.indexOf(pushRandomExample) !== -1) {
        i++;
      }
    } while (i < countExamples);
  }

  //add random strings
  let randomStr;
  do {
    randomStr = Math.random().toString(36).slice(2);
  } while (ret.indexOf(randomStr) === -1);

  //add converted to string all existings examples if is not string
  let newExamples = [];
  if (i in ret) {
    if (ret.hasOwnProperty(i)) {
      if (!isString(ret[i])) {
        newExamples.push(toString(ret[i]));
      }
    }
  }
  ret = ret.concat(newExamples);

  return ret;
}

export default getTestInput;
