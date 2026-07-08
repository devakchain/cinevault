function Footer() {
  return (
    <footer
      className="
      relative
      z-10
      border-t
      border-white/10
      bg-black/40
      backdrop-blur-xl
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-8
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
        "
      >

        <div
          className="
          text-xl
          font-black
          tracking-tighter
          "
        >
          <span className="text-white">
            Cine
          </span>

          <span className="text-violet-500">
            Vault
          </span>
        </div>


        <p
          className="
          text-zinc-500
          text-sm
          "
        >
          © {new Date().getFullYear()} CineVault. All rights reserved.
        </p>


        <div
          className="
          flex
          gap-5
          text-sm
          text-zinc-400
          "
        >
          <span className="hover:text-white transition cursor-pointer">
            Privacy
          </span>

          <span className="hover:text-white transition cursor-pointer">
            Terms
          </span>

          <span className="hover:text-white transition cursor-pointer">
            Contact
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
