# Portfolio LF

A modern portfolio website built with React, Vite, SASS, and React-icons.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Tech Stack

- **React** - A JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling with instant server start and lightning-fast HMR
- **SASS** - Syntactically Awesome Style Sheets for advanced styling capabilities
- **React-icons** - Popular icon library with multiple icon sets

## Project Structure

```
src/
├── App.jsx          # Main app component
├── App.scss         # App styles
├── main.jsx         # Entry point
├── index.css        # Global styles
└── components/      # Reusable components
```

## Usage Examples

### Using React-icons

```jsx
import { FaReact } from 'react-icons/fa';

export default function Component() {
  return <FaReact size={32} color="blue" />;
}
```

### Using SASS

```scss
// App.scss
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lighten(#333, 10%);
  }
}
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Sass Documentation](https://sass-lang.com/)
- [React-icons](https://react-icons.github.io/react-icons/)

## License

This project is open source and available under the MIT License.
