import { useEffect } from "react";
import { getGorgiasConfig, initializeGorgias } from "@/lib/gorgias";

/**
 * GorgiasChat component
 * This component handles the initialization of the Gorgias chat widget
 * It should be included once in the app, typically in the main App component
 */
export const GorgiasChat = () => {
  useEffect(() => {
    const config = getGorgiasConfig();
    
    // Only initialize if enabled and widget ID is provided
    if (config.enabled && config.widgetId) {
      initializeGorgias(config);
    }
    
    // Cleanup function
    return () => {
      // Remove Gorgias script if component unmounts
      const script = document.getElementById("gorgias-chat-widget-install");
      if (script) {
        script.remove();
      }
      
      // Clean up the global GorgiasChat object
      if (window.GorgiasChat) {
        delete window.GorgiasChat;
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};
