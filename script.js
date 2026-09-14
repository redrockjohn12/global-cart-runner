document.addEventListener("DOMContentLoaded", () => {

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

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ========================================================
    // ORDER TRACKING
    // ========================================================

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

    const trackButton = document.getElementById("trackButton");
    const trackingNumber = document.getElementById("trackingNumber");
    const trackingResult = document.getElementById("trackingResult");


    function cleanOrderNumber(value) {
        return String(value || "")
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");
    }


    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function getOrders() {
        try {
            return JSON.parse(
                localStorage.getItem("gcrOrders") || "{}"
            );
        } catch {
            return {};
        }
    }


    function saveOrders(orders) {
        localStorage.setItem(
            "gcrOrders",
            JSON.stringify(orders)
        );
    }


    function getStatusIndex(status) {
        const index = orderStatuses.indexOf(status);
        return index >= 0 ? index : 0;
    }


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


    function showOrder(order) {

        if (!trackingResult) return;

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

                        <p>Order Tracking</p>
                    </div>

                    <span class="status-pill">
                        ${escapeHtml(order.status)}
                    </span>

                </div>


                <div class="order-info">

                    <div class="order-info-row">
                        <span>Customer</span>
                        <strong>
                            ${escapeHtml(order.customer)}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Order Date</span>
                        <strong>
                            ${escapeHtml(order.orderDate)}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Payment</span>
                        <strong>
                            ${escapeHtml(order.payment)}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Delivery</span>
                        <strong>
                            ${escapeHtml(order.delivery)}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Items</span>
                        <strong>
                            ${escapeHtml(order.items)}
                        </strong>
                    </div>

                    <div class="order-info-row">
                        <span>Last Update</span>
                        <strong>
                            ${escapeHtml(order.lastUpdate)}
                        </strong>
                    </div>

                </div>


                <div class="tracking-current">

                    <strong>Current Status</strong>

                    <p>
                        ${escapeHtml(order.notes)}
                    </p>

                </div>


                <div class="tracking-progress-wrapper">

                    <h4>Order Progress</h4>

                    ${buildProgress(order.status)}

                </div>


                <div class="tracking-help">

                    <p>Need help with your order?</p>

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

        trackingResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }


    function showTrackingError(message) {

        if (!trackingResult) return;

        trackingResult.innerHTML = `
            <div class="tracking-error">

                <strong>
                    ${escapeHtml(message)}
                </strong>

                <p>
                    Please check your GCR order number.
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


    function trackOrder() {

        if (!trackingNumber || !trackingResult) return;

        const number = cleanOrderNumber(
            trackingNumber.value
        );

        if (!number) {
            showTrackingError(
                "Please enter your GCR order number."
            );
            return;
        }

        const orders = getOrders();
        const order = orders[number];

        if (!order) {
            showTrackingError("Order not found.");
            return;
        }

        showOrder(order);
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
                    event.preventDefault();
                    trackOrder();
                }

            }
        );
    }


    // ========================================================
    // ADMIN ORDER MANAGER
    // ========================================================

    const adminForm =
        document.getElementById("adminOrderForm");

    const adminMessage =
        document.getElementById("adminMessage");

    const adminOrdersList =
        document.getElementById("adminOrdersList");


    function showAdminMessage(message, success = true) {

        if (!adminMessage) return;

        adminMessage.textContent = message;

        adminMessage.className =
            success
                ? "admin-message success"
                : "admin-message error";
    }


    function renderAdminOrders() {

        if (!adminOrdersList) return;

        const orders = getOrders();
        const keys = Object.keys(orders);

        if (!keys.length) {

            adminOrdersList.innerHTML =
                "No orders saved yet.";

            return;
        }


        adminOrdersList.innerHTML = keys.map(key => {

            const order = orders[key];

            return `
                <div class="admin-order-item">

                    <div>
                        <strong>
                            ${escapeHtml(order.orderNumber)}
                        </strong>

                        <span>
                            ${escapeHtml(order.customer)}
                        </span>
                    </div>

                    <div>
                        <span>
                            ${escapeHtml(order.status)}
                        </span>
                    </div>

                    <button
                        type="button"
                        class="admin-delete-button"
                        data-order="${escapeHtml(order.orderNumber)}">

                        Delete

                    </button>

                </div>
            `;

        }).join("");


        adminOrdersList
            .querySelectorAll(".admin-delete-button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const number =
                            button.dataset.order;

                        const orders = getOrders();

                        delete orders[number];

                        saveOrders(orders);

                        renderAdminOrders();

                        showAdminMessage(
                            `${number} deleted.`
                        );

                    }
                );

            });
    }


    if (adminForm) {

        adminForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const orderNumber =
                    cleanOrderNumber(
                        document.getElementById(
                            "adminOrderNumber"
                        ).value
                    );


                if (!/^GCR-\d+$/.test(orderNumber)) {

                    showAdminMessage(
                        "Order number must look like GCR-1002.",
                        false
                    );

                    return;
                }


                const order = {

                    orderNumber,

                    customer:
                        document.getElementById(
                            "adminCustomer"
                        ).value.trim(),

                    orderDate:
                        document.getElementById(
                            "adminOrderDate"
                        ).value,

                    status:
                        document.getElementById(
                            "adminStatus"
                        ).value,

                    payment:
                        document.getElementById(
                            "adminPayment"
                        ).value,

                    delivery:
                        document.getElementById(
                            "adminDelivery"
                        ).value,

                    items:
                        document.getElementById(
                            "adminItems"
                        ).value.trim() ||
                        "Shopping order",

                    lastUpdate:
                        document.getElementById(
                            "adminLastUpdate"
                        ).value.trim() ||
                        "Order updated",

                    notes:
                        document.getElementById(
                            "adminNotes"
                        ).value.trim() ||
                        "Your order has been updated."

                };


                const orders = getOrders();

                orders[orderNumber] = order;

                saveOrders(orders);

                showAdminMessage(
                    `${orderNumber} saved successfully.`
                );

                adminForm.reset();

                renderAdminOrders();

            }
        );
    }


    renderAdminOrders();

});
