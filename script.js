// ============================================================
// GLOBAL CART RUNNER
// Website functionality + Order Tracking V2
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------------
    // MOBILE MENU
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // CURRENT YEAR
    // --------------------------------------------------------

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // --------------------------------------------------------
    // ORDER TRACKING V2
    // --------------------------------------------------------

    const trackButton = document.getElementById("trackButton");
    const trackingNumber = document.getElementById("trackingNumber");
    const trackingResult = document.getElementById("trackingResult");


    // --------------------------------------------------------
    // ORDER STATUS SYSTEM
    // --------------------------------------------------------

    const orderStatuses = [
        "Order Received",
        "Payment Pending",
        "Payment Received",
        "Order Placed",
        "Processing",
        "Shipped",
        "Arrived in Eswatini",
        "Out for Delivery",
        "Delivered"
    ];


    // --------------------------------------------------------
    // DEMO ORDER
    // --------------------------------------------------------
    // This allows GCR-1001 to be tested on the live website.
    // Real online database integration can be added later.
    // --------------------------------------------------------

    const demoOrders = {

        "GCR-1001": {
            orderNumber: "GCR-1001",
            customer: "Demo Customer",
            status: "Order Received",
            payment: "Pending",
            delivery: "Standard Delivery",
            lastUpdate: "Order received",
            orderDate: "14 September 2026",
            items: "Shopping order",
            notes: "Your order has been received by Global Cart Runner."
        }

    };


    // --------------------------------------------------------
    // CLEAN ORDER NUMBER
    // --------------------------------------------------------

    function cleanOrderNumber(value) {

        return String(value)
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");

    }


    // --------------------------------------------------------
    // ESCAPE HTML
    // --------------------------------------------------------

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // --------------------------------------------------------
    // GET STATUS NUMBER
    // --------------------------------------------------------

    function getStatusIndex(status) {

        const index = orderStatuses.indexOf(status);

        return index >= 0 ? index : 0;

    }


    // --------------------------------------------------------
    // BUILD PROGRESS TRACKER
    // --------------------------------------------------------

    function buildProgress(status) {

        const currentIndex = getStatusIndex(status);

        return `
            <div class="tracking-progress">

                ${orderStatuses.map((item, index) => {

                    let className = "";

                    if (index < currentIndex) {
                        className = "completed";
                    }

                    if (index === currentIndex) {
                        className = "active";
                    }

                    return `
                        <div class="tracking-step ${className}">

                            <div class="tracking-step-number">
                                ${index + 1}
                            </div>

                            <div class="tracking-step-label">
                                ${escapeHtml(item)}
                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;

    }


    // --------------------------------------------------------
    // SHOW ORDER
    // --------------------------------------------------------

    function showOrder(order) {

        const statusIndex = getStatusIndex(order.status);

        trackingResult.innerHTML = `

            <div class="order-result">

                <div class="order-result-header">

                    <div>
                        <span class="tracking-label">
                            GLOBAL CART RUNNER
                        </span>

                        <h3>
                            ${escapeHtml(order.orderNumber)}
                        </h3>

                        <p>
                            Order Tracking
                        </p>
                    </div>

                    <span class="status-pill">
                        ${escapeHtml(order.status)}
                    </span>

                </div>


                <div class="order-info">

                    <div class="order-info-row">
                        <span>Customer</span>
                        <strong>
                            ${escapeHtml(order.customer || "Customer")}
                        </strong>
                    </div>


                    <div class="order-info-row">
                        <span>Order Date</span>
                        <strong>
                            ${escapeHtml(order.orderDate || "Not available")}
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
                        <span>Items</span>
                        <strong>
                            ${escapeHtml(order.items || "Shopping order")}
                        </strong>
                    </div>


                    <div class="order-info-row">
                        <span>Last Update</span>
                        <strong>
                            ${escapeHtml(order.lastUpdate || "Awaiting update")}
                        </strong>
                    </div>

                </div>


                <div class="tracking-current">

                    <strong>
                        Current Status
                    </strong>

                    <p>
                        ${escapeHtml(
                            order.notes ||
                            "Your order is currently being processed."
                        )}
                    </p>

                </div>


                <div class="tracking-progress-wrapper">

                    <h4>
                        Order Progress
                    </h4>

                    ${buildProgress(order.status)}

                </div>


                <div class="tracking-help">

                    <p>
                        Need help with your order?
                    </p>

                    <a
                        href="https://wa.me/26876786258"
                        target="_blank"
                        rel="noopener"
                        class="btn btn-primary">

                        Contact Us on WhatsApp

                    </a>

                </div>

            </div>

        `;


        // Scroll the result into view on smaller screens.
        setTimeout(() => {

            trackingResult.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 100);

    }


    // --------------------------------------------------------
    // SHOW ERROR
    // --------------------------------------------------------

    function showError() {

        trackingResult.innerHTML = `

            <div class="tracking-error">

                <strong>
                    Order not found
                </strong>

                <p>
                    We could not find that GCR order number.
                    Please check the number and try again.
                </p>

                <p>
                    Your order number should look like:
                    <strong>GCR-1001</strong>
                </p>

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


    // --------------------------------------------------------
    // SHOW EMPTY SEARCH MESSAGE
    // --------------------------------------------------------

    function showEmptyMessage() {

        trackingResult.innerHTML = `

            <div class="tracking-error">

                Please enter your GCR order number.

            </div>

        `;

    }


    // --------------------------------------------------------
    // FIND ORDER
    // --------------------------------------------------------

    function trackOrder() {

        if (!trackingNumber || !trackingResult) {
            return;
        }


        const number = cleanOrderNumber(
            trackingNumber.value
        );


        if (!number) {

            showEmptyMessage();

            return;

        }


        // ----------------------------------------------------
        // CHECK LOCAL ORDERS
        // ----------------------------------------------------

        let storedOrders = {};

        try {

            storedOrders = JSON.parse(
                localStorage.getItem("gcrOrders") || "{}"
            );

        } catch (error) {

            storedOrders = {};

        }


        // ----------------------------------------------------
        // FIND ORDER
        // ----------------------------------------------------

        const order =
            storedOrders[number] ||
            demoOrders[number];


        if (order) {

            showOrder(order);

        } else {

            showError();

        }

    }


    // --------------------------------------------------------
    // TRACK BUTTON
    // --------------------------------------------------------

    if (trackButton) {

        trackButton.addEventListener(
            "click",
            trackOrder
        );

    }


    // --------------------------------------------------------
    // ENTER KEY
    // --------------------------------------------------------

    if (trackingNumber) {

        trackingNumber.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    trackOrder();

                }

            }
        );

    }


    // --------------------------------------------------------
    // AUTO-TEST DEMO ORDER
    // --------------------------------------------------------
    // The customer can type GCR-1001 to test tracking.
    // --------------------------------------------------------

});
