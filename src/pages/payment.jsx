import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../css/payment.css";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const totalFromUrl = searchParams.get("total");

  useEffect(() => {
    if (totalFromUrl) {
      setAmount(totalFromUrl);
    }
  }, [totalFromUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!bookingId) {
      setError("Booking ID missing in URL parameters.");
      return;
    }

    if (!amount || !paymentMethod || !currency || !status) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const paymentData = {
        booking_id: parseInt(bookingId), // ensure it's a number
        amount: parseFloat(amount),
        currency,
        payment_method: paymentMethod,
        status,
        payment_date: new Date().toISOString(),
      };

      const res = await fetch("https://localhost:7162/api/Payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await res.json();
      alert(`Payment successful! Payment ID: ${data.payment_id}`);
      navigate("/");
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment for Booking #{bookingId || "N/A"}</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Currency</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="LBP">LBP</option>
        </select>

        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">-- Select Method --</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>

        {error && <p className="payment-error">{error}</p>}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentPage;
