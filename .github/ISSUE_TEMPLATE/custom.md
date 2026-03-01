---
name: Custom issue template
about: Describe this issue template's purpose here.
title: "This visual guide outlines a strategic social media rollout for Asper, a premium
  beauty brand introducing a digital concierge service. The campaign is structured
  into three distinct phases: initial teaser images to build anticipation, high-end
  launch visuals showing the interface on various devices, and educational content
  that explains the user experience. By highlighting features like pharmacist curation
  and AI-driven smart filters, the marketing materials aim to position the brand as
  a sophisticated blend of professional expertise and modern technology. Ultimately,
  the collection serves as a blueprint for communicating a personalised skincare journey
  that is both luxurious and scientifically grounded."
labels: documentation
assignees: asperpharma
---

🏗️ Phase 1: The "System Architect" Prompt Before building a single page, use
this prompt to set the rules. This ensures every component follows your
Celestial Luxury guidelines.

# Context: You are a senior React/Next.js developer building "Asper Beauty Shop," a high-end beauty and supplement store.

# Technical Stack: Next.js (App Router), Tailwind CSS, Lucide Icons, and Framer Motion for animations.

# Visual Identity:

Primary Color: Deep Merlot/Burgundy (#2a0a18)

Secondary Color: Metallic Gold Gradients

Vibe: "Celestial Luxury" meets "Royal Organic."

Typography: Use a sophisticated Serif for headings and clean Sans-serif for
body.

# Task: Do not build the pages yet. Create a theme.config or a Tailwind configuration and a global layout structure that includes these color variables and a reusable "LuxuryCard" component with gold-foiled borders and soft merlot shadows.

🛍️ Phase 2: The "iHerb-Style" Structural Prompt Use this to build the navigation
and structural bones that can handle 5,000 SKUs.

# Task: Build a high-performance Navigation Header and Sidebar for a catalog of 5,000 products.

# Structure Requirements:

Search: A "Command+K" style smart search bar centered in the header.

Mega Menu: A luxury dropdown for categories (Supplements, Skincare, Haircare,
Cosmetics).

Performance: The sidebar must use a "Virtual List" or "Skeleton Loading" state
to handle deep category nesting without lag.

Aesthetic: The sidebar should be semi-transparent Merlot with a Gold border on
the right.

🌉 Phase 3: The "Shopify API" Integration Prompt This is crucial for connecting
your 5,000 products from Shopify to your Lovable frontend.

# Task: Set up the "Shopify Storefront API" connection logic.

# Requirements:

Create a utility file shopify-client.ts to fetch products using GraphQL.

The prompt should include a "Product Detail Page" (PDP) structure that maps:
product.title, product.description, product.variants, and product.images.

Error Handling: If a product is out of stock, show a "Notify Me" button in
Metallic Gold instead of an "Add to Cart" button.

🤖 Phase 4: The "Smart Beauty Chatbot" UI Prompt Since you want an omnichannel
bot, build the UI container first.

# Task: Design a floating "Beauty Oracle" chatbot widget.

# Interaction: > * When closed: A golden celestial icon with a pulsing glow.

When open: A Deep Merlot chat window with Gold accents.

Feature: Include a "Skin Analysis" button at the top of the chat and a "WhatsApp
Support" shortcut at the bottom.

Logic: Use a mock-up response state that simulates a "Thinking" animation before
showing the bot's answer.

Prompt by Section: Never say "Build the home page." Say "Build the Hero Section
with a Video Background," then "Build the Featured Products Grid."

The "Edit" Feature: If you don't like a specific button, use the Select tool in
Lovable, click the button, and type: "Make this more 'Gold foil' and add a 0.5s
hover lift animation."

Use Placeholders: Since you have 5,000 products, tell Lovable: "Use a
placeholder array of 10 luxury beauty products for now; I will map the real
Shopify API later."

Would you like me to generate the "Custom CSS" code for that specific Deep
Merlot and Gold theme so you can paste it directly into Lovable?

give me the best custom css that you can get out og your recourses
