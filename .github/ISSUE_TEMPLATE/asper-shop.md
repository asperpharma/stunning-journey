---
name: Asper-shop
about: 'Describe this issue template''Execute the following Action Plan step-by-step.
  Do not skip details: Phase 1: Data Hygiene & Migration (CRITICAL) Analyze the ''PRODUCTS
  SOURCE 4'' CSV file. We currently have errors stating ''Too many subattributes for
  attribute: product detail'' and ''Value too long in attribute: id''. 1. Guide me
  to clean these specific rows so Matrixify does not reject them. 2. Ensure all image
  links are mapped to the ''Image Src'' column for Matrixify. 3. Generate the final
  clean CSV template ready for upload. Phase 2: Infrastructure & Domain 1. Provide
  the exact DNS records (A Record and CNAME) I need to change in GoDaddy to point
  to Shopify. 2. List the essential Shopify backend settings (Shipping Zones, Payment
  Gateways) I must configure before the design phase. Phase 3: Visual Build (PageFly/Shogun)
  1. Create a layout schema for the Homepage that features a ''Smart Filter'' section
  (e.g., Shop by Skin Concern: Acne, Dryness).'
title: '• It Fixes the Error First: Your source files indicated specific errors ("Value
  too long," "Too many subattributes"). This prompt forces the AI to solve that data
  blockage immediately, which is necessary before you can use Matrixify. • It Enforces
  Branding: It hard-codes your specific colors (#800020, #C5A028) and fonts so the
  AI doesn''t give you generic design advice. • It Defines the Logic: It clarifies
  that the chatbot isn''t just for support—it is a "Pharmacist" that needs to recommend
  products based on skin concerns, aligning with your "Smart Filter" requirement.'
labels: duplicate
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
