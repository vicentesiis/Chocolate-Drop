# Project Guidelines & Best Practices

## Code Structure & Organization

### Component Architecture
- **UI Components**: Place reusable UI components in `components/ui/` (shadcn/ui pattern)
- **Feature Components**: Place feature-specific components in `components/` root
- **Component Modules**: Use index files for complex components (see `components/navbar/`)
- **Page Components**: Keep pages minimal, compose with feature components (see `app/page.tsx`)

### File Naming Conventions
- Use kebab-case for files: `theme-toggle.tsx`, `nav-menu.tsx`
- Use PascalCase for component names: `ThemeToggle`, `NavMenu`
- Export components as both default and named exports when appropriate

## Component Development

### UI Component Pattern
```typescript
// Use forwardRef for UI components
const Component = React.forwardRef<ElementRef, Props>(
  ({ className, ...props }, ref) => (
    <Element
      ref={ref}
      className={cn(baseStyles, className)}
      {...props}
    />
  )
);
Component.displayName = "Component";
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Leverage CSS variables for theming
- Use `cn()` utility for conditional classes
- Break long class lists into multiple lines (80+ chars)

### Accessibility
- Include proper ARIA labels and roles
- Use semantic HTML elements
- Implement keyboard navigation
- Use `VisuallyHidden` for screen reader content

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & Tailwind
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page composition
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── navbar/            # Complex component modules
│   └── [feature].tsx     # Feature components
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
└── public/                # Static assets
```

## Development Workflow

### Component Creation
1. Create component in appropriate directory
2. Use TypeScript with proper prop interfaces
3. Implement accessibility features
4. Add to parent component/page
5. Test responsive behavior

### Styling Approach
- Mobile-first responsive design
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Leverage design tokens from shadcn/ui theme
- Consistent spacing and typography scale

### State Management
- Use React hooks for local state
- Implement theme switching with `next-themes`
- Handle client-side hydration properly

## Code Examples

### Component with Variants
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-styles",
        outline: "outline-styles"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
```

---

*Follow these guidelines to maintain consistency and quality across the project.*