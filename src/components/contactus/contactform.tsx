import React from "react";
import InputField from "./inputfield";

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  return (
    <div className="relative w-[90%] my-0 mx-auto   ">
      {/* Grad Tab behind the form */}
      <div className="grad-tab3 absolute inset-0 z-0"></div>

      {/* Contact Form */}
      <form className="relative z-10 flex flex-col items-start py-11 pr-20 pl-10 w-full rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 w-full max-w-[1201px] max-md:max-w-full">
          <div className="flex flex-col flex-1 items-start text-base text-white">
            <h1 className="text-4xl font-extrabold leading-tight uppercase">
              Contact us
            </h1>
            <InputField label="Name" />
            <InputField label="E-Mail" type="email" />
            <InputField label="Phone Number" type="tel" />
          </div>
          <img src={`${process.env.PUBLIC_URL}/assets/images/Worldcard.png`} />
          {/* <ContactCard /> */}
        </div>
        {/* <ServiceDropdown /> */}

        <label
          htmlFor="service-dropdown"
          className="mt-1 text-base tracking-wide text-center text-white">
          Service
        </label>
        <div className="flex gap-4 px-3.5 py-2.5 text-base tracking-wide text-center rounded-md bg-zinc-300 bg-opacity-60 text-white text-opacity-70">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e860336638e6322d84ab15fe290365ba0fd41c676b380c81e646cce717d5401?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
            className="object-contain shrink-0 my-auto w-3 rounded-sm aspect-[1.5]"
            alt=""
          />
          <select id="service-dropdown" className="flex-auto bg-transparent">
            <option>Design und entwicklung</option>
          </select>
        </div>

        <InputField label="Message" isTextArea />
        {/* <SendButton /> */}
        <button
          type="submit"
          className="gap-3.5 grad-btn w-[100px] text-center self-stretch pl-12 pr-24 py-2.5 mt-3.5 text-xl font-extrabold text-white uppercase whitespace-nowrap rounded-3xl max-md:px-5">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
