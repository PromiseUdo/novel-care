import React from "react";
import Hero from "./components/hero";
import Map from "./components/map";
import ContactForm from "./components/contact-form";

const page = () => {
  return (
    <div>
      <Hero />
      <ContactForm />
      <Map />
    </div>
  );
};

export default page;
