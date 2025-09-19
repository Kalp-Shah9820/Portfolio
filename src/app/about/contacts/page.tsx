"use client";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white px-8 py-16 space-y-12">
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          📬 Get in Touch
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Whether you have an idea for a project, want to collaborate, or just want
          to say hi — my inbox is always open!
        </p>
      </section>

      <section className="flex justify-center">
        <form
          className="w-full max-w-lg space-y-4 bg-gradient-to-br from-indigo-700/40 to-slate-800/40 p-8 rounded-2xl shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent 🚀 (demo only)");
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 shadow-lg hover:from-pink-600 hover:to-indigo-600 transition"
          >
            Send Message 🚀
          </button>
        </form>
      </section>

      <section className="text-center space-y-4">
      </section>
    </main>
  );
}
