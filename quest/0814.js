function checkPalindrom(str){
  var base = str;
  
  var baseRe = base.split('');
  baseRe.reverse();
  baseRe = baseRe.join('');
  if(base === baseRe && base.length > 1){
    return true;
  }else{
    return false;
  }
}

console.log(checkPalindrom('dad'));
console.log(checkPalindrom('mom'));
console.log(checkPalindrom('palindrom'));
console.log(checkPalindrom('s'));


function findMinDistance(array){
  var minSearch = new Array();
  var minResult;
  var minFind = new Array();
  var result = new Array();

  for (var i = 0; i < array.length - 1; i++) {
    minSearch.push(array[i+1] - array[i]);
  }

  minResult = Math.min.apply(null, minSearch);

  for (var i = 0; i < array.length - 1; i++) {
    if(minSearch[i] === minResult) minFind.push(i);
  }

  for (var i = 0; i < minFind.length; i++) {
    result.push([array[minFind[i]], array[minFind[i]+1]]);     
  }

  return result; 
}

// 1차원 점의 배열
var array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
console.log(findMinDistance(array)); // [[3, 4], [23, 24]]
