# Student Card Dashboard

A clean, responsive dashboard designed to showcase student rosters, track key metrics, and filter data. The application utilizes a gradient-free, light-mode design focused on elevated cards, standard color variables, and responsive grids.

---

## Component Implementation Approaches

### App
* **Average Score Calculation**: Implements an array reduce accumulator pattern to sum the total score of all students and divides it by the student count to calculate a precise class average.
* **Student Count**: Uses the array length property to determine the total number of students in the dashboard dynamically.
* **Props Distribution**: Serves as the central data store, calculating metrics and passing results down to display components as read-only properties.

### Header
* **Metrics Rendering**: Displays the class statistics (student count and average score) in a high-contrast layout. It dynamically receives these values as properties, ensuring the header is kept independent of data calculations.

### Student List
* **Conditional Grid Rendering**: Wraps the student card list. It validates the array of students, rendering a grid wrapper when data exists, or displaying a fallback message when no students match.
* **Composition via Children**: Accepts child components (like footers) through React's native composition model, keeping the container reusable.

### Student Card
* **Grade Derivation**: Dynamically computes a letter grade (A, B, C, D, or F) using threshold-based logic relative to the student's test score.
* **Skills List Rendering**: Loops through the list of skills using an array map pattern, appending item separators conditionally, and falls back to a descriptive message if the list is empty.

### Stat Bar
* **Dynamic Width Rendering**: Adjusts the score bar width dynamically using inline styles linked to the score percentage.
* **Conditional Color Selection**: Employs a nested ternary expression to determine the semantic color of the fill bar (green for high scores, orange for average, and red for low scores) without using complex conditional chains in the template.

### Badge
* **Dynamic Styling Classes**: Dynamically maps label text to CSS classes by processing strings with regular expressions (replacing colons and spaces with hyphens). This ensures category-specific colors and backgrounds are applied accurately.

---

## Visual Design Approaches

* **Elevation through Shadows**: Uses standard box-shadow properties on cards to create depth, simulating physical elevation against a light gray background.
* **Solid Color Palettes**: Uses a primary blue accent color for buttons and active states, replacing all previous gradients with solid, basic colors to ensure high contrast and readability.

## React Concepts Explained

### Component-Based Architecture
Instead of building one large page, React breaks the UI into small, independent pieces called components. Each component owns its own logic and appearance. This makes code reusable, easier to debug, and simpler to maintain — changing one component does not break others.

### Virtual DOM
React keeps a lightweight copy of the real DOM in memory called the Virtual DOM. When state changes, React updates the Virtual DOM first, compares it to the previous version, and only updates the parts of the real DOM that actually changed. This makes updates fast without re-rendering the entire page.

---

## API Integration

**API used:** [RandomUser API](https://randomuser.me/api/?results=6&nat=us,gb)

- Fetched 6 random users on mount using `useEffect` with an empty dependency array so it runs once
- Used `async/await` with `try/catch/finally` to handle success and failure cleanly
- Checked `response.ok` before parsing if the server returns a non-200 status, an error is thrown
- While loading, a `StatusMessage` component renders a loading state
- On failure, a `StatusMessage` component renders an error state  the app never crashes
- Fetched students are merged with seed students using the spread operator

---

## Controlled vs Uncontrolled Forms

**Controlled inputs** React owns the value via `useState`:
- Every keystroke updates state and triggers a re-render
- Enables live feedback , preview text, instant validation, disabled buttons
- Used for: `firstName`, `lastName`, `track`, `score`

**Uncontrolled inputs** — the DOM owns the value, read via `useRef`:
- No re-render on keystroke. React only reads the value when needed (on submit)
- Simpler for fields that don't need live feedback
- Used for: `email`, `isActive` checkbox

**When to use controlled:**
- Live preview, real-time validation, dependent fields

**When to use uncontrolled:**
- Simple read-on-submit fields, file inputs, third-party integrations