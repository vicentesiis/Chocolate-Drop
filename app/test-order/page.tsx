"use client";

import { useState } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import type { CustomerInfo } from "@/lib/types/order";

export default function TestOrderPage() {
  const { cart, addToCart, submitOrder, isSubmittingOrder, getTotalPrice } = useCart();
  const [orderResult, setOrderResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Add a test item to cart
  const addTestItem = () => {
    const testItem = {
      boxType: {
        id: "small",
        name: "Small Box",
        price: 25,
        capacity: 6,
        description: "Perfect for a small treat",
      },
      selectedDesserts: [
        { id: "chocolate-truffle", quantity: 3 },
        { id: "vanilla-cake", quantity: 3 },
      ],
      totalPrice: 25,
    };
    addToCart(testItem);
  };

  // Test customer info
  const testCustomerInfo: CustomerInfo = {
    name: "Test Customer",
    email: "test@example.com",
    phone: "555-0123",
    address: {
      street: "123 Test Street",
      city: "Mexico City",
      state: "CDMX",
      zipCode: "12345",
    },
  };

  const handleSubmitOrder = async () => {
    try {
      setError("");
      setOrderResult("");

      const orderId = await submitOrder(testCustomerInfo, "Test order from development");
      setOrderResult(`Order created successfully! Order ID: ${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Test Order Submission</h1>

      <div className="space-y-6">
        {/* Cart Status */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cart Status</h2>
          <p>Items in cart: {cart.length}</p>
          <p>Total price: ${getTotalPrice()}</p>
        </div>

        {/* Add Test Item */}
        <div>
          <button
            onClick={addTestItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Test Item to Cart
          </button>
        </div>

        {/* Customer Info Display */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Customer Info</h2>
          <div className="text-sm space-y-1">
            <p>
              <strong>Name:</strong> {testCustomerInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {testCustomerInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {testCustomerInfo.phone}
            </p>
            <p>
              <strong>Address:</strong> {testCustomerInfo.address.street},{" "}
              {testCustomerInfo.address.city}
            </p>
          </div>
        </div>

        {/* Submit Order */}
        <div>
          <button
            onClick={handleSubmitOrder}
            disabled={cart.length === 0 || isSubmittingOrder}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmittingOrder ? "Submitting Order..." : "Submit Test Order"}
          </button>
        </div>

        {/* Results */}
        {orderResult && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {orderResult}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        {/* Cart Items Display */}
        {cart.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
            {cart.map((item, index) => (
              <div key={index} className="border-b pb-2 mb-2">
                <p>
                  <strong>Box:</strong> {item.boxType.name}
                </p>
                <p>
                  <strong>Price:</strong> ${item.totalPrice}
                </p>
                <p>
                  <strong>Desserts:</strong>
                </p>
                <ul className="ml-4">
                  {item.selectedDesserts.map((dessert, i) => (
                    <li key={i}>
                      - {dessert.id}: {dessert.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
