import { useEffect, useState } from "react";

export function AutoLoadingSpinner() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-64 h-32">
        <svg
          className="absolute inset-0"
          viewBox="0 0 200 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Carretera */}
          <line x1="0" y1="80" x2="200" y2="80" stroke="#333" strokeWidth="4" />

          {/* Coche */}
          <g className="translate-x-[-50%] animate-drive">
            <rect x="10" y="50" width="60" height="20" rx="5" fill="#3B82F6" />
            <rect x="20" y="30" width="40" height="20" rx="5" fill="#3B82F6" />
            <circle cx="25" y="70" r="8" fill="#1F2937" />
            <circle cx="55" y="70" r="8" fill="#1F2937" />
          </g>

          {/* Líneas de la carretera */}
          <line
            x1="0"
            y1="80"
            x2="40"
            y2="80"
            stroke="#FFF"
            strokeWidth="2"
            strokeDasharray="10 10"
            className="animate-roadLines"
          />
          <line
            x1="50"
            y1="80"
            x2="90"
            y2="80"
            stroke="#FFF"
            strokeWidth="2"
            strokeDasharray="10 10"
            className="animate-roadLines [animation-delay:500ms]"
          />
          <line
            x1="100"
            y1="80"
            x2="140"
            y2="80"
            stroke="#FFF"
            strokeWidth="2"
            strokeDasharray="10 10"
            className="animate-roadLines [animation-delay:1000ms]"
          />
          <line
            x1="150"
            y1="80"
            x2="190"
            y2="80"
            stroke="#FFF"
            strokeWidth="2"
            strokeDasharray="10 10"
            className="animate-roadLines [animation-delay:1500ms]"
          />
        </svg>
      </div>
      <div className="mt-8 w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">
        Cargando... {Math.round(progress)}%
      </p>
    </div>
  );
}
