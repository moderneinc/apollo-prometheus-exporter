# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Apollo Server plugin that exports metrics in Prometheus format. It provides comprehensive monitoring for GraphQL operations including query execution, parsing, validation, and field resolution durations.

## Architecture

The codebase is organized in a modular structure:

- **Core Plugin (`lib/src/`)**: Main library code
  - `plugin.ts`: Main plugin factory and configuration
  - `metrics.ts`: Prometheus metrics definitions and management
  - `hooks.ts`: Apollo Server lifecycle hooks implementation
  - `context.ts`: Configuration context and type definitions
  - `endpoint.ts`: Express endpoint registration for `/metrics`
  - `helpers.ts`: Utility functions

- **Example Application (`example/src/`)**: Working demonstration
  - Complete Apollo Server setup with the plugin integrated
  - Includes GraphQL schema, resolvers, and server configuration

## Key Development Commands

### Build and Development

```bash
# Build the library
yarn lib:build

# Start example server with hot reload
yarn start
# or
yarn example:start:watch

# Generate GraphQL types for example
yarn example:codegen

# Run load testing against example server
yarn example:simulate-activity
```

### Code Quality

```bash
# Format code
yarn prettier

# Run lint-staged (triggered by Husky)
yarn lint-staged
```

### Release

```bash
# Release new version (uses semantic-release)
yarn release
```

## Architecture Patterns

The plugin follows a functional approach with clear separation of concerns:

1. **Context Generation**: All configuration is processed through `generateContext()` in `context.ts`
2. **Metrics Registration**: Prometheus metrics are created and configured in `metrics.ts`
3. **Hook Generation**: Apollo Server hooks are dynamically generated based on configuration in `hooks.ts`
4. **Plugin Factory**: The main `createPlugin()` function orchestrates all components

The plugin supports extensive configuration including:

- Custom metric labels and default labels
- Selective metric enabling/disabling via `skipMetrics`
- Custom histogram buckets for duration metrics
- Optional hostname labeling
- Configurable metrics endpoint path

## Testing the Plugin

The example server provides a complete testing environment. Load testing can be performed using Artillery with the included `artillery.yaml` configuration.

## TypeScript Configuration

- Strict TypeScript settings with comprehensive type checking
- Separate builds for library (`dist/`) and example (`dist_example/`)
- Generic type support for custom Apollo Server contexts
