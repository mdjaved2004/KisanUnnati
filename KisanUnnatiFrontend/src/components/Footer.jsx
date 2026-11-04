import './Footer.css'; // New CSS file for the footer

// --- SVG Social Icons ---
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>;
const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002.82-3.333 2.484-3.333 1.548 0 2.418 1.115 2.418 3.461v8.268h4.98v-8.59c0-3.415-1.89-6.41-5.147-6.41-2.43 0-3.872 1.344-4.514 2.563v-2.265z"/></svg>;

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <h3>Kisan Unnati</h3>
                        <p>Empowering farmers through technology, information, and a connected marketplace. Your trusted partner in modern agriculture.</p>
                    </div>
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#about-agriculture">Agriculture Information</a></li>                            
                            <li><a href="#crop-info">Crop Information</a></li>
                            <li><a href="#demanding-crops">Demanding Crops</a></li>                          
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><a href='mailto'>Email: mdjavedmansoori22@gmail.coma</a></li>
                            <li><a href='tel'>Phone: +91 74159 48500</a></li>
                            <li>Location: Indore, India</li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>More Links</h3>
                        <ul>
                            <li><a href="#careers">Join us</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#articles">Articles</a></li>
                            <li><a href="#buy-crops">Buy Crops</a></li>
                            <li><a href="#sell-crops">Sell Crops</a></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="/" aria-label="Facebook"><FacebookIcon /></a>
                            <a href="/" aria-label="Twitter"><TwitterIcon /></a>
                            <a href="/" aria-label="LinkedIn"><LinkedinIcon /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Kisan Unnati. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
