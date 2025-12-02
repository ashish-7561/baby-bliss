BabyBliss | E-Commerce Progressive Web Application
Overview

BabyBliss is a specialized e-commerce interface built to demonstrate the capabilities of a modern Progressive Web Application (PWA). Developed using a mobile-first approach, the application delivers a native-like shopping experience directly through the browser. This project highlights structured React state management, responsive UI patterns, and integration with browser-native APIs.

Live Deployment: https://baby-bliss-eight.vercel.app/

Technical Specifications
Component	Technology Used
Frontend Framework	React 18 (Vite)
Styling System	Tailwind CSS
Iconography	Lucide React
Hosting & CI/CD	Vercel
Architecture	Progressive Web App (PWA)
Key Features
1. Mobile-First Architecture

The interface is optimized primarily for small-screen devices.
Key UI elements include:

A persistent bottom navigation bar

Touch-friendly buttons and layouts

Native-like transitions and spacing standards (iOS/Android patterns)

This ensures a smooth mobile shopping experience across browsers.

2. Web Notifications API Integration

The application showcases the implementation of the Notification API, including:

Permission request handling

Triggering simulated push notifications for promotional events

Demonstration of re-engagement features even when the tab is not active

This integration is designed to mimic real-world e-commerce alert workflows.

3. Cart State Management

A full shopping cart system built using React state logic:

Add/remove SKU items dynamically

Real-time subtotal and final price calculations

Maintains cart state across sessions (within browser lifecycle)

This module replicates foundational commerce behavior found in production-grade storefronts.

4. PWA Compliance & Installability

The project includes a fully configured manifest.json and service worker setup, enabling:

Installation directly to a mobile device's home screen

Standalone launch mode (without browser UI)

Device recognition as an installable PWA

This ensures compliance with modern PWA standards.
