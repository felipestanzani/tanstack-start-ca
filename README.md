# TanStack Start Clean Architecture

A modern boilerplate for building full-stack React applications with TanStack Start, implementing **Clean Architecture** principles for maintainable, testable, and scalable code.

## 🚀 Tech Stack

### Frontend

- **React 19.1.1** with TypeScript
- **TanStack Start 1.132.19** - Full-stack React framework
- **TanStack Router 1.132.19** - Type-safe file-based routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible component library
- **Radix UI** - Primitive components for complex UI
- **Lucide React** - Beautiful icon library

### Backend & Database

- **TanStack Start Server Functions** - Full-stack capabilities
- **Prisma** - Modern database toolkit and ORM
- **SQLite** - Lightweight database

### Development Tools

- **Vite 7.1.7** - Lightning-fast build tool
- **TypeScript 5.9.2** - Type safety and enhanced DX
- **ESLint** - Code linting with comprehensive presets
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing framework

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** or **yarn** or **pnpm**

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:felipestanzani/tanstack-start-ca.git
   cd tanstack-start-ca
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database:**

   Generate the Prisma client from the schema:

   ```bash
   pnpm db:generate
   ```

   Create the SQLite database and apply the schema:

   ```bash
   pnpm db:push
   ```

## 🚀 Development

### Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

#### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

#### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

#### Testing

- `pnpm test` - Run tests with Vitest
- `pnpm test:run` - Run tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage

#### Database

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema changes to database
- `pnpm db:migrate` - Create and apply migrations
- `pnpm db:studio` - Open Prisma Studio for database management

## 🏗️ Clean Architecture Structure

This project follows **Clean Architecture** principles with clear separation of concerns and dependency inversion. For detailed architecture documentation, see [CLEAN_ARCHITECTURE.md](./CLEAN_ARCHITECTURE.md).

```
tanstack-start-clean-architecture/
├── prisma/                         # Database schema and migrations
│   └── schema.prisma
├── src/
│   ├── core/                       # Core Business Logic (Domain + Application Layers)
│   │   ├── domain/                 # 🟦 Domain Layer (Innermost)
│   │   │   ├── entities/           # Business entities with domain logic
│   │   │   │   ├── base.entity.ts  # Base entity with common properties
│   │   │   │   ├── counter.entity.ts # Counter business entity
│   │   │   │   └── index.ts        # Domain entities barrel export
│   │   │   ├── events/             # Domain events
│   │   │   │   └── index.ts
│   │   │   ├── repositories/       # Repository interfaces (contracts)
│   │   │   │   ├── counter.repository.ts
│   │   │   │   └── index.ts
│   │   │   └── value-objects/      # Domain value objects
│   │   │       └── index.ts
│   │   └── application/            # 🟨 Application Layer
│   │       ├── dtos/               # Data Transfer Objects
│   │       │   └── index.ts
│   │       ├── services/           # Application services
│   │       │   └── index.ts
│   │       └── use-cases/          # Use cases (business operations)
│   │           ├── counter/
│   │           │   ├── get-counter.use-case.ts
│   │           │   ├── increment-counter.use-case.ts
│   │           │   └── index.ts
│   │           └── index.ts
│   ├── infrastructure/             # 🟩 Infrastructure Layer
│   │   ├── di/                     # Dependency Injection
│   │   │   ├── container.ts        # DI container
│   │   │   └── index.ts
│   │   └── repositories/           # Repository implementations
│   │       ├── prisma-counter.repository.ts
│   │       └── index.ts
│   ├── presentation/               # 🟪 Presentation Layer
│   │   └── controllers/            # HTTP request handlers
│   │       ├── counter.controller.ts
│   │       └── index.ts
│   ├── components/                 # React UI components
│   │   ├── theme-provider.tsx
│   │   └── ui/                     # shadcn/ui components
│   │       └── button.tsx
│   ├── lib/                        # Utility functions
│   │   └── utils.ts
│   ├── routes/                     # File-based routing (TanStack Router)
│   │   ├── __root.tsx              # Root layout
│   │   └── index.tsx               # Home page
│   ├── styles/                     # Global styles
│   │   └── app.css
│   ├── tests/                      # Test files organized by layer
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       └── get-counter.use-case.test.ts
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       └── counter.entity.test.ts
│   │   └── setup.ts
│   ├── router.tsx                  # Router configuration
│   └── routeTree.gen.ts            # Generated route tree
├── components.json                 # shadcn/ui configuration
├── package.json
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── eslint.config.mjs               # ESLint configuration
├── CLEAN_ARCHITECTURE.md           # Detailed architecture documentation
└── README.md
```

