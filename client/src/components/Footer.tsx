import { Copyright, Facebook, Github, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="">
      <div className=" bg-white shadow-lg h-15 flex justify-between items-center px-6 ">
        <div className="flex justify-center items-center gap-2 text-primary">
          <Facebook />
          <Instagram />
          <Twitter />
          <Github />
        </div>

        <div className="text-sm flex items-center justify-center gap-2">
          <Copyright /> <p>2026 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
