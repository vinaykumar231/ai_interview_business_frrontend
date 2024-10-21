import React from "react";
import "./App.css";
import MyComponent from "./components/mycomponent";
import ComponentTwo from "./Mycomponents";
import HomePage from "./Homepage";
import Footer from "./components/footer";
import ContactForm from "./components/ContactSec";

function App() {
  return (
    <div className="App">
      <MyComponent />
      <ComponentTwo />
      <HomePage />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
