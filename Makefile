.PHONY: install start build test clean help

# Default target
all: install build

# Install dependencies
install:
	bun install

# Start the development server
start:
	bun start

# Build the project for production
build:
	bun run build

# Run tests
test:
	bun test

# Clean up build artifacts and dependencies
clean:
	rm -rf node_modules build dist

# Show help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  install  Install dependencies"
	@echo "  start    Start the development server"
	@echo "  build    Build the project for production"
	@echo "  test     Run tests"
	@echo "  clean    Remove node_modules and build artifacts"
	@echo "  help     Show this help message"
