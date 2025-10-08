'use client';
import Image from "next/image";
import LiquidEther from "./component/LiquidEther";
import Particles from "./component/Particles";

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white ">
      {/* Particles Background */}
      {/* <div className="absolute inset-0 -z-10 -z-10 pointer -events-auto">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}  
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div> */}

      {/* Liquid Ether Background */}
      <div className="absolute inset-0 -z-10 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={50}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        /> </div>
      {/* Page Content */}
      <main className="relative z-10 px-8 py-16 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="relative flex justify-center">
            <Image
              src="/images/me.jpeg"
              alt="Kalp Shah"
              width={300}
              height={300}
              className="relative rounded-full border-4 border-indigo-500 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50"
              priority
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Hello, I’m KALP SHAH
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            A passionate <span className="text-indigo-400 font-semibold">Machine Learning Student </span>  
            exploring AI, Deep Learning, and Data Science while building creative, user-friendly web apps.
          </p>
        </section>

        {/* About Me Section */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-pink-400">About Me</h2>
          <p className="text-slate-200 max-w-3xl">
            I’m deeply curious about how data can shape the future, blending{" "}
            <span className="text-purple-400 font-semibold">machine learning models </span> 
            with modern <span className="text-indigo-400 font-semibold">web technologies </span> 
            to create intelligent systems that solve real-world problems.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-700/60 to-purple-800/60 shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-indigo-300">🌟 Experience</h3>
              <p className="text-slate-200 mt-2">Projects in ML, Python, TensorFlow, and Web Dev</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-600/60 to-purple-700/60 shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-pink-300">⚡ Skills</h3>
              <p className="text-slate-200 mt-2">Machine Learning, Deep Learning, Data Visualization</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-700/60 to-indigo-800/60 shadow-lg hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-purple-300">🎯 Focus</h3>
              <p className="text-slate-200 mt-2">AI-powered apps, research, and intelligent systems</p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-indigo-400">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "Python 🐍",
              "TensorFlow 🔥",
              "PyTorch 🤖",
              "Scikit-learn 📊",
              "React ⚛️",
              "Next.js 🚀",
              "Tailwind 🎨",
              "DataViz 📈"
            ].map((skill) => (
              <div
                key={skill}
                className="p-6 rounded-xl bg-slate-900/60 shadow hover:bg-slate-800/70 transition"
              >
                <p className="font-medium text-slate-200">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Section */}
        <section className="space-y-8 text-center">
          <h2 className="text-4xl font-bold text-purple-400">🚀 My Vision</h2>
          <p className="text-slate-200 max-w-2xl mx-auto">
            To contribute to cutting-edge research in AI while building tools that make technology more
            <span className="text-pink-400 font-semibold"> human-centered</span>, x``
            <span className="text-indigo-400 font-semibold"> accessible</span>, and 
            <span className="text-purple-400 font-semibold"> impactful</span>.
          </p>
        </section>
      </main>
    </div>
  );
}
