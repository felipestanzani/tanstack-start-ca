# Clean Architecture Implementation

This TanStack Start boilerplate follows the Clean Architecture principles as defined by Robert C. Martin. The architecture is organized into distinct layers with clear dependency directions, providing a solid foundation for building maintainable and scalable React applications.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│  │    Routes       │ │   Controllers   │ │   Components   │ │
│  │   (UI Logic)    │ │  (HTTP Handlers)│ │  (React Views) │ │
│  └─────────────────┘ └─────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│  │   Use Cases     │ │   Services      │ │   DTOs         │ │
│  │ (Business Logic)│ │ (Orchestration) │ │ (Data Transfer)│ │
│  └─────────────────┘ └─────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│  │    Entities     │ │   Repositories  │ │ Domain Events  │ │
│  │ (Business Rules)│ │  (Interfaces)   │ │   (Events)     │ │
│  └─────────────────┘ └─────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ │
│  │   Repositories  │ │    Database     │ │  External APIs │ │
│  │ (Implementations)│ │   (Prisma)     │ │   (Services)   │ │
│  └─────────────────┘ └─────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
src/
├── core/                           # Core business logic (Domain + Application)
│   ├── domain/                     # Domain Layer
│   │   ├── entities/               # Business entities
│   │   │   ├── base.entity.ts      # Base entity with common properties
│   │   │   ├── counter.entity.ts   # Counter business entity (example)
│   │   │   └── index.ts            # Domain entities barrel export
│   │   └── repositories/           # Repository interfaces
│   │       ├── counter.repository.ts
│   │       └── index.ts
│   └── application/                # Application Layer
│       └── use-cases/              # Use cases (business operations)
│           ├── counter/
│           │   ├── get-counter.use-case.ts
│           │   ├── increment-counter.use-case.ts
│           │   └── index.ts
│           └── index.ts
├── infrastructure/                 # Infrastructure Layer
│   ├── repositories/               # Repository implementations
│   │   ├── prisma-counter.repository.ts
│   │   └── index.ts
│   └── di/                         # Dependency Injection
│       ├── container.ts            # DI container
│       └── index.ts
├── presentation/                   # Presentation Layer
│   └── controllers/                # HTTP request handlers
│       ├── counter.controller.ts
│       └── index.ts
├── routes/                         # TanStack Router routes
├── components/                     # React components
└── styles/                         # Styling
```

## Layer Responsibilities

### 1. Domain Layer (`src/core/domain/`)

- **Entities**: Core business objects with business rules and logic
- **Repository Interfaces**: Contracts for data access without implementation details
- **Domain Events**: Business events that occur within the domain
- **Value Objects**: Immutable objects that represent concepts in the business domain

**Key Principles:**

- No dependencies on outer layers
- Contains pure business logic
- Framework and technology agnostic

### 2. Application Layer (`src/core/application/`)

- **Use Cases**: Application-specific business rules and orchestration
- **Services**: Application services that coordinate domain objects
- **DTOs**: Data Transfer Objects for communication between layers

**Key Principles:**

- Depends only on the domain layer
- Orchestrates domain objects to fulfill use cases
- Contains application-specific business rules

### 3. Infrastructure Layer (`src/infrastructure/`)

- **Repository Implementations**: Concrete implementations of domain repository interfaces
- **Database Access**: Prisma client and database configurations
- **External Services**: Third-party API integrations
- **Dependency Injection**: Container for managing dependencies

**Key Principles:**

- Implements interfaces defined in inner layers
- Contains all external concerns (databases, APIs, frameworks)
- Can depend on all inner layers

### 4. Presentation Layer (`src/presentation/`)

- **Controllers**: HTTP request/response handling
- **Routes**: Application routing logic
- **Components**: React components and UI logic

**Key Principles:**

- Handles user interface concerns
- Depends on application and infrastructure layers
- Contains framework-specific code (React, TanStack Router)

## Dependency Rule

Dependencies always point inward:

- Presentation → Application → Domain
- Infrastructure → Application → Domain
- Infrastructure → Domain (for repository implementations)

This ensures that:

- Business logic is independent of external concerns
- Testing is easier with clear boundaries
- Changes in outer layers don't affect inner layers

## Example Usage

### Adding a New Feature

1. **Define the Domain Entity** (`src/core/domain/entities/`)

   ```typescript
   export class Product extends BaseEntity {
     constructor(
       id: string,
       public readonly name: string,
       public readonly price: number,
     ) {
       super(id);
     }
   }
   ```

2. **Create Repository Interface** (`src/core/domain/repositories/`)

   ```typescript
   export interface ProductRepository {
     findById(id: string): Promise<Product | null>;
     save(product: Product): Promise<void>;
   }
   ```

3. **Implement Use Cases** (`src/core/application/use-cases/`)

   ```typescript
   export class CreateProductUseCase {
     constructor(private productRepository: ProductRepository) {}

     async execute(
       request: CreateProductRequest,
     ): Promise<CreateProductResponse> {
       // Business logic here
     }
   }
   ```

4. **Implement Repository** (`src/infrastructure/repositories/`)

   ```typescript
   export class PrismaProductRepository implements ProductRepository {
     // Implementation using Prisma
   }
   ```

5. **Add Controller** (`src/presentation/controllers/`)

   ```typescript
   export const createProduct = createServerFn(/* ... */);
   ```

6. **Update DI Container** (`src/infrastructure/di/container.ts`)
   ```typescript
   const productRepository = new PrismaProductRepository();
   const createProductUseCase = new CreateProductUseCase(productRepository);
   ```

## Benefits

- **Testability**: Easy to unit test business logic in isolation
- **Maintainability**: Clear separation of concerns
- **Flexibility**: Easy to swap implementations (e.g., database providers)
- **Independence**: Business logic doesn't depend on frameworks
- **Scalability**: Architecture supports growing complexity

## Testing Strategy

- **Domain Layer**: Unit tests for entities and business rules
- **Application Layer**: Unit tests for use cases with mocked repositories
- **Infrastructure Layer**: Integration tests for repository implementations
- **Presentation Layer**: Component tests and API endpoint tests
