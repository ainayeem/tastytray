# TastyTray

## Meal Planning & Delivery Web Application

## Overview

The **Meal Planning & Delivery Web Application** is a platform that allows customers to personalize meal plans based on dietary preferences and schedule deliveries. Meal providers can manage menus, respond to customer orders, and track deliveries efficiently.

## Features

### 1. User Authentication

- Secure authentication using **JWT (JSON Web Tokens)**.
- Custom login system for customers and meal providers via email or phone number and password.
- Password hashing with **bcrypt** for enhanced security.

### 2. Customer and Meal Provider Dashboards

- **Customer Dashboard:** Allows meal selection, order tracking, and preference management.
- **Meal Provider Dashboard:** Enables menu management, order responses, and delivery tracking.

### 3. Meal Selection & Preferences

- Customers can choose meal plans and customize meals based on dietary preferences (e.g., vegan, keto, gluten-free).
- Meal providers can create/update meal options with details like ingredients, portion sizes, and pricing.

### 4. Search and Match

- Customers can search for meals based on cuisine type, dietary needs, ratings, and availability.
- Meal providers can view customer meal preferences to tailor offerings.

### 5. Role-Based Access Control

- Separate views and features for customers and meal providers.
- Optional **admin access** for managing users and content.

### 6. CRUD Operations

- Customers can create, view, and update meal plans/preferences.
- Meal providers can view and respond to customer meal requests.

## Tech Stack

### **Frontend:**

- **Next.js** (for SSR/SSG capabilities)
- **React** (for dynamic user interfaces)
- **TypeScript** (for type safety)

## Frontend Routes

### **For Customers:**

- **Home Page (/):** Overview of platform benefits.
- **Login Page (/login):** Customer login.
- **Dashboard (/dashboard/customer):**
  - Select Meals: Browse meal options and customize orders.
  - Track Orders: View past and ongoing deliveries.
  - Manage Preferences: Set dietary restrictions and portion sizes.
- **Profile (/profile/customer):** Edit personal details.
- **Find Meals (/find-meals):** Search meals based on preferences and ratings.
- **Order Meal (/order-meal):** Place meal orders with scheduling and customization options.

### **For Meal Providers:**

- **Home Page (/):** Overview of platform benefits.
- **Login Page (/login):** Meal provider login.
- **Dashboard (/dashboard/provider):**
  - Manage Menus: Create and update meal offerings.
  - View Orders: See customer orders and preferences.
  - Respond to Orders: Accept, modify, or decline requests.
- **Profile (/profile/provider):** Edit profile details (cuisine specialties, pricing, availability).
- **Post Meal Menu (/post-meal-menu):** Upload detailed meal menus for customer browsing.
- **Order Responses (/responses):** Confirm or decline customer orders.

## Installation & Setup

1. **Clone the Repository:**
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Application:**
   ```bash
   npm run dev
   ```
4. **Open in Browser:**
   ```
   http://localhost:3000
   ```
