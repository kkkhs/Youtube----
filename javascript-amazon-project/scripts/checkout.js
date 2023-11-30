import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingProduct;

  //利用id匹配product
  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  cartSummaryHTML += 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input">
          <span class="link-primary save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
          
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
updateCheckOutQuantity();

//删除link
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    //从界面移除HTML
    container.remove();
    updateCheckOutQuantity();
  });
});

//update-link
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
    //显示输入框和Save, 隐去Update
    container.querySelector('.quantity-input').classList.add('is-editing-quantity');
    container.querySelector('.save-quantity-link').classList.add('is-editing-quantity');
    container.querySelector('.js-update-link').classList.add('is-not-editing');

    updateCheckOutQuantity();
  });
});

//Save-link
document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    const newQuantity = Number(container.querySelector('.quantity-input').value);
    if(typeof newQuantity ==='number' && newQuantity > 0 && newQuantity < 1000){
      updateQuantity(productId, newQuantity);
      //更新Quantity
      container.querySelector('.quantity-label').innerHTML = newQuantity;
    } 
    
    //隐藏输入框和Save, 显示Update
    container.querySelector('.quantity-input').classList.remove('is-editing-quantity');
    container.querySelector('.save-quantity-link').classList.remove('is-editing-quantity');
    container.querySelector('.js-update-link').classList.remove('is-not-editing');

    container.querySelector('.quantity-input').innerHTML = '';
    updateCheckOutQuantity();
  });
});

//刷新顶部checkOut数量
function updateCheckOutQuantity(){
  //计算购物车总数
  let cartQuantity =  calculateCartQuantity();

  //更新显示的checkOut数量
  document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity} items`;
};
