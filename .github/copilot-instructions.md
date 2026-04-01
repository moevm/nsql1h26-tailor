# GitHub Copilot Instructions

## General Guidelines

* The repository is a **pnpm-based monorepo**.
* Use **TypeScript** across all packages.
* Avoid using `any`. Prefer `unknown` and define explicit types/interfaces for all non-trivial structures.
* Maintain strict typing throughout the codebase.

## Tooling & Configuration

* Use **Prettier** for formatting.

  * Include plugin for **sorting imports/dependencies**.
* Use **ESLint v10** with **flat config** located in the root of the repository.
* Ensure `.env` contains all required environment variables so that:

  ```bash
  docker compose up
  ```

  works without additional manual setup.

## Docker

* The project uses **docker-compose** for orchestration.
* Services must be configurable via `.env`.
* Ensure services are reproducible and isolated.

---

# Frontend Guidelines

## Stack

* Vue 3
* Naive UI
* Composition API
* Single File Components (SFC)
* Pinia
* VueUse
* Vue Router
* Chart.js + vue-chartjs
* @vicons/material (Material Design icons)
* SCSS (inside SFC)
* Vitest (testing)

## Component Conventions

* Use `<script setup>` syntax.
* Use `<style scoped>` for styles.
* Use **SCSS** for styling.

### Naming

* Custom components: **PascalCase**
* Naive UI / Vue Router components: **kebab-case**

## Imports

* Use alias: `frontend/src`
* Keep imports clean and sorted (via Prettier plugin)

## State Management (Pinia)

* Store naming convention:

  ```ts
  use<SomethingPascalCase>Store
  ```
* Stores must be **strictly typed**.
* Do NOT store component-specific state in stores.

  * Use **composables** instead.
* Prefer composables when global state is not required.

## Routing

* Use **lazy loading** for pages (dynamic imports).

## Utilities

* Prefer **VueUse** when it already provides a solution.

## HTTP

* Use **axios** as the HTTP client.
* Centralize API configuration.

## Charts

* Use **chart.js** with **vue-chartjs**.

## Testing

* Use **Vitest**.
* Write unit tests for composables, stores, and critical components.

---

# Backend Guidelines

## Stack

* NestJS
* SWC compiler

  * TypeScript compiled to CommonJS
  * `"module": "nodenext"`
* MongoDB
* Mongoose ODM
* Jest (testing)

## Architecture

* Follow **NestJS architecture principles**.
* Use **Nest CLI** to generate modules, controllers, and services.

## Validation

* Use:

  * `class-validator`
  * `class-transformer`
* Always validate DTOs.
* Use **pipes** for validation and transformation.

## Database

* Use **Mongoose ODM** for data access.
* Avoid raw queries unless:

  * It is not feasible via ODM
  * Or significantly more complex

## Transactions

* Use MongoDB transactions where consistency is required.

## Code Quality

* Avoid `any`.
* Prefer explicit typing for DTOs, schemas, and service responses.

## Health Module

* Include a **health check module**.

## Testing

* Use **Jest**.
* Cover services and controllers with unit/integration tests.

---

# Additional Practices

* Keep code modular and maintainable.
* Prefer reusable abstractions over duplication.
* Keep business logic out of controllers and components.
* Ensure consistency between frontend and backend types when possible.
