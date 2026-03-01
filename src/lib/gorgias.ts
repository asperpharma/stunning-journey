// Gorgias Chat Widget Configuration
// This module handles the initialization and management of the Gorgias chat widget

export interface GorgiasConfig {
  widgetId: string;
  enabled?: boolean;
}

// Default configuration - can be overridden with environment variables
export const getGorgiasConfig = (): GorgiasConfig => {
  return {
    // In production, this should come from environment variables
    // For now, using a placeholder that needs to be replaced with actual Gorgias Widget ID
    widgetId: import.meta.env.VITE_GORGIAS_WIDGET_ID || "",
    enabled: import.meta.env.VITE_GORGIAS_ENABLED !== "false",
  };
};

/**
 * Initialize Gorgias chat widget
 * This function dynamically loads the Gorgias chat widget script
 */
export const initializeGorgias = (config: GorgiasConfig): void => {
  if (!config.enabled || !config.widgetId) {
    console.log("Gorgias chat widget is disabled or widget ID is not configured");
    return;
  }

  // Check if script is already in the DOM
  const existingScript = document.getElementById("gorgias-chat-widget-install");
  if (existingScript) {
    console.log("Gorgias chat widget script is already loaded");
    return;
  }

  // Check if Gorgias is already loaded
  if (window.GorgiasChat) {
    console.log("Gorgias chat widget is already initialized");
    return;
  }

  try {
    // Create and append the Gorgias script
    const script = document.createElement("script");
    script.id = "gorgias-chat-widget-install";
    script.src = `https://config.gorgias.chat/gorgias-chat-bundle-loader/${config.widgetId}`;
    script.async = true;
    
    script.onload = () => {
      console.log("Gorgias chat widget loaded successfully");
    };
    
    script.onerror = () => {
      console.error("Failed to load Gorgias chat widget");
    };

    document.head.appendChild(script);
  } catch (error) {
    console.error("Error initializing Gorgias chat widget:", error);
  }
};

/**
 * Open Gorgias chat widget
 */
export const openGorgiasChat = (): void => {
  if (window.GorgiasChat?.open) {
    window.GorgiasChat.open();
  } else {
    console.warn("Gorgias chat widget is not available");
  }
};

/**
 * Close Gorgias chat widget
 */
export const closeGorgiasChat = (): void => {
  if (window.GorgiasChat?.close) {
    window.GorgiasChat.close();
  }
};

/**
 * Check if Gorgias chat widget is loaded
 */
export const isGorgiasLoaded = (): boolean => {
  return !!window.GorgiasChat;
};

// Type augmentation for window object
declare global {
  interface Window {
    GorgiasChat?: {
      open: () => void;
      close: () => void;
      init: () => void;
    };
  }
}
