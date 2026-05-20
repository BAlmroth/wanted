# 🎮 Wanted - Find the Right Rune

An interactive web application where you race against time to find the correct characters based on emotional expressions. The game increases in difficulty through multiple levels with different emotions (happy, sad, angry, loving, and dead runes. Rune is a red panda from Yrgo).

🎮 **Play the game here:** [https://wantedatyrgo.vercel.app/](https://wantedatyrgo.vercel.app/)

## 📋 Table of Contents

- [About the Game](#-about-the-game)
- [How to Play](#-how-to-play)
- [Game Instructions & Warnings](#-game-instructions--warnings)
- [Tivoli Integration](#-tivoli-integration)
- [Installation & Setup](#-installation--setup)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

## 🎯 About the Game

**Wanted** is a fast-paced game where you must recognize and click on the correct characters based on emotional expressions. The game is divided into progressive levels:

- **Levels**: Increasing difficulty with more characters on screen and animations
- **Time Limits**: You start with 10sec that counts down and for every level you clear you get 2 extra sec.
- **Leaderboard**: Earn points and climb the leaderboard rankings
- **Emotions**: Find happy 😊, sad 😢, angry 😠, loving 💕 or dead 💀 Rune

## 🎮 How to Play

1. **Start the Game** - Click "Start" from the main screen
2. **Read Instructions** - See which Rune you need to find
3. **Click Quickly** - Find and click the correct character before time runs out
4. **Advance** - If you find the correct character, you advance to the next level
5. **Earn Points** - The faster you are, the more points you earn
6. **Complete All Levels** - Finish all levels to win

## ⚠️ Game Instructions & Warnings

Before you start playing, you will receive:
- **Game Instructions** - Learn the rules and how to play
- **Animation Warnings** - Information about animations that may appear in the game

You can always review these instructions by clicking the **"Game Info"** from the main screen.

## 🎪 Tivoli Integration

**IMPORTANT:** To play this game, you must access it from the **Tivoli website**.

This game is part of the Tivoli experience, and you need to come from the main Tivoli application to authenticate and play. Find Wanted at Yrgo in the Tivloi and play.

🔗 **Access Tivoli here:** [https://frontend-main-1ac7.up.railway.app/](https://frontend-main-1ac7.up.railway.app/)

> **Note:** This requirement may be removed in future versions when standalone access becomes available.

## 🚀 Installation & Setup

### Requirements
You need to have installed:
- **Node.js** (version 18 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (to clone the project) - [Download here](https://git-scm.com/)

### Step-by-Step Guide

#### 1. Clone the Project
```bash
git clone https://github.com/wilmareistad/wanted.git
cd wanted
```

#### 2. Install Dependencies
```bash
npm install
```

Or if you use yarn:
```bash
yarn install
```

#### 3. Configuration (Optional)
If you need to connect to backend services (Supabase for leaderboard), make sure you have the correct environment variables configured.

## 💻 Development

### Start Development Server
```bash
npm run dev
```

The application automatically opens at `http://localhost:5173`

## 🔨 Build & Deployment

### Create Production Build
```bash
npm run build
```

### Deployment
The project is configured for deployment on **Vercel**.

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool & Dev server |
| **React Router v7** | Navigation between pages |
| **Supabase** | Backend & Leaderboard |
| **CSS Modules** | Scoped styling |
| **ESLint** | Code quality |

## 📝 License

This project is licensed under the MIT License.

---

**Have fun playing! 🚀**
