# LTerm - Language Learning Dictionary App

A modern, feature-rich React application for creating and managing language learning modules with interactive study modes including flashcards and testing.

![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff?style=flat&logo=vite)
![IndexedDB](https://img.shields.io/badge/Storage-IndexedDB-orange?style=flat)

## 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Application Overview](#application-overview)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [Browser Support](#browser-support)
- [License](#license)

---

## ✨ Features

### Core Functionality

- **Module Management** - Create, edit, view, and delete language learning modules
- **Word Pair Editor** - Add and manage translation pairs with full CRUD operations
- **Import/Export** - Import modules from external data sources
- **Offline-First** - All data stored locally using IndexedDB (no server required)

### Learning Modes

1. **Flashcards Mode** - Swipe-based card learning with spaced repetition mechanics
   - Swipe right to mark as learned
   - Swipe left to mark for review
   - Animated card transitions
   - Progress tracking

2. **Test Mode** - Quiz-based assessment with multiple choice questions
   - Real-time progress tracking
   - Session statistics
   - Restart capability

3. **Learning Entry** - Configurable learning sessions with customizable parameters
   - Module selection
   - Mode selection
   - Reverse translation option

### User Interface

- **Dark Theme** - Modern dark color scheme optimized for extended study sessions
- **Responsive Design** - Fully responsive layout for desktop and mobile devices
- **Navigation** - Intuitive navigation with burger menu for mobile
- **Statistics Dashboard** - Track total modules, word pairs, and completed sessions
- **Recently Used** - Quick access to recently studied modules

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI framework |
| **React Router DOM** | 7.5.1 | Client-side routing |
| **Vite** | 6.2.0 | Build tool & dev server |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Sass (Embedded)** | 1.85.1 | CSS preprocessor |
| **SCSS** | - | Styling with variables and mixins |

### Storage

| Technology | Version | Purpose |
|------------|---------|---------|
| **idb** | 8.0.2 | IndexedDB wrapper for async storage |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.21.0 | Code linting |
| **vite-plugin-svgr** | 4.3.0 | SVG imports as React components |

---

## 📁 Project Structure

```
dictionary-react-app/
├── public/
│   └── icons/                  # Static assets (logo, favicons)
├── src/
│   ├── app/                    # Core application code
│   │   ├── consts/             # Constants (routes, paths, colors, DB config)
│   │   ├── helpers/            # Utility functions (DB, modules, stats controllers)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── icons/              # SVG icon files
│   │   ├── styles/             # Global SCSS styles
│   │   └── App.jsx             # Main app component with routing
│   ├── components/             # Shared components
│   │   ├── NavBar/             # Navigation bar with burger menu
│   │   └── ProgressModal/      # Session progress modal
│   ├── modules/                # Feature modules
│   │   └── Header/             # App header with logo and navigation
│   ├── pages/                  # Page components (route-based)
│   │   ├── HomePage/           # Dashboard with stats and quick actions
│   │   ├── ViewPage/           # Module list view
│   │   ├── EditingPage/        # Module editor with word pair management
│   │   ├── LearningEntryPage/  # Learning session configuration
│   │   ├── CardsModePage/      # Flashcards learning mode
│   │   └── TestModePage/       # Quiz/test learning mode
│   ├── ui/                     # Reusable UI components
│   │   ├── Button/             # Styled button component
│   │   ├── IconBtn/            # Icon button component
│   │   ├── Input/              # Text input component
│   │   ├── Modal/              # Modal dialog component
│   │   ├── PageTitle/          # Page title component
│   │   ├── ProgressBar/        # Progress indicator
│   │   ├── RadioGroup/         # Radio button group
│   │   ├── Select/             # Dropdown select component
│   │   └── Toggle/             # Toggle switch component
│   ├── main.jsx                # Application entry point
│   └── index.scss              # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── jsconfig.json               # JavaScript path aliases
└── eslint.config.js            # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dictionary-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code analysis |

---

## 📱 Application Overview

### Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Dashboard with statistics and quick actions |
| `/view` | `ViewPage` | Browse all created modules |
| `/editing/:id` | `EditingPage` | Create or edit module (id=-1 for new) |
| `/learn/:id` | `LearningEntryPage` | Configure learning session |
| `/learn/:id/cards` | `CardsModePage` | Flashcards learning mode |
| `/learn/:id/test` | `TestModePage` | Quiz/test mode |

### Database Schema

The application uses IndexedDB with the following stores:

```javascript
{
  // Module metadata (title, description, etc.)
  modulesMeta: {
    id: number (auto-increment),
    title: string,
    // ... additional metadata
  },
  
  // Module dictionaries (word pairs)
  modulesDicts: {
    id: number,
    dictionary: [
      { left: string, right: string },
      // ... word pairs
    ]
  },
  
  // User statistics
  userStats: {
    id: 'global',
    totalSessionsCompleted: number,
    recentlyUsedModuleIds: number[]
  }
}
```

---

## 📖 Usage Guide

### Creating a New Module

1. Click **"Create New Module"** on the home page
2. Enter module title and description
3. Add word pairs (term + translation)
4. Save the module

### Editing a Module

1. Navigate to **"Modules"** view
2. Click the edit icon on any module
3. Modify word pairs or module details
4. Save changes

### Starting a Learning Session

1. Click **"Continue Learning"** or select a module from recently used
2. Choose a module from the dropdown
3. Select learning mode (Flashcards or Test)
4. Configure options (e.g., reverse translation)
5. Click **"Start"**

### Flashcards Mode

- **Click/Tap** card to flip and see translation
- **Swipe right** or click ✓ to mark as learned
- **Swipe left** or click ✗ to mark for review
- Complete all cards to finish session

### Test Mode

- Answer multiple-choice questions
- Track progress with the progress bar
- View results at session end
- Restart or exit after completion

---

## ⚙️ Configuration

### Path Aliases

The project uses `@` as an alias for `src/`:

```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
})
```

### Environment Variables

No environment variables are required. All data is stored locally in IndexedDB.

---

## 🌐 Browser Support

The application requires modern browser features:

- **IndexedDB** - For local data storage
- **ES Modules** - For JavaScript module loading
- **CSS Custom Properties** - For theming
- **Dialog Element** - For modal components

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

---

## 📄 License

This project is private and not licensed for public distribution.

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the repository maintainer.

---

## 📞 Support

For technical support or questions about this application, please refer to the project documentation or contact the development team.
