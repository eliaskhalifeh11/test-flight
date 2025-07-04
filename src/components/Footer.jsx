import '../css/footer.css';

function Footer() {
  return (
   <footer className="footer">
  <div className="footer-content">
    <span>© 2025 SkyFly. All rights reserved.</span>
    <span>Contact us: support@skyfly.com | +961 70 000 000</span>
    <span>
      Follow us on
      <a href="#" className="socialLink"> Facebook</a>, 
      <a href="#" className="socialLink"> Twitter</a>, 
      <a href="#" className="socialLink"> Instagram</a>
    </span>
  </div>
</footer>

  );
}

export default Footer;
