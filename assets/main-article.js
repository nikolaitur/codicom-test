const productItems = document.querySelectorAll("[data-product-sku]");
if (productItems) {
  for (i = 0; i < productItems.length; i++) {
    const sku = productItems[i].dataset.productSku;
    var productItem = productItems[i];
    fetch(`/search?q=${sku}&view=by-sku`)
      .then((response) => response.json())
      .then((result) => {
        if (!result.items?.length) return;
        const resultItem = result.items[0];
        productItem.innerHTML = `
        <a href="${resultItem.url}" class="product-item__image">
          <img src="${resultItem.image}" alt="product image">
        </a>
        <div class="product-item__title">${resultItem.title}</div>
        <div class="product-item__price">${resultItem.price}</div>
        <product-form>
          <form action="/cart/add">
            <input name="id" value="${resultItem.variantId}" hidden>
            <button type="submit" class="btn-quick-add">
              <span class="plus-icon">IN DEN WARENKORB</span>
              <div class="loading-overlay__spinner hidden">
                <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                </svg>
              </div></button>
            </button>
          </form>
        </product-form>`;
      });
  }
}
