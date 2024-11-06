import React from 'react';

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <nav className="flex flex-col self-stretch my-auto ">
      <h2 className="text-2xl font-extrabold tracking-tight leading-loose uppercase grad-text">
        {title}
      </h2>
      <ul className="flex flex-col px-1.5 mt-4 text-xl text-white">
        {links.map((link, index) => (
          <li key={index} className={index > 0 ? "mt-5" : ""}>
            <a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterColumn;