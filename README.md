#  WANTED AT YRGO

An interactive web application where you race against time to find the correct characters based on emotional expressions. The game increases in difficulty through multiple levels with different emotions (happy, sad, angry, loving, and dead Rune. Rune is a red panda from Yrgo).

 **Play the game here:** [https://wantedatyrgo.vercel.app/](https://wantedatyrgo.vercel.app/)

## About the Game

**WANTED AT YRGO** is a fast-paced game where you must recognize and click on the correct characters based on emotional expressions. The game is divided into progressive levels:

- **Levels**: Starting with a static grid and progressing to animated carousel-style gameplay
- **Time Limits**: You start with 10 seconds that counts down, and for every level you clear you get 2 extra seconds
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

This game can run in two modes, allowing flexible deployment for both production and development environments.

### Tivoli Mode (Production)

In **Tivoli mode**, the game is fully integrated with the Tivoli platform:
- **Requires authentication** via Tivoli identity token from the main Tivoli application
- **Real leaderboard** - Scores are saved to Supabase and ranked globally
- **Payment integration** - Uses Centralbank API for transactions and payouts
- Players earn actual rewards for high scores

To play in production, access the game through Tivoli:
- **Access Tivoli here:** [https://loopland.se/](https://loopland.se/)
- Find "Wanted at Yrgo" in the Tivoli platform and start playing

### Standalone Mode (Development)

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

**Have fun playing!**
