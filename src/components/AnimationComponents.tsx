import React from "react";
import { motion } from "framer-motion";

// Galaxy Animation Component
export const GalaxyAnimation: React.FC<{
  starCount?: number;
  galaxyCount?: number;
  color?: string;
}> = ({ starCount = 100, galaxyCount = 5, color = "#00abf0" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {Array.from({ length: starCount }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.7 + 0.3;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              opacity,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [opacity, opacity * 1.5, opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        );
      })}

      {/* Galaxies */}
      {Array.from({ length: galaxyCount }).map((_, i) => {
        const size = 80 + Math.random() * 150;
        const opacity = 0.05 + Math.random() * 0.1;
        const rotation = Math.random() * 360;
        return (
          <motion.div
            key={`galaxy-${i}`}
            className="absolute rounded-full blur-2xl"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
              opacity,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${rotation}deg)`,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              rotate: [rotation, rotation + 180, rotation + 360],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Shooting stars */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-0.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            width: 100 + Math.random() * 100,
            opacity: 0,
            top: `${Math.random() * 70}%`,
            left: `-100px`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            left: ["-100px", "120%"],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 15,
            ease: "easeOut",
            delay: i * 4,
          }}
        />
      ))}
    </div>
  );
};

// Starfield Animation
export const Starfield: React.FC<{
  starCount?: number;
  color?: string;
  speed?: number;
}> = ({ starCount = 200, color = "#00abf0", speed = 1 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="starfield">
        {Array.from({ length: starCount }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          const distance = Math.random() * 100;
          return (
            <div
              key={i}
              className="star"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${(1 / (distance / 100)) * 50 * speed}s`,
                animationDelay: `${Math.random() * 50}s`,
                opacity: Math.min(1, (size - 0.5) / 2),
                boxShadow: `0 0 ${size}px ${size / 2}px ${color}`,
              }}
            ></div>
          );
        })}
      </div>
      <style jsx>{`
        .starfield {
          position: absolute;
          width: 100%;
          height: 100%;
          perspective: 500px;
        }
        .star {
          position: absolute;
          background-color: ${color};
          border-radius: 50%;
          animation: starMotion linear infinite;
        }
        @keyframes starMotion {
          0% {
            transform: scale(0.2) translateZ(0);
          }
          100% {
            transform: scale(1) translateZ(300px);
          }
        }
      `}</style>
    </div>
  );
};

