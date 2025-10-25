// components/ui/flags.js
// SVG Flag Components
export const EnglishFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#012169"/>
    <path d="M0 0h24v2.4H0V0zm0 4.8h24v2.4H0V4.8zm0 4.8h24v2.4H0V9.6zm0 4.8h24V16H0v-1.6z" fill="white"/>
    <path d="M0 0v16l8-8L0 0zm24 0v16l-8-8L24 0z" fill="#C8102E"/>
    <path d="M10.4 0H13.6V16H10.4V0z" fill="white"/>
    <path d="M0 6.4h24v3.2H0V6.4z" fill="white"/>
    <path d="M0 6.4h24v1.6H0V6.4z" fill="#C8102E"/>
    <path d="M0 8h24v1.6H0V8z" fill="#C8102E"/>
    <path d="M10.4 0H13.6V16H10.4V0z" fill="#C8102E"/>
  </svg>
);

// Afghanistan Flag - Three Vertical Stripes
export const AfghanistanFlag = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="8" height="16" fill="#000000"/>
    <rect x="8" width="8" height="16" fill="#D32011"/>
    <rect x="16" width="8" height="16" fill="#007A36"/>
  </svg>
);
// Export both with different names for consistency
export const PashtoFlag = AfghanistanFlag;
export const DariFlag = AfghanistanFlag;