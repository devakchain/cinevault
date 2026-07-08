import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useUserStore } from "../store/userStore";

function Login() {
  const [name, setName] = useState("");

  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  function handleLogin() {
    if (!name.trim()) return;

    login({
      id: crypto.randomUUID(),
      name,
    });

    navigate("/profile");
  }

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      relative
      overflow-hidden
      "
    >
      {/* Background glow */}

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-violet-600/20
        blur-[150px]
        rounded-full
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
        relative
        z-10
        w-[420px]
        rounded-3xl
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        p-10
        shadow-2xl
        "
      >
        {/* Logo */}

        <div className="text-center mb-8">
          <h1
            className="
            text-4xl
            font-black
            tracking-tight
            "
          >
            Cine
            <span className="text-violet-500">Vault</span>
          </h1>

          <p
            className="
            text-zinc-400
            mt-3
            "
          >
            Your personal movie universe
          </p>
        </div>

        {/* Avatar */}

        <motion.div
          animate={{
            scale: name ? 1.05 : 1,
          }}
          className="
          mx-auto
          mb-8
          w-24
          h-24
          rounded-full
          bg-gradient-to-br
          from-violet-500
          to-purple-900
          flex
          items-center
          justify-center
          text-4xl
          font-black
          "
        >
          {name ? name.charAt(0).toUpperCase() : "?"}
        </motion.div>

        <label
          className="
          text-sm
          text-zinc-400
          "
        >
          Username
        </label>

        <input
          className="
          mt-2
          w-full
          bg-black/40
          border
          border-white/10
          p-4
          rounded-2xl
          outline-none
          focus:border-violet-500
          transition
          "
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        <button
          onClick={handleLogin}
          disabled={!name.trim()}
          className="
          mt-6
          w-full
          bg-violet-600
          hover:bg-violet-500
          disabled:opacity-40
          disabled:cursor-not-allowed
          py-4
          rounded-2xl
          font-bold
          text-lg
          transition
          hover:scale-[1.02]
          "
        >
          Enter CineVault
        </button>

        <p
          className="
          text-center
          text-xs
          text-zinc-500
          mt-6
          "
        >
          Discover • Rate • Track • Save Movies
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
