# Student Enrollment Portal

This project now combines routing, professional styling, and global state management for the student roster experience.

## Styling methods by component

- Navbar.jsx uses Tailwind CSS for the responsive navigation, active-link highlighting, and hamburger menu.
- StudentCard.jsx uses CSS Modules to create the card layout, hover shadow, and score-based border colors.
- Header.jsx uses Styled Components and a ThemeProvider powered by the theme palette from the styles folder.
- EnrollForm.jsx uses Material UI components such as TextField, Select, MenuItem, Button, and Grid to build the enrollment form.
- NotFoundPage.jsx uses inline styles to center the 404 page content with flexbox.
- StudentDetail.jsx uses a dedicated external stylesheet for the detail layout and back button styling.

## Context API and prop drilling

The roster state now lives in a StudentProvider powered by useReducer. Components read from the shared context through the useStudents hook instead of receiving a large props tree from App. This keeps student data centralized and makes enrollment and detail views consistent.

## useMemo, useCallback, and memoized work

- useMemo caches the class average so it only recalculates when the student list changes.
- useMemo also caches the filtered roster so the list is recomputed only when the filter or students list changes.
- useCallback memoizes the enroll handler so its function reference stays stable between renders.

## Custom hooks

- useFetch handles the random-user API request and returns the fetched data, loading state, and error state.
- useLocalStorage persists the active roster filter to localStorage so the chosen view survives refreshes.

## Extra behavior

- The enroll form focuses the first name input on load using useRef and useEffect.
- A successful enrollment scrolls the page back to the top before returning to the roster.
