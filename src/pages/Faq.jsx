import "../css/infoPages.css";

function Faq() {
  return (
    <div className="info-page">
      <h1>Frequently Asked Questions (FAQ)</h1>

      <div className="faq-item">
        <h3>🛫 How do I book a flight?</h3>
        <p>Click on "Search Flights", choose your route, date, and select your seats. Follow the steps to confirm your booking.</p>
      </div>

      <div className="faq-item">
        <h3>💳 What payment methods are accepted?</h3>
        <p>We currently accept credit/debit cards and will support more options in future updates.</p>
      </div>

      <div className="faq-item">
        <h3>🔐 Do I need an account to book?</h3>
        <p>No, but creating an account lets you manage bookings and receive special offers.</p>
      </div>

      <div className="faq-item">
        <h3>📧 How will I receive my ticket?</h3>
        <p>You will receive your e-ticket by email right after payment confirmation.</p>
      </div>
    </div>
  );
}

export default Faq;
