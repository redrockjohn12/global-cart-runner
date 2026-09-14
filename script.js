// Global Cart Runner
// Website functionality

document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE MENU */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
            });

        });

    }


    /* CURRENT YEAR */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ORDER TRACKING */

    const trackButton = document.getElementById("trackButton");
    const trackingNumber = document.getElementById("trackingNumber");
    const trackingResult = document.getElementById("trackingResult");


    // Demo tracking records.
    // The owner can add/update orders through the Order Manager
    // version of the website later when a real online database is added.

    const demoOrders = {

        "GCR-1001": {
            orderNumber: "GCR-1001",
            status: "Order Received",
            payment: "Pending",
            delivery: "Standard Delivery",
            lastUpdate: "Order received"
        }

    };


    function cleanOrderNumber(value) {

        return value
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");

    }


    function showOrder(order) {

        trackingResult.innerHTML = `
            <div class="order-result">

                <div class="order-result-header">

                    <h3>
                        ${escapeHtml(order.orderNumber)}
                    </h3>

                    <p>
                        Global Cart Runner Order
                    </p>

                </div>

                <div class="order-info">

                    <div class="order-info-row">
                        <span>Status</span>

                        <strong>
                            <span class="status-pill">
                                ${escapeHtml(order.status)}
                            </span>
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Payment</span>
                        <strong>
                            ${escapeHtml(order.payment || "Pending")}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Delivery</span>
                        <strong>
                            ${escapeHtml(order.delivery || "Standard Delivery")}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Last Update</span>
                        <strong>
                            ${escapeHtml(order.lastUpdate || "Awaiting update")}
                        </strong>
                    </div>

                </div>

            </div>
        `;

    }


    function showError() {

        trackingResult.innerHTML = `
            <div class="tracking-error">

                <strong>Order not found.</strong>

                <p>
                    Please check your GCR order number and try again.
                    If you still need help, contact Global Cart Runner
                    on WhatsApp.
                </p>

                <br>

                <a
                    href="https://wa.me/26876786258"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-primary">
                    Contact Us on WhatsApp
                </a>

            </div>
        `;

    }


    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function trackOrder() {

        const number = cleanOrderNumber(
            trackingNumber.value
        );

        if (!number) {

            trackingResult.innerHTML = `
                <div class="tracking-error">
                    Please enter your GCR order number.
                </div>
            `;

            return;
        }


        /*
         * First check locally stored orders.
         * This keeps compatibility with the previous
         * Tracking V1 system.
         */

        let storedOrders = {};

        try {

            storedOrders =
                JSON.parse(
                    localStorage.getItem("gcrOrders") || "{}"
                );

        } catch (error) {

            storedOrders = {};

        }


        const order =
            storedOrders[number] ||
            demoOrders[number];


        if (order) {

            showOrder(order);

        } else {

            showError();

        }

    }


    if (trackButton) {

        trackButton.addEventListener(
            "click",
            trackOrder
        );

    }


    if (trackingNumber) {

        trackingNumber.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    trackOrder();
                }

            }
        );

    }

});
