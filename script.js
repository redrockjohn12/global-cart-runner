const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});


document.querySelectorAll("#navLinks a").forEach(link => {

  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });

});


const price = document.getElementById("price");
const shipping = document.getElementById("shipping");
const quantity = document.getElementById("quantity");


function money(number) {

  return Number(number || 0).toFixed(2);

}


function calculateQuote() {

  const itemPrice = Number(price.value || 0);

  const qty = Number(quantity.value || 1);

  const shippingFee = Number(shipping.value || 0);

  const subtotal = itemPrice * qty;

  const runnerFee = subtotal * 0.30;

  const total = subtotal + runnerFee + shippingFee;


  document.getElementById("subtotal").textContent =
    money(subtotal);

  document.getElementById("runnerFee").textContent =
    money(runnerFee);

  document.getElementById("shippingOut").textContent =
    money(shippingFee);

  document.getElementById("total").textContent =
    money(total);

}


price.addEventListener("input", calculateQuote);

shipping.addEventListener("input", calculateQuote);

quantity.addEventListener("input", calculateQuote);

calculateQuote();


document
  .getElementById("quoteForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      document.getElementById("name").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const store =
      document.getElementById("store").value;

    const product =
      document.getElementById("product").value.trim();

    const link =
      document.getElementById("link").value.trim();

    const qty =
      Number(document.getElementById("quantity").value || 1);

    const itemPrice =
      Number(document.getElementById("price").value || 0);

    const shippingFee =
      Number(document.getElementById("shipping").value || 0);

    const delivery =
      document.getElementById("delivery").value;

    const notes =
      document.getElementById("notes").value.trim();


    const subtotal =
      itemPrice * qty;

    const runnerFee =
      subtotal * 0.30;

    const total =
      subtotal + runnerFee + shippingFee;


    const message =

`GLOBAL CART RUNNER
QUOTE REQUEST

Customer Name:
${name}

Customer WhatsApp:
${phone}

Store:
${store}

Product:
${product}

Product Link:
${link || "Not provided"}

Quantity:
${qty}

Item Subtotal:
${money(subtotal)}

Runner Fee (30%):
${money(runnerFee)}

Shipping:
${money(shippingFee)}

Estimated Total:
${money(total)}

Delivery Preference:
${delivery}

Additional Notes:
${notes || "None"}

Please confirm the final quote and next steps.`;


    const whatsappURL =
      "https://wa.me/26876786258?text=" +
      encodeURIComponent(message);


    window.open(
      whatsappURL,
      "_blank"
    );

});
