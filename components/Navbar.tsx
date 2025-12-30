import React, { useState, useEffect } from "react";
import { Menu, X, Stethoscope } from "lucide-react";

const NAV_CONFIG = {
  brandName: "Dr. Mithilesh Mishra",
  brandSubtitle: "Pain Specialist",
  links: [
    { name: "Home", href: "#" },
    { name: "Treatments", href: "#treatments" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ],
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ================= CLOSE MENU ON DESKTOP ================= */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ===== BRAND ===== */}
          <a href="#" className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow">
              <Stethoscope size={26} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-gray-900">
                {NAV_CONFIG.brandName}
              </h1>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                {NAV_CONFIG.brandSubtitle}
              </p>
            </div>
          </a>

          {/* ===== DESKTOP MENU ===== */}
          <div className="hidden lg:flex gap-10">
            {NAV_CONFIG.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-white-700 font-medium hover:text-blue-600 transition"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* ===== MOBILE TOGGLE ===== */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-[9999] bg-white transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ===== HEADER ===== */}
        <div className="h-20 px-6 flex items-center justify-between border-b">
          <span className="font-serif font-bold text-lg text-gray-900">
            Menu
          </span>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* ===== LINKS ===== */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] space-y-10">
          {NAV_CONFIG.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-serif font-bold text-gray-900 hover:text-blue-600 transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
