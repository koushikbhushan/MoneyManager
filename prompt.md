# AGI-Driven Prompt Log for MoneyManager

This file documents the actual prompts and best practices for using AGI (AI coding assistants) to develop the MoneyManager application. The approach is to use clear, context-rich, and iterative prompts to guide the AGI in building a robust, cross-platform budgeting and investment app.

## Best Practices for AGI-Driven Development

- **Start with context:** Always provide the AGI with the requirements and project context (e.g., by referencing or pasting `requirement.md`).
- **Be explicit:** Write prompts that clearly state what you want ("Scaffold a backend with Node.js/Express and MongoDB for these models...").
- **Iterate:** Use a sequence of prompts, each building on the last, to incrementally develop features.
- **Request validation:** Ask the AGI to check if the implementation matches requirements.
- **Document decisions:** Record both the prompt and the AGI's response for traceability.
- **Refactor and review:** Use prompts to request code reviews, refactoring, or best practice checks.



# Structured AGI Prompt Log for MoneyManager

This file demonstrates how to write high-quality, structured prompts for AGI-driven application development. Each prompt includes Role, Constraints, Requirements, Input, and Output for maximum clarity and effectiveness.

---

## 1. Understanding and Validating Requirements
**Prompt Structure:**
- **Role:** You are a product analyst and full-stack architect.
- **Constraints:** Use only the information in `requirement.md`.
- **Requirements:** Summarize the application's goals, identify missing or ambiguous requirements, and recommend a tech stack.
- **Input:** The contents of `requirement.md`.
- **Output:** A summary of requirements, a list of open questions, and a recommended architecture/stack.

---

## 2. Project Structure and Monorepo Best Practices
**Prompt Structure:**
- **Role:** You are an expert in scalable project architecture for cross-platform apps.
- **Constraints:** The app must support React Native/Expo frontend and Node.js/Express/MongoDB backend.
- **Requirements:** Recommend a folder structure that maximizes maintainability and AGI context sharing.
- **Input:** Project goals and stack from previous step.
- **Output:** A folder structure diagram and rationale.

---

## 3. Backend API and Data Model Design
**Prompt Structure:**
- **Role:** You are a backend engineer and API designer.
- **Constraints:** Use TypeScript, Mongoose, and RESTful conventions. Ensure validation and security.
- **Requirements:** Design models and endpoints for budget categories and investments.
- **Input:** Requirements summary and chosen stack.
- **Output:** Mongoose models, Express route definitions, and example API payloads.

---

## 4. Backend Implementation Guidance
**Prompt Structure:**
- **Role:** You are a backend developer.
- **Constraints:** Use TypeScript, modular code, and document all endpoints.
- **Requirements:** Scaffold the backend, connect to MongoDB, and implement CRUD for all models.
- **Input:** Models and API design from previous step.
- **Output:** Code for Express app, route handlers, and API documentation.

---

## 5. Frontend Integration and Dynamic UI
**Prompt Structure:**
- **Role:** You are a React Native developer.
- **Constraints:** Use functional components, hooks, and connect to the backend API.
- **Requirements:** Refactor the UI to fetch, add, edit, and delete data via the backend. Implement forms and handle all states (loading, error, empty).
- **Input:** Current frontend code and backend API documentation.
- **Output:** Updated React Native code for dynamic, persistent UI.

---

## 6. Validation and Next Steps
**Prompt Structure:**
- **Role:** You are a QA engineer and product manager.
- **Constraints:** Use only the implemented code and requirements.
- **Requirements:** Review the implementation, list gaps, and suggest next features/prompts.
- **Input:** Current codebase and requirements.
- **Output:** Gap analysis and prioritized next steps with example prompts.

---

## 7. Troubleshooting Example: MongoDB Connection Issue
**Prompt Structure:**
- **Role:** You are a DevOps and backend troubleshooting expert.
- **Constraints:** Use only the error logs and current `.env` configuration.
- **Requirements:** Diagnose and resolve MongoDB connection errors.
- **Input:** Error message: `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017`. `.env` file contents.
- **Output:** Step-by-step troubleshooting guide, possible causes, and solutions (e.g., check MongoDB URI, ensure MongoDB is running, use Atlas, etc.).


- **Output:** New form components, updated screens, and prompt-driven documentation of the integration process.

---

## 8. UI Integration: Dynamic Forms and Actions
**Prompt Structure:**
- **Role:** You are a React Native UI/UX developer.
- **Constraints:** Use functional components, hooks, and modals for forms. Integrate with context and backend API.
- **Requirements:** Implement reusable forms for adding/editing budget categories and investments. Make all add/edit/delete actions functional and persistent. Handle loading and error states in the UI.
- **Input:** Current context/provider code, API utility, and UI screens.
- **Output:** New form components, updated screens, and prompt-driven documentation of the integration process.

---

## 9. UI Integration Complete: Dynamic Budget and Investment Management
**Prompt Structure:**
- **Role:** You are a full-stack developer finalizing dynamic UI integration.
- **Constraints:** Ensure all add/edit/delete actions for budget categories and investments are fully functional and persist to the backend. UI must handle loading, error, and empty states.
- **Requirements:** Test the app to confirm all CRUD operations work for both budgets and investments. Document any issues or edge cases found during integration.
- **Input:** Final integrated codebase and running backend.
- **Output:** Confirmation of dynamic, persistent UI and a summary of any remaining issues or next steps.

---

Use this structured prompt format for all major phases and troubleshooting steps in AGI-driven development. This ensures clarity, reproducibility, and high-quality results.

---

This file will be updated as development continues, capturing the actual prompts and AGI-driven workflow for the MoneyManager project.
