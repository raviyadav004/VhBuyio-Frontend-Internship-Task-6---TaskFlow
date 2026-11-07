# 🚀 TaskFlow

> **A modern task management application built for focused work, clean organization, and a seamless user experience.**

TaskFlow is a modern and responsive task management application developed as part of a **Frontend Development Internship Task** using Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, SQLite, and Zod.

The application provides a clean workspace for creating, viewing, searching, filtering, updating, and deleting tasks while demonstrating practical CRUD functionality, reusable components, API integration, form validation, database persistence, dynamic routing, and responsive UI development.

---

## ✨ Features

### 📋 Task Management

- ✅ Create new tasks.
- 👁️ View detailed task information.
- ✏️ Edit existing tasks.
- 🗑️ Delete tasks with confirmation.
- 🔄 Update task status.
- 🎯 Set task priority.
- ⭐ Mark tasks as favorites.
- 📅 Add optional due dates.
- 📝 Add detailed task descriptions.
- 💾 Persist task data using SQLite.

### 🔎 Search & Organization

- 🔍 Search tasks by title.
- 🏷️ Filter tasks by available criteria.
- 📄 Paginate task results.
- 🎯 Organize tasks by status and priority.
- ⭐ Identify important tasks using favorites.
- 📈 View task progress through dashboard statistics.
- ⚡ Centralized API-based data operations.

### 🎨 User Interface

- 💎 Modern and polished dashboard.
- 📱 Responsive desktop, tablet, and mobile layouts.
- ☀️ Light theme.
- 🌙 Dark theme.
- ✨ Smooth hover and transition effects.
- 🧭 Intuitive navigation.
- 🎯 Clear visual hierarchy.
- ⏳ Dedicated loading states.
- ❌ Dedicated error states.
- 🚫 Custom not-found experience.
- ♿ Accessibility-conscious interface.
- 🧩 Reusable UI components.
- 🦶 Consistent application footer.

### 🛡️ Validation & Data Handling

- ✅ Shared Zod validation schemas.
- 🔐 Server-side API request validation.
- 🧩 Type-safe TypeScript implementation.
- 🗄️ Prisma ORM integration.
- 💾 SQLite database persistence.
- 📅 Calendar-date validation for due dates.
- 📦 Structured API responses.
- ⚠️ Centralized API error handling.
- 🔄 Dedicated service layer for database operations.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React 19 | Component-based user interface |
| ▲ Next.js 15 | React framework and App Router |
| 🔷 TypeScript | Type-safe development |
| 🎨 Tailwind CSS 4 | Responsive and utility-first styling |
| 🗄️ Prisma ORM 6 | Type-safe database operations |
| 💾 SQLite | Lightweight relational database |
| 🛡️ Zod 4 | Schema-based validation |
| 🎯 Lucide React | Interface icons |
| 🔌 Next.js API Routes | HTTP-based application endpoints |
| 📦 npm | Dependency management |

---

## 🏗️ Application Architecture

TaskFlow follows a **layered application architecture** that separates the user interface, API communication, request validation, business operations, and database access.

### Architecture Overview

```text
┌─────────────────────────────────┐
│          User Interface         │
│         Next.js + React         │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│            API Client           │
│         lib/api/tasks.ts        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│           API Routes            │
│       GET / POST / PATCH        │
│             DELETE              │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│         Zod Validation          │
│       Request Validation        │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│          Service Layer          │
│     lib/services/task.service   │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│            Prisma ORM           │
│       Database Operations       │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│          SQLite Database        │
│         Persistent Storage      │
└─────────────────────────────────┘
```

### 🔄 Core Data Flow

```text
User Interaction
       ↓
React UI Component
       ↓
API Client
       ↓
Next.js API Route
       ↓
Zod Request Validation
       ↓
Task Service Layer
       ↓
Prisma ORM
       ↓
SQLite Database
       ↓
Structured API Response
       ↓
Updated User Interface
```

### 🧩 Architecture Responsibilities

