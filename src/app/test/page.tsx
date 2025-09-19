'use client';

import LiquidEther from '../component/LiquidEther';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* LiquidEther Background */}
      <div className="absolute inset-0 -z-10">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
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
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
          <Image
            src="/images/me.jpg" // replace with your profile image path
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
