"use client";

import dynamic from "next/dynamic";

const FirstPersonContainer = dynamic(
  () => import("@/components/first-person-container"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-poppins">
            Loading immersive experience...
          </p>
        </div>
      </div>
    ),
  },
);

const SimpleGunTest = dynamic(
  () => import("@/components/guns/simple-gun-test"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-poppins">
            Loading immersive experience...
          </p>
        </div>
      </div>
    ),
  },
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="font-poppins text-3xl font-bold text-white">
            Interactive 3D Demo
          </h1>
          <p className="font-inter text-gray-400 text-sm">
            First-person view in a dedicated screen container
          </p>
        </header>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video screen - takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <FirstPersonContainer />
          
          </div>

          {/* Side panel for info/controls */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="font-poppins text-xl font-semibold text-white mb-4">
              Controls
            </h3>
            <div className="space-y-3 font-inter text-gray-300 text-sm">
              <div className="flex justify-between items-center">
                <span>Move Forward/Backward</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  W / S
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Strafe Left/Right</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  A / D
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Look Around</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  Mouse
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Lock/Unlock Cursor</span>
                <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                  Click / ESC
                </kbd>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-poppins font-semibold text-white text-sm mb-2">
                About
              </h4>
              <p className="font-inter text-gray-400 text-xs">
                Experience real-time 3D rendering with Three.js in a cinematic
                container format.
              </p>
            </div>
          </div>

            {/* <SimpleGunTest /> */}
        </div>
      </div>
    </main>
  );
}
