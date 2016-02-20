var BigNumber = function(n){
  this.value = n.toString();

  this.getValue = function(){
    return this.value;
  }

  this.getRealValue = function(){
    return Number(this.value);
  }

  this.add = function(bnum){

    return new BigNumber(Number(this.getValue()) + Number(bnum.getValue()));
  }
}

Number.prototype.getValue = function (arguments) {
  return new BigNumber(this);
}
