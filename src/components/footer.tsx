import React from "react";
import FooterColumn from "./footercolumn";

interface FooterProps {
  // Add any props if needed
}

const Footer: React.FC<FooterProps> = () => {
  const productLinks = ["Email Row", "Free Tools", "Agents", "Blog"];
  const resourceLinks = ["Our Agents", "Member Stories", "Video", "Free Trial"];
  const companyLinks = ["Partnerships", "Terms of use", "Privacy", "Sitemap"];

  return (
    <footer className="flex grad-tab9  flex-col rounded-none mt-[90px] ">
      <div className="flex flex-wrap gap-5 justify-between items-start px-16 py-16 w-full rounded-3xl max-md:px-5 max-md:max-w-full bg-black">
        {/* Footer logo */}
        <div className="flex flex-col">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8b78acf5be6b5cb3003d84b2c0ebddaebfb4351fb7cb3f386f63590c4b94da6?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
            alt="Company logo"
            className="object-contain aspect-[3.82] w-[267px]"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e74d673e8d08ed707d58166bd2c3017b04a50ec07019aebee4c77136aa4cbadd?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
            alt=""
            className="object-contain mt-8 max-w-full rounded-xl aspect-[4.61] w-[203px]"
          />
        </div>
        <FooterColumn title="Product" links={productLinks} />
        <FooterColumn title="Resources" links={resourceLinks} />
        <FooterColumn title="Company"  links={companyLinks} />
        {/* News letter section */}
        <div className="flex flex-col ">
          <h2 className="grad-text self-start text-2xl font-extrabold tracking-tight leading-loose uppercase">
            newsletter
          </h2>
          <form className="flex mt-10" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email-input" className="sr-only">
              Enter Email
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="Enter Email"
              className="flex-grow shrink-0 py-3 pl-5 text-sm font-semibold bg-white text-neutral-700 min-h-[38px] w-[248px] max-md:w-full"
              aria-label="Enter Email"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-3 py-3 bg-blue-500 min-h-[38px]"
              aria-label="Submit"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f076bbe2cc146e272cc5915429dc1e075bce1ab91285f66efca0fc882185700?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
                alt=""
                className="w-4 h-4 object-contain"
              />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
