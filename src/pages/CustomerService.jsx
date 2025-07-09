import "../css/infoPages.css";

function CustomerService() {
  return (
    <div className="info-page">
      <h1>Customer Service</h1>
      <p>We're here to help you before, during, and after your trip.</p>

      <h3>💬 Support Channels</h3>
      <ul>
        <li>Live chat: Available 9am – 6pm daily</li>
        <li>Email: support@skyfly.com</li>
        <li>Phone: +961 1 234 567</li>
      </ul>

      <h3>🕒 Working Hours</h3>
      <p>Monday to Friday: 9:00 AM – 6:00 PM<br />
         Saturday: 10:00 AM – 4:00 PM<br />
         Sunday: Closed
      </p>

      <h3>✈️ Flight Issues?</h3>
      <p>If you face any issue with your booking or flight, contact us immediately. We’ll help you resolve it quickly.</p>
    </div>
  );
}

export default CustomerService;
