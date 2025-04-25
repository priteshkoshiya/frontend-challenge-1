# Todo List Application

A modern, responsive Todo List application built with Next.js, React, and TypeScript, using Nx for monorepo management.

## Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- Git

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- RecoilJS (State Management)
- Nx (Monorepo Management)

## Features
- Client-side application
- Responsive design
- Modern UI with animations
- State management with RecoilJS
- Type-safe development with TypeScript
- Styled with Tailwind CSS

## Project Structure
```
nx/
├── apps/
│   └── todo-app/         # Main Next.js application
├── .vscode/              # VS Code configuration
├── node_modules/         # Dependencies
└── configuration files   # Various config files (tsconfig, eslint, etc.)
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nx
   ```

2. Install dependencies with specific versions:
   ```bash
   # Install Nx CLI globally
   npm install -g nx@19.8.1

   # Install project dependencies
   npm install

   # Install required Nx plugins with matching versions
   npm install -D @nx/react@19.8.1 @nx/next@19.8.1 @nx/web@19.8.1
   ```

3. Start the development server:
   ```bash
   # Using Nx
   npx nx serve todo-app

   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

If you encounter plugin-related errors:

1. Check Nx version compatibility:
   ```bash
   nx report
   ```

2. Fix version mismatches:
   ```bash
   # Update all Nx packages to the same version
   npm install -D nx@19.8.1 @nx/react@19.8.1 @nx/next@19.8.1 @nx/web@19.8.1
   ```

3. Clear Nx cache and reinstall:
   ```bash
   npx nx reset
   rm -rf node_modules
   npm install
   ```

4. If using Windows PowerShell, try using Command Prompt instead for running Nx commands
