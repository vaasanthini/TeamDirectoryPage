# Team Directory

A searchable, filterable team directory page built with React and Vite. Features live name search, role-based filtering, a detail modal on card click, and a smooth dark/light mode toggle.

---

## Features

- **Live name search** — filters cards instantly as you type
- **Role filter** — pill buttons to filter by Engineer, Designer, Manager, Marketing, or QA
- **AND filtering** — search and role filter work together simultaneously
- **Detail modal** — click any card to open a full profile with email, phone, and bio
- **Dark / Light mode** — toggle with the 🌞/🌙 button in the header; all transitions are smooth
- **Keyboard accessible** — cards are focusable via Tab, open on Enter; modal closes on Escape
- **20 team members** across 6 roles

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI library |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| CSS Modules | Scoped component styles |
| CSS Custom Properties | Theme variables (dark / light) |
| Inter (Google Fonts) | Typography |

---

## Project Structure

```
DAY-7/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                   # React root mount
    ├── App.jsx                    # Root component — state, filtering, theme
    ├── App.css                    # Global styles + CSS theme variables
    ├── data/
    │   └── teamData.js            # 20 mock team members
    └── components/
        ├── SearchBar.jsx          # Controlled text input
        ├── SearchBar.module.css
        ├── RoleFilter.jsx         # Role pill buttons
        ├── RoleFilter.module.css
        ├── TeamGrid.jsx           # Responsive card grid + empty state
        ├── TeamGrid.module.css
        ├── TeamCard.jsx           # Individual member card
        ├── TeamCard.module.css
        ├── MemberModal.jsx        # Detail overlay modal
        └── MemberModal.module.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node)

### Installation

```bash
cd <folder_name>
npm install
```

### Running the dev server

```bash
npm run dev
```

Opens at **http://localhost:5173**

### Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Component Reference

### `App.jsx`

Root component. Owns all state and derives filtered members via `useMemo`.

| State | Type | Description |
|-------|------|-------------|
| `searchTerm` | `string` | Current text in the search input |
| `selectedRole` | `string` | Active role filter (`"All"` by default) |
| `selectedMember` | `object \| null` | Member whose modal is open; `null` = closed |
| `theme` | `"dark" \| "light"` | Current color theme |

**Filtering logic (AND):**
```js
teamData
  .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(m => selectedRole === "All" || m.role === selectedRole)
```

**Theme switching** adds a `theme-transitioning` class to `<html>` for 400 ms so all elements animate their colors simultaneously, then removes it to keep hover/focus transitions snappy.

---

### `SearchBar`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Controlled input value |
| `onChange` | `(value: string) => void` | Called on every keystroke; also called with `""` when the clear button is clicked |

---

### `RoleFilter`

| Prop | Type | Description |
|------|------|-------------|
| `roles` | `string[]` | Unique role list derived from team data |
| `selected` | `string` | Currently active role |
| `onChange` | `(role: string) => void` | Called when a pill button is clicked |

Renders an **All** button followed by one button per role. The active button gets a gradient fill and glow shadow.

---

### `TeamGrid`

| Prop | Type | Description |
|------|------|-------------|
| `members` | `object[]` | Filtered member array to display |
| `onSelect` | `(member: object) => void` | Called when a card is clicked |

Uses CSS Grid (`auto-fill, minmax(210px, 1fr)`) for a fully responsive layout. Shows a friendly empty state when `members.length === 0`.

---

### `TeamCard`

| Prop | Type | Description |
|------|------|-------------|
| `member` | `object` | Single team member object |
| `onClick` | `(member: object) => void` | Triggered on click and Enter keypress |

Displays avatar, name, color-coded role chip, and department. Hover lifts the card with a spring animation (`cubic-bezier(0.34, 1.56, 0.64, 1)`), reveals a gradient top bar, and glows the avatar ring.

---

### `MemberModal`

| Prop | Type | Description |
|------|------|-------------|
| `member` | `object` | Member to display details for |
| `onClose` | `() => void` | Called on backdrop click, X button click, or Escape key |

Renders a gradient banner at the top with the avatar overlapping it, a role badge, contact info rows, and a bio block. Animates in with a slide-up + scale entrance.

---

## Data Shape

Each entry in `src/data/teamData.js` follows this structure:

```js
{
  id: 1,
  name: "Alice Johnson",
  role: "Engineer",          // Engineer | Designer | Manager | Marketing | QA
  department: "Platform",
  email: "alice.johnson@company.com",
  phone: "+1 (555) 101-2020",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Short paragraph about the person."
}
```

To add more members, append objects to the array. New roles appear automatically in the filter buttons.

---

## Theming

Themes are driven by CSS custom properties on `:root` (dark, the default) and `[data-theme="light"]` in `App.css`. Every component module reads from these variables, so toggling the attribute on `<html>` repaints the entire UI at once.

| Variable | Dark | Light |
|----------|------|-------|
| `--bg-page` | `#0a0a0f` | `#f0f4ff` |
| `--bg-controls` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.85)` |
| `--header-bg` | Dark indigo gradient | Bright indigo–purple gradient |
| `--text-primary` | `#f1f5f9` | `#fff` |
| `--card-bg` | `rgba(18,18,30,0.85)` | `rgba(255,255,255,0.85)` |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus between cards |
| `Enter` (on focused card) | Open detail modal |
| `Escape` | Close detail modal |