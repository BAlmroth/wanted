#  WANTED AT YRGO

An interactive web application where you race against time to find the wanted character in a sea of different characters. Created as a part of the school project **Tivoli** consisting of small games integrated in a collective tivoli site and api.

After the schoolproject ends 27th of may the game will be a standalone game playable below.

**Play the game here:** [WANTED AT YRGO](https://wantedatyrgo.vercel.app/)
**Tivoli site:** [LOOPLAND](https://loopland.se/)

---

## Table of Contents

- [About the Game](#about-the-game)
- [How to Play](#how-to-play)
- [Game Instructions & Warnings](#game-instructions--warnings)
- [Tivoli Integration](#tivoli-integration)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database (Supabase)](#database-supabase)
- [Build & Deployment](#build--deployment)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## About the Game

**WANTED AT YRGO** is a fast-paced game where you must recognize and click on the correct characters based on emotional expressions. The game is divided into progressive levels:

- **Levels**: Starting with a static grid and progressing to animated carousel-style gameplay
- **Time Limits**: You start with 10 seconds that counts down, and for every level you clear you get 4 extra seconds
- **Dynamic Animations**: Later levels include carousel animations with varying speeds, direction, and "shakiness" effects
- **Leaderboard**: Earn points and climb the leaderboard rankings
- **Emotions**: Find happy, sad, angry, loving or dead Rune

## How to Play

1. **Start the Game** - Click "Start" from the main screen
2. **Read Instructions** - See how to play
3. **Game starting** - See which Rune you need to find
4. **Click Quickly** - Find and click the correct character before time runs out
5. **Advance** - If you find the correct character, you advance to the next level
6. **Earn Points** - The faster you are, the more points you earn (based on levels)
7. **Complete All Levels** - Finish all levels to win

## Game Instructions & Warnings

Before you start playing, you will receive:
- **Game Instructions** - Learn the rules and how to play
- **Animation Warnings** - Information about animations that may appear in the game

You can always review these instructions by clicking the **"Game Info"** from the main screen.

## Tivoli Integration

This game can run in two modes, allowing flexible deployment for the mentioned tivoli project and independent webapp.

### Tivoli Mode

In **Tivoli mode**, the game is fully integrated with the Tivoli platform:
- **Requires authentication** via Tivoli identity token from the main Tivoli application
- **Real leaderboard** - Scores are saved to Supabase and ranked globally
- **Payment integration** - Uses Centralbank API for transactions and payouts
- Players earn actual rewards for high scores

Access the game through Tivoli:
- **Access Tivoli here:** [LOOPLAND](https://loopland.se/)
- Find "Wanted at Yrgo" in the Tivoli platform and start playing

### Standalone Mode

In **standalone mode**, the game runs independently without external dependencies:
- **No authentication required** - Perfect for local testing and development
- **Mock data** - Simulated leaderboard and game sessions
- **No payment integration** - Gameplay without transaction handling
- **Great for demos** - Show off the game without backend setup

### Switching Modes

To switch between modes, edit `src/config.ts`:

```typescript
// For Tivoli mode (default - production):
export const TIVOLI_MODE = true;

// For Standalone mode:
export const TIVOLI_MODE = false;
```

When standalone mode is enabled (`TIVOLI_MODE = false`), the application will automatically use mock implementations for all backend services.

## Installation & Setup

### Requirements
- **Node.js** (version 18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** (to clone the project) - [Download here](https://git-scm.com/)

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/wilmareistad/wanted.git
cd wanted
```

#### 2. Install Dependencies
```bash
npm install
```

Or with yarn:
```bash
yarn install
```

#### 3. Choose Your Mode

By default, the game runs in **Tivoli mode**. To develop or test locally in **standalone mode**, edit `src/config.ts`:

```typescript
export const TIVOLI_MODE = false; // Set to false for standalone development
```

#### 4. Start the Development Server
```bash
npm run dev
```

The game opens automatically at `http://localhost:5173`

### Backend Configuration (Tivoli Mode Only)

If running in Tivoli mode, ensure these services are configured:
- **Supabase** - Database and leaderboard
- **Centralbank API** - Payment processing
- **Tivoli Identity Token** - Passed from the main Tivoli platform

## Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Centralbank API (used in Tivoli mode)
VITE_CENTRALBANK_URL=https://your-centralbank-api-url
VITE_CENTRALBANK_API_KEY=your-centralbank-api-key

# Tivoli host (used for "Back to Tivoli" links)
VITE_TIVOLI_URL=https://loopland.se
```

> **Note:** Variables must start with `VITE_` to be available in the frontend (Vite requirement). If you run standalone mode (`TIVOLI_MODE = false`), backend integrations are mocked and external APIs/Supabase are not required.

## Database (Supabase)

The game uses Supabase for secure level generation and click validation. The correct answer is never exposed to the client, keeping the game tamper-proof.

### Tables

- **`figures`** – Stores all possible characters in the game grid (Rune + emojis). Public read access via RLS.
- **`game_sessions`** – Stores the secret target index for each generated level. Not accessible from the client.

### Functions

- **`generate_level(count)`** – Picks a random target character, builds the grid, saves the secret target index server-side, and returns the session ID, target character, and full grid to the client.
- **`validate_click(session_id, clicked_index)`** – Compares the clicked index against the stored secret. Returns `true` if correct and marks the session as used, preventing replay.

### Setup

Run the following SQL files in your Supabase SQL editor in order:

1. `/supabase/schema.sql` – Creates tables, inserts figures, and configures RLS policies
2. `/supabase/functions.sql` – Creates the `generate_level` and `validate_click` functions

## Build & Deployment

### Create Production Build
```bash
npm run build
```

### Deployment
The project is configured for deployment on **Vercel**.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool & Dev server |
| **React Router v7** | Navigation between pages |
| **Supabase** | Backend & Leaderboard |
| **CSS Modules** | Scoped styling |
| **ESLint** | Code quality |

## License

This project is licensed under the MIT License.

---

**By Benita Almroth and Wilma Reistad**