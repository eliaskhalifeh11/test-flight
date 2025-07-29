import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  // Set amount from URL total if available on mount
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
        booking_id: parseInt(bookingId, 10),
        payment_date: new Date().toISOString(),
        amount: parseFloat(amount),
        currency,
        payment_method: paymentMethod,
        status,
      };

      console.log("Sending payment data:", paymentData);

      const res = await fetch("https://localhost:7162/api/Payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="payment-page" style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Payment for Booking #{bookingId || "N/A"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="LBP">LBP</option>
          </select>
        </label>
        <br />
        <label>
          Payment Method:
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
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </label>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentPage;
