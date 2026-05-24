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
