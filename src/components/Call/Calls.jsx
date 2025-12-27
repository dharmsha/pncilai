"use client";

import { useEffect, useRef, useState } from "react";
import { IoCallSharp } from "react-icons/io5";

const CallWithWhatsAppWidget = () => {
  const [widgetReady, setWidgetReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [widgetFailed, setWidgetFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    // Inject AiSensy WhatsApp Widget Script
    if (!document.getElementById("aisensy-wa-widget")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
      script.id = "aisensy-wa-widget";
      script.setAttribute("widget-id", "aaa1xm"); // Your widget ID
      script.async = true;

      script.onload = () => {
        let attempts = 0;
        const maxAttempts = 10;

        const checkWidget = setInterval(() => {
          attempts++;
          if (typeof window.va === "function") {
            clearInterval(checkWidget);
            setWidgetReady(true);
            setLoading(false);
            try {
              window.va("init");
            } catch (e) {
              setWidgetFailed(true);
            }
          } else if (attempts >= maxAttempts) {
            clearInterval(checkWidget);
            setLoading(false);
            setWidgetFailed(true);
          }
        }, 500);
      };

      script.onerror = () => {
        setLoading(false);
        setWidgetFailed(true);
      };

      document.body.appendChild(script);
    } else {
      setWidgetReady(true);
      setLoading(false);
    }

    // Scroll logic for showing call button
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = window.pageYOffset;
        const windowWidth = window.innerWidth;
        const documentHeight = document.body.scrollHeight;
        const showAt = windowWidth > 768 ? 150 : 100;
        const hideAt = documentHeight - window.innerHeight - 200;

        setIsVisible(scrollPosition > showAt && scrollPosition < hideAt);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Hide AiSensy Branding */}
      <style>{`.df-bottombar-branding { display: none !important; }`}</style>

      {/* Floating Call Button */}
      {isVisible && (
        <div className="hidden md:flex fixed top-1/2 right-4 transform -translate-y-1/2 flex-col gap-3 z-50">
          <a
            href="tel:9262919322"
            className="hover:opacity-85 hover:scale-105 transition-all"
            title="Call us"
          >
            <div className="bg-green-500 p-3 md:p-4 rounded-full">
              <IoCallSharp size={28} color="white" />
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default CallWithWhatsAppWidget;
