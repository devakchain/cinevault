import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useUserStore } from "../store/userStore";

function Navbar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const location = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Discover",
      path: "/search",
    },
    {
      name: "Watchlist",
      path: "/watchlist",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      backdrop-blur-2xl
      bg-black/70
      border-b
      border-white/10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="
          text-3xl
          font-black
          tracking-tighter
          "
        >
          <span className="text-white">Cine</span>

          <span className="text-violet-500">Vault</span>
        </Link>

        {/* Desktop Menu */}

        <div
          className="
          hidden
          md:flex
          gap-2
          "
        >
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="
                relative
                px-5
                py-2
                rounded-xl
                "
              >
                <motion.span
                  whileHover={{
                    y: -2,
                  }}
                  className={`
                  block
                  transition
                  ${active ? "text-white" : "text-zinc-400 hover:text-white"}
                  `}
                >
                  {link.name}
                </motion.span>

                {active && (
                  <motion.div
                    layoutId="active"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                    className="
                    absolute
                    inset-0
                    bg-violet-600/20
                    border
                    border-violet-500/30
                    rounded-xl
                    -z-10
                    "
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* User */}

        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          {!user ? (
            <>
              <Link
                to="/login"
                className="
                text-zinc-300
                hover:text-white
                transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                bg-violet-600
                px-5
                py-2
                rounded-xl
                font-bold
                hover:bg-violet-500
                transition
                "
              >
                Join
              </Link>
            </>
          ) : (
            <div
              className="
              flex
              items-center
              gap-3
              "
            >
              <div
                className="
                w-10
                h-10
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-purple-900
                flex
                items-center
                justify-center
                font-bold
                "
              >
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <button
                onClick={logout}
                className="
                text-zinc-400
                hover:text-red-400
                transition
                "
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="
            md:hidden
            text-2xl
            "
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="
          md:hidden
          overflow-hidden
          px-6
          pb-5
          "
          >
            <div
              className="
            bg-zinc-900/90
            backdrop-blur-xl
            rounded-2xl
            p-4
            border
            border-white/10
            "
            >
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="
                block
                py-3
                text-zinc-300
                hover:text-white
                transition
                "
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
