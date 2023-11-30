import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';
const addedMsgTimeouts = {};

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;
updateCartQuantity();

function updateCartQuantity(){
  //计算购物车总数
  let cartQuantity =  calculateCartQuantity();

  //更新显示的购物车数量
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function showAdded(productId){
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('show');

  //如果直接删除的前一个ID可能是别的按钮
  const previousTimeoutId = addedMsgTimeouts[productId];
  if(previousTimeoutId){
    clearTimeout(previousTimeoutId);
  }

  const timeOutId = setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('show');
  },2000);
  addedMsgTimeouts[productId] = timeOutId;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      //获取添加的data属性值
      const productId = button.dataset.productId;
      
      addToCart(productId);

      updateCartQuantity();
      
      showAdded(productId);
    });
  });