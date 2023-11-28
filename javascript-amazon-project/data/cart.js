export const cart = [];

export function addToCart(productId){
  let matchingItem;

  //检验购物车中是否存在
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })

  if(matchingItem){
    matchingItem.quantity ++;
  }else{
    cart.push({
      productId: productId,
      quantity: 1
    })
  }
}