import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <img
        src="https://dhb3yazwboecu.cloudfront.net/1384/collections/PARALEL/Point_paralel_1920.jpg"
        alt=""
        className="background-image"
      />
      <div className="content">
        <div className="section">
          <div className="our-story">
            <div>
              <h2 className="section-heading">Our Story</h2>
              <p className="paragraph">
                Welcome to Bajwa Furniture Store where we believe that furniture
                isn't just about functionality; it's about creating spaces that
                reflect your style, personality, and comfort. It began with a
                simple mission: to provide high-quality furniture that combines
                impeccable craftsmanship with affordability. What started as a
                passion project has now grown into a thriving online store,
                serving customers across Pakistan. We are committed to offering
                a wide range of furniture options, from classic to contemporary
                styles, ensuring that there's something for everyone. Our
                dedication to quality and customer satisfaction drives
                everything we do, and we're excited to help you furnish your
                space with pieces you'll love.
              </p>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h2 className="section-heading">Our Philosophy</h2>
            <p className="paragraph">
              At Bajwa Furniture Store, we understand that your home is your
              sanctuary. That's why we handpick each piece in our collection,
              focusing on timeless designs, durability, and sustainability.
              Whether you're furnishing a cozy apartment or a spacious home, we
              offer a curated selection to suit every taste and budget.
            </p>
          </div>
        </div>
        {/* More sections... */}
      </div>
    </div>
  );
};

export default AboutUs;
