import React, { useEffect, useState } from "react";
import ChatPageDesktop from "./ChatPageDesktop";
import ChatPageMobile from "./ChatPageMobile";

// Hook to detect if the screen is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const ChatPage: React.FC = () => {
  const isMobile = useIsMobile();
  return isMobile ? <ChatPageMobile /> : <ChatPageDesktop />;
};

export default ChatPage; 