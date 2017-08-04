
function bestCharge(selectedItems) {
  let foods=countForFoods(selectedItems);
  let originalsummary=originalSummary(foods);
  let ishalfprice=isHalfPrice(originalsummary);
  let choiceforbest=choice(ishalfprice);
  let lastsummary=lastSummary(choiceforbest);
return printReceipt(lastsummary) ;
}

var countForFoods=function (tags) {
  var foods=[];
  var count;
  for (let element of tags) {
    let [id, countString] = element.split('x');
    count=parseInt(countString);
    foods.push({id:id,count:count});
  }
  return foods;
}

var originalSummary=function(foods){
  var summary=0;
  var allItems=loadAllItems();
  var afterOriginalSummary={};
  for(let elementInput of foods){
    for(let elementItems of allItems){
      if(elementInput.id===elementItems.id){
        elementInput.name=elementItems.name;
        elementInput.price=elementItems.price;
        summary+=elementInput.price*elementInput.count;
        break;
      }
    }
  }
 afterOriginalSummary.foods=foods;
  afterOriginalSummary.summary=summary;
  return afterOriginalSummary;
}

var isHalfPrice=function (afterOriginalSummary) {
  var afterHalfPrice=afterOriginalSummary;

  for(let elementInput of afterHalfPrice.foods){
  for(let elementPromotions of loadPromotions()[1].items){
    if(elementInput.id===elementPromotions){
     afterHalfPrice.halfPrice+=elementInput.price/2;
      /*input.halfName+=elementPromotions.name*/
      /*input.choiceCode=2;*/
      break;
    }
  }
 }
  return afterHalfPrice;
}

var choice=function (afterHalfPrice) {
var afterChoice=afterHalfPrice;
  if(afterChoice.summary>=30){
    if('halfPrice' in afterChoice) {
      if (afterChoice.halfPrice <= 6) {
        afterChoice.choiceCode = 1;
      } else afterChoice.choiceCode = 2;
    }else{afterChoice.choiceCode = 1;}
  }else{
    if(afterChoice.halfPrice in afterChoice) {
      afterChoice.choiceCode=2;
    }else afterChoice.choiceCode=0;

  }
return afterChoice;
}

var lastSummary=function (afterChoice) {
  var afterLastSummary=afterChoice;
  if(afterLastSummary.choiceCode==1){
  afterLastSummary.summary-=6;
  }
  if(afterLastSummary.choiceCode==2){
    afterLastSummary.summary-=afterLastSummary.halfPrice;
  }
return afterLastSummary;
}

var printReceipt=function(afterLastSummary){

  var receipt='\n============= 订餐明细 =============\n';
  var promotions='';
  for(let element of afterLastSummary.foods){
    receipt+=element.name+' x '+element.count+'= '+element.count*element.price+'元'+'\n';
  }
  receipt+='-----------------------------------\n';
  if(afterLastSummary.choiceCode==1){
   promotions='使用优惠:\n满30减6元，省6元\n';
  }
  if(afterLastSummary.choiceCode==2){
    promotions='使用优惠:\n指定菜品半价(黄焖鸡，凉皮)，省'+afterLastSummary.halfPrice+'元\n-----------------------------------\n总计：'
  }
  receipt+=promotions;
  receipt+=afterLastSummary.summary;
  receipt+='元\n===================================';
  return receipt;
}
