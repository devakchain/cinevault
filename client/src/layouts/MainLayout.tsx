import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();

  return (
    <div
      className="
      min-h-screen
      bg-[#070707]
      text-white
      overflow-x-hidden
      flex
      flex-col
      "
    >
      {/* Background Glow */}
      <div
        className="
        fixed
        inset-0
        pointer-events-none
        bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_40%)]
        "
      />

      <Navbar />

      <main
        className="
        relative
        z-10
        flex-1
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
