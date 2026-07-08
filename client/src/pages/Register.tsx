import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../store/userStore";

function Register() {
  const [name, setName] = useState("");

  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  function handleRegister() {
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
      flex
      items-center
      justify-center
      relative
      overflow-hidden
      px-6
      "
    >
      {/* Background glow */}

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-violet-600/20
        rounded-full
        blur-3xl
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
        w-full
        max-w-md
        "
      >
        <div
          className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          "
        >
          <div className="mb-8">
            <h1
              className="
              text-4xl
              font-black
              text-white
              "
            >
              Create Account
            </h1>

            <p
              className="
              text-zinc-400
              mt-3
              "
            >
              Join your personal movie universe
            </p>
          </div>

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
            text-white
            p-4
            rounded-2xl
            outline-none
            focus:border-violet-500
            transition
            "
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="
            mt-6
            w-full
            bg-violet-600
            hover:bg-violet-500
            text-white
            p-4
            rounded-2xl
            font-bold
            transition
            hover:scale-[1.02]
            "
          >
            Create Account
          </button>

          <p
            className="
            text-center
            text-zinc-500
            text-sm
            mt-6
            "
          >
            Start building your cinematic collection
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
