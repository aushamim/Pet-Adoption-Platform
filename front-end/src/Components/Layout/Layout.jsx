import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Toaster } from "sonner";

const Layout = () => {
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setScrollToTopVisible(true);
      } else {
        setScrollToTopVisible(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="bg-repeat"
      style={{ backgroundImage: "url(/assets/images/bg.png)" }}
    >
      <Toaster richColors />
      <div className="w-11/12 xl:w-3/4 mx-auto">
        <Navbar></Navbar>

        {/* All Pages */}
        <div className="min-h-[50vh] md:min-h-[70vh]">
          <Outlet></Outlet>
        </div>

        <Footer></Footer>
      </div>

      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className={
          scrollToTopVisible
            ? "btn rounded-r-none p-0.5 xl:p-3 fixed right-0 bottom-10 bg-white"
            : "hidden"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Layout;