| Layer | Responsibility |
|---|---|
| UI Components | Rendering and user interactions |
| API Client | HTTP requests and response handling |
| API Routes | Request handling and HTTP responses |
| Validation | Validating incoming task data |
| Service Layer | Task-related business and database operations |
| Prisma | Database queries and persistence |
| SQLite | Persistent task storage |

The task list uses client-side API fetching, while task detail and edit pages can retrieve their data through the server-side service layer.

This separation keeps UI components independent of direct database operations and makes the application easier to maintain.

---

## 📁 Project Structure

```text
TaskFlow/
│
├── 📂 app/
│   ├── 📄 page.tsx
│   ├── 📄 layout.tsx
│   ├── 📄 globals.css
│   ├── 📄 error.tsx
│   ├── 📄 not-found.tsx
│   │
│   ├── 📂 api/
│   │   └── 📂 tasks/
│   │       ├── 📄 route.ts
│   │       └── 📂 [id]/
│   │           └── 📄 route.ts
│   │
│   └── 📂 tasks/
│       ├── 📄 page.tsx
│       ├── 📄 loading.tsx
│       ├── 📂 new/
│       │   └── 📄 page.tsx
│       └── 📂 [id]/
│           ├── 📄 page.tsx
│           └── 📂 edit/
│               └── 📄 page.tsx
│
├── 📂 components/
│   ├── 📄 Navbar.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 TaskForm.tsx
│   ├── 📄 TaskCard.tsx
│   ├── 📄 TasksPageClient.tsx
│   ├── 📄 SearchBar.tsx
│   ├── 📄 DeleteButton.tsx
│   ├── 📄 StatusBadge.tsx
│   └── 📄 ThemeToggle.tsx
│
├── 📂 lib/
│   ├── 📂 api/
│   │   └── 📄 tasks.ts
│   ├── 📂 services/
│   │   └── 📄 task.service.ts
│   ├── 📄 prisma.ts
│   └── 📄 validations.ts
│
├── 📂 prisma/
│   ├── 📄 schema.prisma
│   └── 📂 migrations/
│       ├── 📂 20261002170032_init/
│       │   └── 📄 migration.sql
│       └── 📄 migration_lock.toml
│
├── 📂 types/
│   ├── 📄 api.ts
│   └── 📄 task.ts
│
├── 📄 global.d.ts
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 eslint.config.mjs
├── 📄 next.config.ts
├── 📄 next-env.d.ts
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 postcss.config.mjs
├── 📄 tsconfig.json
└── 📄 README.md
```

> Generated files such as `.next/`, `node_modules/`, local environment files, and development database files are excluded from the source architecture.

---

## 🧩 Application Routes

| Route | Purpose |
|---|---|
| `/` | 🏠 TaskFlow dashboard |
| `/tasks` | 📋 Task management workspace |
| `/tasks/new` | ➕ Create a new task |
| `/tasks/[id]` | 👁️ View task details |
| `/tasks/[id]/edit` | ✏️ Edit an existing task |
| Invalid route | 🚫 Custom not-found experience |

---

## 🔌 API Endpoints

TaskFlow uses Next.js Route Handlers to expose structured HTTP endpoints for task operations.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/[id]` | Retrieve a specific task |
| PATCH | `/api/tasks/[id]` | Update task information |
| DELETE | `/api/tasks/[id]` | Delete a task |

### API Features

- Structured JSON responses.
- Request validation using Zod.
- Consistent success and failure response formats.
- Appropriate HTTP status codes.
- Task-not-found handling.
- Centralized database operations through the service layer.

---

## 🔐 Validation & Error Handling

TaskFlow uses shared Zod schemas to validate task information before database operations.

### 🛡️ Validation Flow

```text
Incoming Request
       ↓
Request Body
       ↓
Zod Schema Validation
       ↓
   Valid Input?
    /       \
  Yes        No
   ↓          ↓
Service     Validation
Layer       Error Response
   ↓
