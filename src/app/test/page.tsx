'use client';

import Image from 'next/image';
import Particles from "../component/Particles"; // Make sure the path is correct

export default function AboutPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* Particles Background */}
      <div className="absolute inset-0">
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white pointer-events-auto">
        
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
          <Image
            src="/images/me.jpeg" // replace with your profile image path
            alt="Profile Picture"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name & Title */}
        <h1 className="text-5xl font-bold mb-2">Kalp Shah</h1>
        <h2 className="text-2xl font-medium mb-6">Frontend Developer & Designer</h2>

        {/* Description */}
        <p className="max-w-2xl text-lg leading-relaxed">
          I’m a passionate web developer specializing in interactive and modern web experiences.
          I love building responsive, user-friendly websites with engaging visuals and animations.
          Welcome to my portfolio!
        </p>

        {/* Optional Buttons */}
        <div className="mt-8 flex gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-indigo-700 transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
}
