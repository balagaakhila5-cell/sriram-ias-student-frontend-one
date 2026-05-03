'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  
  const errorMessage = "Oops! It looks like the page you are looking for has gone exploring on its own. Let's get you back on track.";
  const errorCode = "404";
  const title = "Page Not Found";

  return (
      <div className="min-h-[100vh] flex items-center justify-center relative overflow-hidden bg-white">
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
            filter: 'blur(100px)',
            transform: 'translateX(-50%)'
          }}
        />
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(181.87deg, rgba(201, 149, 61, 0.4) -157.44%, rgba(192, 138, 44, 0.384) -157.4%, rgba(190, 132, 32, 0.268) 216.94%, rgba(246, 166, 28, 0.32) 216.94%)',
            filter: 'blur(100px)',
            transform: 'translateX(50%)'
          }}
        />

        <div className="relative z-10 text-center space-y-8 px-4 max-w-2xl mx-auto">
          <div className="relative inline-block">
            <h1 
              className="text-8xl md:text-[150px] font-black tracking-tighter leading-none text-transparent bg-clip-text drop-shadow-sm"
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(225, 97, 101, 0.8) 0%, #20A0E0 100%)'
              }}
            >
              {errorCode}
            </h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              {title}
            </h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
              {errorMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white shadow-xl hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              style={{
                background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)'
              }}
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
  );
};

export default NotFoundPage;
