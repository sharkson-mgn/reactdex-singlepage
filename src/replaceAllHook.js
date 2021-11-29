const replaceAll = function(str, find, replace) {
  if (typeof String.prototype.replaceAll === 'undefined')
  {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  else {
    return str.replaceAll(find,replace);
  }
}

export default replaceAll;
