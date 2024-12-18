import { createStore } from "redux";
import { products } from "./products.js";
import { addToCart, REMOVE_FROM_CART } from "./actions.js";
import { cartReducer } from "./cartReducer.js";

const productsParentContainerEl = document.querySelector("#productsContainer");
const cartContainerEl = document.querySelector("#cartContainer");

const store = createStore(cartReducer);

store.subscribe(() => {
  const productsInCart = store.getState().products;
  renderCart(productsInCart, store.getState().cartTotal);
});

const renderProducts = () => {
  const productContainer = document.createElement("div");
  productContainer.className = "row row-cols-3 g-4";
  products.map((product) => {
    const div = document.createElement("div");
    div.className = "col";
    div.appendChild(productCard(product));
    productContainer.appendChild(div);
  });
  productsParentContainerEl.appendChild(productContainer);
};

const addProductHandler = (product) => {
  store.dispatch(addToCart(product));
};

const productCard = (product) => {
  const productCard = document.createElement("div");
  productCard.className = "card text-center bg-light";
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const productName = document.createElement("h5");
  productName.className = "card-title";
  productName.textContent = product.name;
  const productPrice = document.createElement("p");
  productPrice.className = "card-text";
  productPrice.innerHTML = `<small>Rs.${product.price}</small>`;
  const addToCartBtn = document.createElement("button");
  addToCartBtn.className = "btn btn-sm btn-outline-primary";
  addToCartBtn.textContent = "Add To Cart";
  addToCartBtn.onclick = () => addProductHandler(product);
  cardBody.appendChild(productName);
  cardBody.append(productPrice);
  cardBody.appendChild(addToCartBtn);
  productCard.appendChild(cardBody);
  return productCard;
};

window.removeFromCartHandler = (product) => {
  store.dispatch({
    type: REMOVE_FROM_CART,
    payload: product,
  });
};

const cartProductCard = (product) => {
  const productCard = document.createElement("div");
  productCard.className = "p-3 d-flex justify-content-between";
  productCard.innerHTML = `
    <div>
      <p>${product.product.name}
      <br/>
      <span><small>Rs. ${product.product.price}</small></span>
      </p>
    </div>
    <div>
    <p class="border border-1 px-2 rounded-2"><small>${product.quantity}</small></p>
    </div>
    <div>
      <a class="btn btn-sm text-danger"><small>Remove<small></a>
    </div>
  `;
  const removeButton = productCard.querySelector("a");
  removeButton.addEventListener("click", () => removeFromCartHandler(product));
  cartContainerEl.appendChild(productCard);
};

const renderProductsInCart = (products) => {
  cartContainerEl.textContent = "";
  Object.keys(products).map((key) => {
    cartProductCard(products[key]);
  });
};

const renderCartTotal = (cartTotal) => {
  const cartTotalEL = document.createElement("p");
  if (cartTotal > 0) {
    cartTotalEL.innerHTML = `<hr/><strong>Total: </strong>Rs. ${cartTotal}`;
  } else {
    cartTotalEL.textContent = "";
  }
  cartContainerEl.appendChild(cartTotalEL);
};

const renderCart = (products, cartTotal) => {
  renderProductsInCart(products);
  renderCartTotal(cartTotal);
};

renderProducts();
