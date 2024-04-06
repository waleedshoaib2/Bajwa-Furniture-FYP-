import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.aboutUsContainer}>
      <div style={styles.aboutUs}>
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.content}>
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>Our Story</h2>
            <p style={styles.paragraph}>
              Welcome to{" "}
              <span style={styles.highlight}>Bajwa Furniture Store</span>, where
              we believe that furniture isn't just about functionality; it's
              about creating spaces that reflect your style, personality, and
              comfort.
            </p>
            <p style={styles.paragraph}>
              It began with a simple mission: to provide high-quality furniture
              that combines impeccable craftsmanship with affordability. What
              started as a passion project has now grown into a thriving online
              store, serving customers across Pakistan.
            </p>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>Our Philosophy</h2>
            <p style={styles.paragraph}>
              At <span style={styles.highlight}>Bajwa Furniture Store</span>, we
              understand that your home is your sanctuary. That's why we
              handpick each piece in our collection, focusing on timeless
              designs, durability, and sustainability. Whether you're furnishing
              a cozy apartment or a spacious home, we offer a curated selection
              to suit every taste and budget.
            </p>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>What Sets Us Apart</h2>
            <ul style={styles.list}>
              <li>
                <strong>Quality Assurance:</strong> We work closely with skilled
                artisans and reputable manufacturers to ensure that every piece
                meets our stringent quality standards.
              </li>
              <li>
                <strong>Affordability:</strong> We believe that everyone
                deserves to have a beautiful home, which is why we strive to
                offer competitive prices without compromising on quality.
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> Your satisfaction is our
                top priority. From browsing our website to delivery and beyond,
                we're committed to providing exceptional service every step of
                the way.
              </li>
            </ul>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>
              Our Commitment to Sustainability
            </h2>
            <p style={styles.paragraph}>
              As stewards of the environment, we're dedicated to minimizing our
              ecological footprint. That's why we prioritize sustainable
              materials and eco-friendly practices in our sourcing and
              operations.
            </p>
          </div>
          <div style={styles.section}>
            <h2 style={styles.sectionHeading}>Get in Touch</h2>
            <p style={styles.paragraph}>
              Have a question about a product? Need assistance with your order?
              We're here to help! Contact our friendly customer support team at{" "}
              <span style={{ color: "#4caf50" }}>BajwaFurniture@gmail.com</span>
              .
            </p>
            <p style={styles.paragraph}>
              Thank you for choosing{" "}
              <span style={{ color: "#f50057" }}>Bajwa Furniture Store</span>.
              We look forward to helping you transform your space into a place
              you'll love coming home to.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  aboutUsContainer: {
    position: "relative",
    zIndex: 1, // Ensure the About Us section is on top
  },
  aboutUs: {
    position: "relative",
    zIndex: 1, // Ensure the About Us section is on top
    maxWidth: "800px",
    margin: "0 auto",

    padding: "80px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow
  },
  heading: {
    color: "#333",
    fontSize: "36px",
    marginBottom: "30px", // Increased spacing
    borderBottom: "2px solid #333",
    paddingBottom: "10px",
  },
  section: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  sectionHeading: {
    color: "#fff",
    backgroundColor: "#000", // Black background for section headings
    fontSize: "24px",
    marginBottom: "10px",
    padding: "3px", // Added padding for better aesthetics
    borderRadius: "50px", // Added rounded corners
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Added shadow for depth
    textAlign: "center", // Centering the text
  },
  content: {
    lineHeight: "1.8", // Increased line height for better readability
  },
  paragraph: {
    marginBottom: "15px", // Increased spacing
  },
  list: {
    paddingLeft: "20px",
  },
  highlight: {
    color: "#f50057", // Pink color for highlighting
    fontWeight: "bold",
  },
};

export default AboutUs;
