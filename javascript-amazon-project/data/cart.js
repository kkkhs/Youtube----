export let cart = JSON.parse(localStorage.getItem('cart'))
||
[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
  deliveryOptionId: '1'
},{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2'
}];

//本地存储
export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

  //检验购物车中是否存在
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity ++;
  }else{
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
};

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  //更新新的购物车
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity(){
  //计算购物车总数
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });
  
  saveToStorage();
}