Prisma ORM
```

The validation layer handles:

- Title requirements and length limits.
- Description requirements and length limits.
- Valid task statuses.
- Valid task priorities.
- Optional due dates.
- Calendar-date validation.
- Valid update payloads.

### ⚠️ Application States

The application provides dedicated handling for:

- ⏳ Loading states.
- 📭 Empty task states.
- ❌ Unexpected application errors.
- 🔍 Missing tasks.
- 🚫 Invalid routes.
- 🛡️ Invalid form input.
- ⚠️ API request failures.

---

## 💾 Database

TaskFlow uses:

**Prisma ORM + SQLite**

SQLite provides lightweight relational persistence, while Prisma provides a structured and type-safe interface for database operations.

### 📦 Task Data Model

The current Prisma Task model supports:

```text
id
title
description
status
priority
dueDate
isFavorite
createdAt
updatedAt
```

### 🗄️ Database Features

- Unique task identifiers.
- Default task status: `TODO`.
- Default task priority: `MEDIUM`.
- Optional due dates.
- Automatic creation timestamps.
- Automatic update timestamps.
- Database indexes for frequently queried fields.
- Persistent SQLite storage.

### 📊 Task Statuses

| Status | Description |
|---|---|
| 📝 `TODO` | Task is waiting to be started |
| 🔄 `IN_PROGRESS` | Task is currently being worked on |
| ✅ `COMPLETED` | Task has been finished |

### 🎯 Task Priorities

| Priority | Description |
|---|---|
| 🟢 `LOW` | Lower-priority task |
| 🟡 `MEDIUM` | Standard-priority task |
| 🔴 `HIGH` | Higher-priority task |

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/raviyadav004/VhBuyio-Frontend-Internship-Task-6---TaskFlow.git
```

### 2. Navigate to the Project