// Nebula Background
export const NebulaBackground: React.FC<{
  color1?: string;
  color2?: string;
  intensity?: number;
}> = ({
  color1 = "rgba(0,171,240,0.15)",
  color2 = "rgba(128,0,255,0.1)",
  intensity = 0.8,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => {
        const size = 150 + Math.random() * 300;
        const opacity = (Math.random() * 0.2 + 0.05) * intensity;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: size,
              height: size,
              backgroundColor: i % 2 === 0 ? color1 : color2,
              opacity,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Advanced Rain Animation Component
export const RainAnimation: React.FC<{ density?: number; color?: string }> = ({
  density = 30,
  color = "#00abf0",
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="rain-container">
        {Array.from({ length: density }).map((_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 1 + 0.5}s`,
              animationDelay: `${Math.random() * 2}s`,
              background: `linear-gradient(to bottom, transparent, ${color})`,
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        .rain-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .rain-drop {
          position: absolute;
          top: -20px;
          width: 1px;
          height: 20px;
          animation: rain-fall linear infinite;
        }
        @keyframes rain-fall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(100vh));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Floating Particles Animation
export const FloatingParticles: React.FC<{
  count?: number;
  color?: string;
  size?: number;
  opacity?: number;
}> = ({ count = 15, color = "#00abf0", size = 1, opacity = 0.4 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size * (Math.random() * 0.5 + 0.8)}px`,
            height: `${size * (Math.random() * 0.5 + 0.8)}px`,
            backgroundColor: color,
            opacity: opacity * (Math.random() * 0.5 + 0.5),
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Glowing Border Animation
export const GlowingBorder: React.FC<{
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  className?: string;
}> = ({ children, color = "#00abf0", intensity = 0.3, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          boxShadow: `0 0 15px ${intensity * 2}px ${color}`,
          opacity: 0,
        }}
        animate={{
          opacity: [0, intensity, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </div>
  );
};

// Moving Lines Animation
export const MovingLines: React.FC<{ color?: string; opacity?: number }> = ({
  color = "#00abf0",
  opacity = 0.3,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          opacity,
        }}
        animate={{
          y: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[80%] left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          opacity,
        }}
        animate={{
          y: [0, -5, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-0 top-0 left-[20%] w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          opacity,
        }}
        animate={{
          x: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-0 top-0 left-[80%] w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          opacity,
        }}
        animate={{
          x: [0, -5, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
};

// Moving Dots on Line
export const MovingDotsOnLine: React.FC<{
  count?: number;
  color?: string;
  lineColor?: string;
  direction?: "horizontal" | "vertical";
}> = ({
  count = 5,
  color = "#00abf0",
  lineColor = "rgba(0, 171, 240, 0.2)",
  direction = "horizontal",
}) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className={`absolute ${
          isHorizontal
            ? "left-0 right-0 h-px top-1/2"
            : "top-0 bottom-0 w-px left-1/2"
        }`}
        style={{ backgroundColor: lineColor }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#00abf0]"
            style={{
              width: "4px",
              height: "4px",
              [isHorizontal ? "top" : "left"]: "-2px",
              boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
            }}
            animate={{
              [isHorizontal ? "left" : "top"]: ["-1%", "101%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * (8 / count),
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Cyber Grid Background
export const CyberGrid: React.FC<{
  color?: string;
  opacity?: number;
  cellSize?: number;
}> = ({ color = "#00abf0", opacity = 0.1, cellSize = 40 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color} ${opacity} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} ${opacity} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: "transparent" }}
        animate={{
          backgroundPosition: ["0px 0px", `${cellSize}px ${cellSize}px`],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Glowing Orbs Animation
export const GlowingOrbs: React.FC<{
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
}> = ({ count = 3, color = "#00abf0", minSize = 100, maxSize = 300 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * (maxSize - minSize) + minSize;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              opacity: 0.05 + Math.random() * 0.1,
            }}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [
                `${Math.random() * 80}%`,
                `${Math.random() * 80}%`,
                `${Math.random() * 80}%`,
              ],
              y: [
                `${Math.random() * 80}%`,
                `${Math.random() * 80}%`,
                `${Math.random() * 80}%`,
              ],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Animated Gradient Background
export const AnimatedGradient: React.FC<{
  colors?: string[];
  duration?: number;
  className?: string;
}> = ({
  colors = ["#081b29", "#0a2942", "#081b29", "#072136"],
  duration = 15,
  className = "",
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: `linear-gradient(45deg, ${colors.join(", ")})`,
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Digital Circuit Animation
export const DigitalCircuit: React.FC<{
  color?: string;
  lineWidth?: number;
  nodeSize?: number;
  speed?: number;
}> = ({ color = "#00abf0", lineWidth = 1, nodeSize = 3, speed = 5 }) => {
  // Generate random circuit paths
  const paths = Array.from({ length: 8 }).map(() => {
    const points = [];
    let x = Math.random() * 20;
    let y = Math.random() * 20;

    points.push(`M${x},${y}`);

    for (let i = 0; i < 6; i++) {
      // Decide direction: horizontal or vertical
      const isHorizontal = Math.random() > 0.5;
      const distance = 10 + Math.random() * 30;

      if (isHorizontal) {
        x += distance * (Math.random() > 0.5 ? 1 : -1);
      } else {
        y += distance * (Math.random() > 0.5 ? 1 : -1);
      }

      points.push(`L${x},${y}`);
    }

    return points.join(" ");
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ opacity: 0.3 }}
      >
        {paths.map((path, i) => (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={lineWidth}
              strokeDasharray="5,5"
              style={{ opacity: 0.7 }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r={nodeSize}
              fill={color}
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: speed + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              style={{
                offsetPath: `path("${path}")`,
                boxShadow: `0 0 5px ${color}`,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// Matrix Rain Effect
export const MatrixRain: React.FC<{
  color?: string;
  density?: number;
  speed?: number;
}> = ({ color = "#00abf0", density = 25, speed = 1 }) => {
  const characters =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="matrix-rain">
        {Array.from({ length: density }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${(i / density) * 100}%`,
              animationDuration: `${speed * (Math.random() * 2 + 1)}s`,
              animationDelay: `${Math.random() * 2}s`,
              color,
            }}
          >
            {Array.from({ length: 15 }).map((_, j) => (
              <span
                key={j}
                style={{
                  animationDuration: `${speed * 0.5}s`,
                  animationDelay: `${j * 0.1}s`,
                }}
              >
                {characters[Math.floor(Math.random() * characters.length)]}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .matrix-column {
          position: absolute;
          top: -20%;
          font-size: 12px;
          line-height: 1;
          opacity: 0.5;
          text-shadow: 0 0 5px ${color};
          animation: matrix-fall linear infinite;
          white-space: nowrap;
        }
        .matrix-column span {
          display: block;
          opacity: 0;
          animation: matrix-glow ease-in-out infinite;
        }
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        @keyframes matrix-glow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default {
  RainAnimation,
  FloatingParticles,
  GlowingBorder,
  MovingLines,
  MovingDotsOnLine,
  CyberGrid,
  GlowingOrbs,
  AnimatedGradient,
  DigitalCircuit,
  MatrixRain,
  GalaxyAnimation,
  Starfield,
  NebulaBackground,
};
