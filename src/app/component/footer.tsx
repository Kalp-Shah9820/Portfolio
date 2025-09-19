import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="px-8 py-6 border-t border-slate-700/50 text-center">
      <p className="text-slate-400 text-sm">
        © {new Date().getFullYear()} Kalp Shah. Built with{" "}
        <span className="text-pink-400">Next.js</span> +{" "}
        <span className="text-indigo-400">TailwindCSS</span>.
      </p>

      <div className="mt-3 flex justify-center space-x-6 text-slate-400 text-xl">
        {/* Email */}
        <a
          href="mailto:shahkalp9820@gmail.com"
          className="hover:text-pink-400 transition"
        >
          <MdEmail />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/kalp-shah-b01286337"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-400 transition"
        >
          <FaLinkedin />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Kalp-Shah9820"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-400 transition"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