```bash
cd VhBuyio-Frontend-Task-6---TaskFlow
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a local `.env` file using `.env.example` as the reference.

Configure the SQLite database connection according to the project's Prisma configuration.

Never commit private environment variables or credentials.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Apply Database Migrations

```bash
npx prisma migrate dev
```

### 7. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Quality Verification

Before submission or deployment, run the following checks:

### TypeScript

```bash
npx tsc --noEmit
```

### ESLint

```bash
npm run lint
```

### Prisma Validation

```bash
npx prisma validate
```

### Prisma Client Generation

```bash
npx prisma generate
```

### Production Build

```bash
npm run build
```

A successful production build verifies the configured compilation, linting, type-checking, page generation, and build optimization stages.

### Current Local Verification Record

The latest recorded local verification confirms:

| Check | Result |
|---|---|
| Prisma Client generation | ✅ Passed |
| TypeScript type checking | ✅ Passed |
| ESLint | ✅ Passed |
| Production build | ✅ Passed |
| Next.js route generation | ✅ Passed |

These results describe the recorded local verification run, not a guarantee about future code changes.

---

## 🎬 Suggested Demo Flow

For a clean internship evaluation or portfolio demonstration, use the following workflow.

### 🏠 1. Open Dashboard

Introduce the application's purpose and dashboard.

### 📋 2. Open Task Manager

Demonstrate the main Tasks workspace.

### ➕ 3. Create a Task

Create a task using:

- Title
- Description
- Status
- Priority
- Due date
- Favorite state

### 🔎 4. Search and Filter

Demonstrate task search, filtering, and pagination.

### 👁️ 5. View Details

Open a task and demonstrate its complete information.

### ✏️ 6. Edit

Modify task information and save the changes.

### ⭐ 7. Toggle Favorite

Mark and unmark a task as a favorite.

### 🗑️ 8. Delete

Demonstrate the deletion confirmation flow.

### 🌙 9. Test the Interface

Demonstrate:

- ☀️ Light theme.
- 🌙 Dark theme.
- 🖥️ Desktop layout.
- 💻 Laptop layout.
- 📱 Mobile layout.

---

## 🎨 Design Philosophy

> **Focus on the work, not the tool.**

TaskFlow follows a clean and focused design approach:

- 🎯 Clear visual hierarchy.
- 🧘 Minimal distractions.
- 📐 Consistent spacing.
- 🧩 Reusable UI patterns.
- 📱 Responsive layouts.
- 🌗 Theme-aware components.
- ✨ Subtle interaction feedback.
- 🧭 Simple navigation.

The goal is to make task management feel **clear, fast, and predictable**.

---

## 📱 Responsive Design

TaskFlow is designed to adapt across different screen sizes.

| Device | Layout |
|---|---|
| 🖥️ Desktop | Full workspace layout |
| 💻 Laptop | Adapted content and navigation |
| 📱 Tablet | Responsive navigation and content |
| 📱 Mobile | Compact, mobile-friendly interface |

Responsive behavior is applied across navigation, forms, task cards, buttons, and page content.

---

## ♿ Accessibility

The interface follows accessibility-conscious development practices, including:

- Semantic HTML structure.
- Accessible navigation labels.
- Keyboard-focus styles.
- Appropriate button and link semantics.
- `aria-current` for active navigation.
- `aria-invalid` and `aria-describedby` for form validation.
- Clear interactive states.
- Logical visual hierarchy.
- Responsive interaction patterns.

---

## 📊 Project Highlights

| Area | Implementation |
|---|---|
| 🖥️ Framework | Next.js + React |
| 🔷 Language | TypeScript |
| 🎨 Styling | Tailwind CSS |
| 🧩 UI Architecture | Reusable components |
| 🔌 API Communication | Fetch-based API client |
| 🛣️ API Layer | Next.js Route Handlers |
| ⚙️ Service Layer | Centralized task operations |
| 🗄️ ORM | Prisma |
| 💾 Database | SQLite |
| 🛡️ Validation | Zod |
| 🔎 Search | Task title search |
| 🏷️ Organization | Filtering and pagination |
| ⭐ Favorites | Favorite task management |
| 📅 Scheduling | Optional due dates |
| 🌙 Theme | Light / Dark |
| 📱 Responsive | Desktop, tablet, and mobile |
| 🚨 Error Handling | Loading, empty, error, and not-found states |

---

## 🧠 What This Project Demonstrates

TaskFlow demonstrates practical understanding of modern frontend development and Next.js application concepts:

- ⚛️ React component architecture.
- ▲ Next.js App Router.
- 🔷 TypeScript.
- 🎨 Tailwind CSS.
- 🧩 Reusable component development.
- 🔌 API integration.
- 🛣️ REST-style API endpoint design.
- 🛡️ Schema validation with Zod.
- ⚙️ Separation of UI, API, and service layers.
- 🔀 Dynamic routing.
- 📱 Responsive UI development.
- ♿ Accessibility-conscious UI.
- 🎨 Theme implementation.
- 🗄️ Prisma ORM integration.
- 💾 SQLite persistence.
- 🏗️ Structured application architecture.
- 🔄 Complete CRUD workflow.

---

## 🚀 Future Improvements

The current implementation focuses on the assigned task-management requirements.

Potential future enhancements include:

- 👤 User authentication.
- 👥 Multi-user workspaces.
- 🏷️ Advanced task tagging.
- 📊 Productivity analytics.
- 🔔 Notifications and reminders.
- 📅 Calendar integration.
- ☁️ Cloud database deployment.
- 🔄 Real-time collaboration.
- 📈 Advanced dashboard metrics.
- 🔐 Role-based access control.
- 📎 File attachments.
- 🔗 Task dependencies.
- 🗂️ Custom workspaces and projects.

> These are potential future enhancements and are not represented as implemented features.

---

## 📌 Important Notes

### 🔐 Environment Variables

Do not commit private environment variables, credentials, or secrets to GitHub.

Keep local environment configuration in `.env`.

The `.env.example` file should contain only safe configuration examples.

### 💾 Local SQLite Database

The local SQLite database is intended for development.

Do not commit your personal development database if the repository is configured to ignore it.

Keep Prisma migration files under `prisma/migrations/` tracked in Git. They are part of the project's database schema history.

### 🧹 Generated Files

Generated files and local dependencies should not be committed to the repository.

Typical ignored entries include:

```gitignore
node_modules/
.next/
out/
*.tsbuildinfo
.env
.env.local
.env.*.local
!.env.example
```

---

## 👨‍💻 Author

### Ravi Yadav

**Built with ❤️ using Next.js, React, TypeScript, Prisma, and SQLite.**