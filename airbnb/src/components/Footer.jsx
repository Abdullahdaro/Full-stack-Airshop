import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-main bg-opacity-20 text-gray-900 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="footer-logo">
          {/* You can add an H&M logo here */}
          AirTopTan
        </div>
        <div className="footer-links">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-gray-400">Shop</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            <li><a href="#" className="hover:text-gray-400">About Us</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="flex-col flex gap-10">
          {/* You can add social media icons here */}
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f">Facebook</i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter">Twitter</i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram">Instagram</i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;