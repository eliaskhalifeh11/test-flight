import "../css/infoPages.css";

function Contact() {
  return (
    <div className="info-page">
      <h1>Contact Us</h1>
      <p>If you need help or have questions, feel free to reach out!</p>

      <div className="contact-info">
        <p>📧 Email: support@skyfly.com</p>
        <p>📞 Phone: +961 1 234 567</p>
        <p>📍 Address: SkyFly HQ, Beirut, Lebanon</p>
      </div>

      <form className="contact-form">
        <label>
          Your Name:
          <input type="text" required />
        </label>
        <label>
          Your Email:
          <input type="email" required />
        </label>
        <label>
          Message:
          <textarea rows="4" required></textarea>
        </label>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
