import React from "react";
import MyComponent from "./components/mycomponent";
import FinanceCard from "./components/Card";
import ContactForm from "./components/ContactSec";
import Footer from "./components/footer";
import HomePage from "./Homepage";
import ComponentTwo from "./Mycomponents";
import Login from "./auth/Login";

const Home = () => {
  return (
    <>
     
      <MyComponent />
      <ComponentTwo />
      <FinanceCard />
      <HomePage />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
