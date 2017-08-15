function numPY(s){
  var base = s.toLowerCase();
  var pCount = 0, yCount = 0;

  for(var i = 0 ; i <base.length; i++){
    if(base.charAt(i) === 'p'){
      pCount++;
    }else if(base.charAt(i) === 'y'){
      yCount++;
    }
  }

  return pCount === yCount;
}

function regPY(s){
  return s.match(/p/ig).length === s.match(/y/ig).length;
}

console.log(numPY('pPooyY'));
console.log(numPY('Pyy'));

console.log(regPY('pPooyY'));
console.log(regPY('Pyy'));
