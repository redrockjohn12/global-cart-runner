GLOBAL CART RUNNER — ORDER TRACKING V1

This is the first working tracking version for the existing static website.

WHAT IT ADDS
- Track Order section
- GCR order numbers such as GCR-1001
- 10-step order status timeline
- Payment status display
- Delivery preference and last-update display
- Owner Order Manager for creating/updating orders
- MTN Mobile Money details
- Bank/EFT marked as coming soon
- Existing quote calculator and WhatsApp ordering flow retained

IMPORTANT LIMITATION
This V1 uses browser localStorage. Orders created in the Order Manager are stored only on the browser/device where they are created. This is a TESTING version, not a production shared database.

PRODUCTION NEXT STEP
Replace localStorage with a real hosted database and secure admin login. Then customers will be able to see the same order status from any phone/browser.

TERMUX INSTALL
cd ~/global-cart-runner
# Copy index.html, styles.css and script.js from this package into ~/global-cart-runner
# Then run:
git add index.html styles.css script.js README.txt
git commit -m "Add order tracking v1"
git push

TEST
1. Open the GitHub Pages website.
2. Go to Track Order.
3. Enter GCR-1001. A demo order should appear.
4. Open Order Manager.
5. Create an order such as GCR-1002.
6. Search GCR-1002 in Track Order.

PAYMENT
MTN Mobile Money
Number: 76786258
Account name: Thandeka Magongo
Reference: Your GCR Order Number

BANK/EFT
Details will be added later.
