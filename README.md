# simple-vite-shadcn-ui-express

![Landing Page](./screenshots/landing.png)

A modern full-stack template using Vite, React, shadcn/ui components, and Express.js.

<p align="center">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=Vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white" alt="Express">
    <br>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white" alt="Nodemon">
    <img src="https://img.shields.io/badge/Radix%20UI-161618.svg?style=flat-square&logo=radix-ui&logoColor=white" alt="Radix UI">
</p>

## Screenshots

<details>
<summary>View more screenshots</summary>

### User Management
![User List](./screenshots/users.png)

### User Creation
![Add User Form](./screenshots/add-user.png)

</details>

## Features

- ⚡️ **Vite** for lightning-fast HMR and development
- 🎨 **shadcn/ui** components with Tailwind CSS
- 🔧 **Radix UI** primitives for accessible components
- 🌙 Dark mode support out of the box
- 🚀 **Express.js** backend with development proxy
- 📦 Modern module bundling and optimization
- 🔄 Hot Module Replacement (HMR)
- 🎯 Alias imports with '@/' prefix

## Quick Start

```bash
# Clone the template
git clone https://github.com/Avinava/simple-vite-react-express.git my-project
cd my-project

# Install dependencies
npm install

# Start development servers
npm run dev
```

## Environment Configuration

The template uses environment-specific configuration files:

- `.env.development` - Development environment settings
- `.env.production` - Production environment settings
- `.env.example` - Template for environment variables

### Environment Variables

```bash
# Server
PORT=3000                 # Server port (default: 3000)
NODE_ENV=development      # Environment (development/production)

# Database
DATABASE_URL=            # PostgreSQL connection string

# Client (Production only)
VITE_API_URL=           # Production API URL (empty in development)
CLIENT_URL=             # Allowed client origin for CORS
```

### Development Setup

In development:
- The client runs on port 5173 (Vite default)
- API requests are automatically proxied to the backend
- No need to set VITE_API_URL as proxy handles it

```bash
# Copy development env file
cp .env.development .env

# Start development servers
npm run dev
```

### Production Setup

In production:
- Set VITE_API_URL to your API domain
- Configure PORT for your hosting environment
- Set DATABASE_URL to your production database

```bash
# Copy production env file
cp .env.production .env

# Build and start
npm run build
npm start
```

## Backend Setup

### Database Setup

1. Copy the environment file and update with your database credentials:
```bash
cp .env.example .env
```

2. Update the `DATABASE_URL` in `.env` with your PostgreSQL credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

3. Initialize the database:
```bash
# Create and apply migrations
npm run db:migrate

# Generate Prisma Client
npm run db:generate

# Seed the database with sample data
npm run db:seed
```

### Available API Endpoints

The template includes a fully functional user management API:

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

Example API request:
```bash
# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"New User"}'
```

### Database Management

The template includes several database management scripts:

- `npm run db:migrate` - Create and apply database migrations
- `npm run db:deploy` - Deploy migrations in production
- `npm run db:seed` - Seed the database with sample data
- `npm run db:studio` - Open Prisma Studio to manage data
- `npm run db:generate` - Generate Prisma Client

### API Response Format

All API endpoints return responses in a standardized format:

```javascript
{
  "success": boolean,    // Operation status
  "data": any,          // Response payload
  "message": string,    // Human-readable message
  "timestamp": string   // ISO timestamp
}
```

## Template Structure

```
src/
├── client/               # Frontend React application
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/            # Utility functions
│   ├── pages/          # React pages
│   └── globals.css     # Global styles and Tailwind directives
└── server/             # Backend Express application
    ├── lib/            # Server libraries
    │   └── prisma.js   # Prisma client instance
    ├── middleware/     # Express middleware
    ├── routes/         # API routes
    ├── services/       # Business logic
    └── utils/          # Utility functions
```

## Development

```bash
# Start both client and server in development mode
npm run dev

# Start only the client (Vite)
npm run dev:client

# Start only the server (with Nodemon)
npm run dev:server
```

## Using shadcn/ui Components

This template comes with shadcn/ui pre-configured. To add new components:

```bash
# Install the shadcn/ui CLI if you haven't already
npm install -g @shadcn

# Add new components (from project root)
npx shadcn add button
npx shadcn add card
npx shadcn add dialog
```

### Currently Included Components

- ✓ Button
- ✓ Card
- ✓ Dialog
- ✓ Input
- ✓ Label
- ✓ Progress
- ✓ Separator
- ✓ Sheet
- ✓ Switch
- ✓ Table
- ✓ Tabs

### Customizing Components

1. **Theme Customization**
   - Edit `src/client/globals.css` to modify theme variables
   - Customize the Tailwind configuration in `tailwind.config.js`

2. **Component Styling**
   - Components are styled using Tailwind CSS
   - Modify component styles in `src/client/components/ui/`

3. **Adding New Components**
   ```bash
   # Example: Adding a new component
   npx shadcn-ui add dropdown-menu
   ```

## Configuration Files

- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.js` - Vite configuration with path aliases
- `jsconfig.json` - JavaScript configuration with path aliases

## Scripts

- `npm run dev` - Start development servers (client + server)
- `npm run build` - Build the client for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase
- `npm run preview` - Preview the production build locally

## Customizing the Template

1. **Update Project Information**
   - Modify `package.json` with your project details
   - Update this README with your project specifics

2. **Environment Setup**
   - Create `.env` file if needed for environment variables
   - Configure server port in `vite.config.js` and `server/index.js`

3. **Adding Routes**
   - Express routes go in `src/server/index.js`
   - Add new API endpoints as needed

4. **Frontend Customization**
   - Modify `src/client/App.jsx` for layout changes
   - Add new components in `src/client/components/`
   - Update styles in `src/client/globals.css`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.