import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId); 

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += 
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

      //判断当前deliveryOption.id是否是当前cartItem.deliveryOptionId
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += 
      `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    })

    return html;
  }

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

      renderPaymentSummary();
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
        //更新
        renderPaymentSummary();
        renderOrderSummary();
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


  //Delivery Options
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      //更新
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

}