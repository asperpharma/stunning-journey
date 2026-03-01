# Gorgias Integration Guide

This document explains how to set up and use the Gorgias chat widget in the Shopify Connect application.

## What is Gorgias?

Gorgias is a customer support platform that provides a live chat widget for e-commerce websites. It helps businesses provide real-time support to their customers directly on their website.

## Setup Instructions

### 1. Get Your Gorgias Widget ID

1. Log in to your [Gorgias dashboard](https://app.gorgias.com/)
2. Navigate to **Settings** > **Chat** > **Installation**
3. Copy your Chat Widget ID (it will look something like: `eyJhbGc...`)

### 2. Configure Environment Variables

Create a `.env` file in the root directory of the project (or update your existing one) and add:

```bash
VITE_GORGIAS_WIDGET_ID=your-widget-id-here
VITE_GORGIAS_ENABLED=true
```

**Note:** Replace `your-widget-id-here` with your actual Gorgias Widget ID.

### 3. Optional: Disable Gorgias

If you want to temporarily disable the Gorgias chat widget without removing your configuration:

```bash
VITE_GORGIAS_ENABLED=false
```

## How It Works

The Gorgias integration consists of three main components:

1. **`src/lib/gorgias.ts`**: Core utility functions for initializing and managing the Gorgias widget
2. **`src/components/GorgiasChat.tsx`**: React component that loads the Gorgias widget
3. **`src/App.tsx`**: Integrates the GorgiasChat component into the application

### Technical Details

- The Gorgias widget is loaded asynchronously to avoid blocking the page load
- The widget script is only loaded if a valid Widget ID is provided
- The widget can be programmatically opened/closed using the provided utility functions

## Usage

### Programmatic Control

You can control the Gorgias chat widget programmatically using the utility functions:

```typescript
import { openGorgiasChat, closeGorgiasChat, isGorgiasLoaded } from "@/lib/gorgias";

// Open the chat widget
openGorgiasChat();

// Close the chat widget
closeGorgiasChat();

// Check if Gorgias is loaded
if (isGorgiasLoaded()) {
  console.log("Gorgias is ready!");
}
```

### Example: Adding a Support Button

You can add a custom button to open the chat:

```typescript
import { openGorgiasChat } from "@/lib/gorgias";

function SupportButton() {
  return (
    <button onClick={openGorgiasChat}>
      Need Help? Chat with us
    </button>
  );
}
```

## Troubleshooting

### Chat widget doesn't appear

1. **Check your Widget ID**: Ensure `VITE_GORGIAS_WIDGET_ID` is correctly set in your `.env` file
2. **Check if enabled**: Verify `VITE_GORGIAS_ENABLED` is not set to `false`
3. **Check browser console**: Look for any error messages related to Gorgias
4. **Verify your Gorgias account**: Make sure your Gorgias account is active and the chat widget is enabled in your Gorgias dashboard

### Widget loads but doesn't work

1. Check your browser's ad blocker - it might be blocking the Gorgias script
2. Verify your Gorgias account settings in the Gorgias dashboard
3. Check browser console for JavaScript errors

## Production Deployment

When deploying to production, make sure to:

1. Set the `VITE_GORGIAS_WIDGET_ID` environment variable in your hosting platform
2. Ensure the environment variable is prefixed with `VITE_` so Vite can expose it to the client
3. Rebuild your application after changing environment variables

### Platform-Specific Instructions

**Vercel:**
```
Settings > Environment Variables > Add:
VITE_GORGIAS_WIDGET_ID=your-widget-id-here
```

**Netlify:**
```
Site Settings > Build & Deploy > Environment > Add:
VITE_GORGIAS_WIDGET_ID=your-widget-id-here
```

## Security Note

The Gorgias Widget ID is safe to expose in client-side code as it's designed to be public. However, never expose your Gorgias API keys or admin credentials.

## Support

For issues related to:
- **This integration**: Check the troubleshooting section above or contact your development team
- **Gorgias platform**: Visit [Gorgias Help Center](https://help.gorgias.com/) or contact Gorgias support
