import React from "react";

const Location = () => {
  return (
    <div className="bg-gray-200 pb-10">
      <div
        data-aos="fade-left"
        data-aos-easing="ease-in-out-cubic"
        data-aos-duration="1000"
        data-aos-delay="100"
        className="mx-auto md:max-w-screen-2xl"
      >
        <iframe
          className="w-full h-[20rem] rounded"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.794143542235!2d121.05245491744384!3d14.61079960000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7c2cf0615fd%3A0x4e08642421e80eb6!2s390%20Col.%20Bonny%20Serrano%20Ave%2C%20Quezon%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1676557828519!5m2!1sen!2sph"
          width={1200}
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Location;
