document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = this.name.value;
      const email = this.email.value;
      const message = this.message.value;

      if (name && email && message) {
        alert(`Thanks, ${name}! We’ll be in touch soon.`);
        this.reset();
      } else {
        alert("Please fill out all fields.");
      }
    });
  }

  // PayPal Button Setup
  if (typeof paypal !== "undefined") {
    document.querySelectorAll(".paypal-button").forEach((el) => {
      const amount = el.getAttribute("data-price");

      paypal.Buttons({
        style: {
          layout: 'horizontal',
          color: 'silver',
          shape: 'pill',
          label: 'pay',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Payment complete! Thank you, ' + details.payer.name.given_name + '.');
          });
        }
      }).render(el);
    });
  }
});
