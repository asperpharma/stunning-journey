# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the
[Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and
start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push
changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed -
[install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once
  you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Development Tools & Integration

All development tools are properly connected and integrated:

#### Build & Development
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **React SWC**: Fast refresh and compilation

#### Testing
- **Vitest**: Fast unit testing framework
- **Testing Library**: React component testing
- **jsdom**: Browser environment simulation

#### Code Quality
- **ESLint**: Code linting with TypeScript support
- **React Hooks Plugin**: Ensures proper React hooks usage
- **React Refresh Plugin**: Fast refresh during development

#### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

#### API Integration
- **Shopify Storefront API**: E-commerce functionality
- **TanStack Query**: Server state management
- **Zustand**: Client state management

#### CI/CD
- **GitHub Actions**: Automated testing and building
- Runs on Node.js 18.x, 20.x, and 22.x
- Executes lint, test, and build on every push/PR

### Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Preview production build
npm run preview
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and
click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect
Domain.

Read more here:
[Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
