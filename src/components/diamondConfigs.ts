import type { DiamondConfig } from './Diamond';

export const heroDiamondConfig: DiamondConfig[] = [
  // --- TOP ZONE (0% - 20%) ---
  { size: 180, top: "8%", left: "15%", opacity: 0.15, parallax: -0.06, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 60, top: "5%", left: "32%", opacity: 0.22, parallax: -0.12, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 80, top: "12%", left: "45%", opacity: 0.25, parallax: -0.15, color1: "#40b0df", color2: "#007ba7" }, // DEEP
  { size: 110, top: "7%", left: "62%", opacity: 0.14, parallax: -0.05, color1: "#cbe6f2", color2: "#8fc2da" },
  { size: 220, top: "5%", left: "80%", opacity: 0.08, parallax: -0.04, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 45, top: "18%", left: "92%", opacity: 0.2, parallax: -0.1, color1: "#e3f3fa", color2: "#b8dbea" },
  { size: 130, top: "16%", left: "25%", opacity: 0.18, parallax: -0.08, color1: "#d9f0f8", color2: "#a5d1e4" },

  // --- TOP-MIDDLE ZONE (20% - 40%) ---
  { size: 380, top: "30%", left: "5%", opacity: 0.05, parallax: -0.03, color1: "#cfe8f3", color2: "#9cc7db" },
  { size: 70, top: "25%", left: "20%", opacity: 0.26, parallax: -0.18, color1: "#40b0df", color2: "#007ba7" }, // DEEP
  { size: 90, top: "38%", left: "35%", opacity: 0.18, parallax: -0.12, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 140, top: "32%", left: "52%", opacity: 0.25, parallax: -0.1, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 120, top: "25%", left: "72%", opacity: 0.22, parallax: -0.15, color1: "#d9f0f8", color2: "#a5d1e4" },
  { size: 260, top: "35%", left: "82%", opacity: 0.15, parallax: -0.12, color1: "#cbe6f2", color2: "#8fc2da" },
  { size: 65, top: "32%", left: "42%", opacity: 0.2, parallax: -0.2, color1: "#40b0df", color2: "#007ba7" }, // DEEP

  // --- MIDDLE ZONE (40% - 60%) ---
  { size: 110, top: "45%", left: "10%", opacity: 0.22, parallax: -0.14, color1: "#e3f3fa", color2: "#b8dbea" },
  { size: 160, top: "48%", left: "30%", opacity: 0.16, parallax: -0.09, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 500, top: "50%", left: "55%", opacity: 0.08, parallax: -0.08, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 180, top: "55%", left: "78%", opacity: 0.28, parallax: -0.1, color1: "#40b0df", color2: "#007ba7" }, // DEEP
  { size: 140, top: "55%", left: "15%", opacity: 0.2, parallax: -0.1, color1: "#cfe8f3", color2: "#9ecfe3" },
  { size: 85, top: "45%", left: "90%", opacity: 0.28, parallax: -0.13, color1: "#d9f0f8", color2: "#a5d1e4" },
  { size: 100, top: "52%", left: "42%", opacity: 0.12, parallax: -0.07, color1: "#22a3d0", color2: "#0091ca" }, // DEEP

  // --- BOTTOM-MIDDLE ZONE (60% - 80%) ---
  { size: 420, top: "65%", left: "18%", opacity: 0.1, parallax: -0.05, color1: "#cfe8f3", color2: "#9ecfe3" },
  { size: 70, top: "70%", left: "40%", opacity: 0.35, parallax: -0.18, color1: "#40b0df", color2: "#007ba7" }, // DEEP
  { size: 100, top: "75%", left: "60%", opacity: 0.15, parallax: -0.05, color1: "#e3f3fa", color2: "#b8dbea" },
  { size: 300, top: "68%", left: "88%", opacity: 0.07, parallax: -0.04, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 120, top: "68%", left: "32%", opacity: 0.2, parallax: -0.1, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 150, top: "75%", left: "72%", opacity: 0.14, parallax: -0.08, color1: "#d9f0f8", color2: "#cfe8f3" },
  { size: 55, top: "62%", left: "50%", opacity: 0.4, parallax: -0.18, color1: "#40b0df", color2: "#007ba7" }, // DEEP

  // --- BOTTOM ZONE (80% - 100%) ---
  { size: 160, top: "100%", left: "10%", opacity: 0.14, parallax: -0.09, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 50, top: "92%", left: "25%", opacity: 0.3, parallax: -0.2, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 90, top: "82%", left: "42%", opacity: 0.22, parallax: -0.14, color1: "#cfe8f3", color2: "#9cc7db" },
  { size: 240, top: "88%", left: "65%", opacity: 0.1, parallax: -0.06, color1: "#40b0df", color2: "#007ba7" }, // DEEP
  { size: 110, top: "95%", left: "85%", opacity: 0.22, parallax: -0.13, color1: "#e3f3fa", color2: "#b8dbea" },
  { size: 130, top: "85%", left: "95%", opacity: 0.15, parallax: -0.08, color1: "#22a3d0", color2: "#0091ca" }, // DEEP
  { size: 75, top: "90%", left: "50%", opacity: 0.25, parallax: -0.12, color1: "#d8eef7", color2: "#a7d3e6" },
  { size: 200, top: "95%", left: "5%", opacity: 0.08, parallax: -0.04, color1: "#40b0df", color2: "#007ba7" }, // DEEP
];