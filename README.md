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

### Navbar
* **Active Link Detection**: Uses `NavLink`'s `isActive` render-prop pattern to dynamically apply a CSS class, removing any need for manual `hook` comparisons to determine which page is current.
* **Centralized Link Data**: Pulls its link list from a separate `NavArray` data file rather than hardcoding `<NavLink>` elements, so adding or removing a page doesn't require touching the component itself.

### App
* **Route Declaration**: Defines all top-level routes (`/`, `/students/:id`, `/enroll`, and a catch-all `*`) using `<Routes>`/`<Route>`, keeping `<Navbar />` outside `<Routes>` so it persists across every page.
* **Lifted Roster State**: Owns `students`, `loading`, `error`, and the fetch logic at the top level so a student enrolled on `/enroll` is immediately visible back on `/` — no route has its own disconnected copy of the data.

### Enroll Page
* **Form Isolation**: Renders `EnrollForm` on its own dedicated route rather than inline on the homepage, matching the single-responsibility split between "view roster" and "add student."
* **Post-Submit Redirect**: Wraps the `onEnroll` callback passed down from `App` with an additional `navigate("/")` call, so a successful enrollment automatically returns the user to the roster without needing a manual link click.

### Student Detail Page
* **Dynamic Param Lookup**: Reads the `id` segment of the URL via `useParams()` and finds the matching student by comparing it against the roster array.
* **Type-Safe Matching**: Normalizes both sides of the comparison to strings before checking equality, since `useParams()` always returns strings while seed data stores `id` as a number.
* **Graceful Fallback**: Renders a "Student not found" message with a link home when no match exists, rather than crashing or rendering blank.

### Not Found Page
* **Catch-All Handling**: Matches any URL that doesn't correspond to a defined route, using React Router's `*` wildcard path, and presents a friendly message with a link back to the roster.

### Student Card
* **Navigable Card Name**: Wraps the student's name in a `<Link to={\`/students/${id}\`}>`, enabling client-side navigation to that student's detail view without a full page reload.

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