import React from "react";
import MyComponent from "./components/mycomponent";
import ContactForm from "./components/ContactSec";
import Footer from "./components/footer";
import ComponentTwo from "./Mycomponents";

const Home = () => {
  return (
    <>
      <MyComponent />
      <ComponentTwo />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