## 🧱 Architecture Layers

### 🟦 Domain Layer (`src/core/domain/`)

The innermost layer containing pure business logic:

- **Entities**: Core business objects with domain rules (e.g., `Counter`)
- **Repository Interfaces**: Contracts for data access
- **Domain Events**: Business events within the domain
- **Value Objects**: Immutable domain concepts

### 🟨 Application Layer (`src/core/application/`)

Orchestrates business operations:

- **Use Cases**: Application-specific business rules
- **DTOs**: Data transfer objects for layer communication
- **Services**: Application services coordinating domain objects

### 🟩 Infrastructure Layer (`src/infrastructure/`)

Handles external concerns:

- **Repository Implementations**: Concrete data access implementations
- **Dependency Injection**: DI container for managing dependencies
- **External Services**: Third-party integrations

### 🟪 Presentation Layer (`src/presentation/`)

User interface and API endpoints:

- **Controllers**: HTTP request/response handlers using TanStack Start
- **Routes**: Application routing with TanStack Router
- **Components**: React UI components

## 🧪 Testing Strategy

The project includes comprehensive testing organized by architecture layer:

```
src/tests/
├── application/        # Application layer tests
├── domain/            # Domain layer tests
├── infrastructure/    # Infrastructure layer tests
└── presentation/      # Presentation layer tests
```

### Test Types

- **Unit Tests**: Testing individual components and business logic
- **Integration Tests**: Testing layer interactions
- **End-to-End Tests**: Testing complete user workflows

## 🗄️ Database

This project uses **SQLite** with **Prisma** for data persistence.

### Database Schema

The application uses a simple `Counter` table with the following structure:

```prisma
model Counter {
  id        String   @id
  value     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Repository Implementation

The counter persistence uses database storage (`PrismaCounterRepository`):

- Implements the `CounterRepository` interface
- Uses SQLite for data persistence
- Supports the default counter with automatic creation
- Handles upsert operations for counter updates
- Maintains full compatibility with existing use cases

_Note: The Prisma client is generated to the standard location (`node_modules/@prisma/client`) for better ES module compatibility with Vite/TanStack Start._

## ⚡ State Management with TanStack Query

This project uses **TanStack Query** for all client-server state synchronization and UI data fetching. Benefits include:

- **Automatic caching** and background updates
- **Optimistic UI** for instant feedback on mutations
- **Error handling** and retry logic out of the box
- **DevTools** for query/mutation debugging

### Query Setup

- The `QueryClient` is configured in [`src/lib/query-client.ts`](src/lib/query-client.ts) and provided at the root via `QueryClientProvider` in [`src/routes/__root.tsx`](src/routes/__root.tsx).
- React Query DevTools are enabled in development for easy debugging.

### Custom Hooks

- `useCounter()` — Fetches the current counter value
- `useIncrementCounter()` — Increments the counter (with optimistic update)

See [`src/hooks/use-counter.ts`](src/hooks/use-counter.ts) for implementation details.

### Example Usage (Home Page)

The home page demonstrates:

- **Live counter value** with auto-refresh
- **Increment button** with instant UI feedback
- **Loading and error states**
- **Optimistic updates** for a snappy user experience

## 🆕 Counter Feature Demo

- Increment the counter with instant feedback
- UI disables button during loading/mutation
- Error messages and retry options for failed requests
- Powered by TanStack Query hooks and server functions

## 🎯 Features

This boilerplate includes:

- ✅ **Clean Architecture** implementation
- ✅ **Type-safe routing** with TanStack Router
- ✅ **Server-side rendering** with TanStack Start
- ✅ **Database integration** with Prisma + SQLite
- ✅ **UI components** with shadcn/ui
- ✅ **Testing setup** with Vitest
- ✅ **Code quality** with ESLint and Prettier
- ✅ **Dependency injection** container
- ✅ **Example counter feature** demonstrating architecture
- ✅ **State management with TanStack Query** (caching, mutations, optimistic updates)
- ✅ **React Query DevTools** for development
- ✅ **Increment counter with optimistic UI**

## 📚 Learn More

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Clean Architecture principles by Robert C. Martin
- TanStack team for amazing React tools
- shadcn for the beautiful UI components
- The open-source community for inspiration and tools
