# GitHub Copilot Instructions

## General Guidelines

- **Language**: All code (functions, variables, comments, logs) must be written in **English**
- **Framework**: Next.js 16 with App Router
- **React**: Version 19 with Server and Client Components
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with custom beige color palette

## Code Style

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCarousel`, `ValuePopover`)
- **Functions**: camelCase (e.g., `fetchProducts`, `handleClick`)
- **Variables**: camelCase (e.g., `selectedValue`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase for configuration objects
- **Types/Interfaces**: PascalCase (e.g., `Product`, `UseFaqReturn`)
- **Files**: PascalCase for components, camelCase for utilities and hooks

### TypeScript Best Practices

```typescript
// ✅ Good - Explicit return types for functions
export function useProducts(): UseProductsReturn {
  // ...
}

// ✅ Good - Interface for function return types
interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: Error | null
}

// ✅ Good - Proper typing for props
interface ProductCardProps {
  product: Product
  onSelect?: (id: number) => void
}

// ❌ Bad - Using 'any'
function processData(data: any) {}

// ✅ Good - Specific types
function processData(data: Product[]) {}

// ✅ Good - Null safety
const price = product.oldPrice ?? product.price

// ✅ Good - Type guards
if (error instanceof Error) {
  console.error(error.message)
}
```

## Component Architecture

### Server Components (Default)

Use Server Components by default for static content:

```typescript
// components/Hero.tsx
export default function Hero() {
  return (
    <section>
      {/* Static content */}
    </section>
  );
}
```

**When to use:**

- Static content without interactivity
- SEO-critical content
- No need for React hooks or browser APIs

### Client Components

Add `'use client'` directive only when necessary:

```typescript
// components/Products.tsx
'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'

export default function Products() {
  const { products, loading, error } = useProducts()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Component logic
}
```

**When to use:**

- Need React hooks (useState, useEffect, etc.)
- Browser APIs (localStorage, window, etc.)
- Event handlers (onClick, onChange, etc.)
- Third-party libraries requiring browser environment

## API Routes

### Structure

```typescript
// app/api/[resource]/route.ts
import { NextResponse } from 'next/server'

export interface ResourceType {
  id: number
  // ... other fields
}

const resources: ResourceType[] = [
  // Static data or database calls
]

export async function GET() {
  return NextResponse.json(resources)
}
```

### Best Practices

- ✅ Export interface in the route file
- ✅ Use `NextResponse.json()` for responses
- ✅ Add proper error handling
- ✅ Use meaningful HTTP status codes
- ✅ Keep data structures simple and serializable

```typescript
// ✅ Good - Error handling
export async function GET() {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
```

## Custom Hooks

### Structure

```typescript
// hooks/useResource.ts
'use client'

import { useState, useEffect } from 'react'
import { Resource } from '@/types/resource'

interface UseResourceReturn {
  resources: Resource[]
  loading: boolean
  error: Error | null
}

export function useResource(): UseResourceReturn {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resource', {
          cache: 'force-cache',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch resources')
        }

        const data = await response.json()
        setResources(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  return { resources, loading, error }
}
```

### Best Practices

- ✅ Always add `'use client'` directive
- ✅ Return object with `{ data, loading, error }` pattern
- ✅ Use typed interfaces for return values
- ✅ Handle errors properly with try-catch
- ✅ Set loading to false in finally block
- ✅ Use `force-cache` for static data
- ✅ Type guard errors: `err instanceof Error`

## State Management

### useState

```typescript
// ✅ Good - Typed state
const [selectedValue, setSelectedValue] = useState<Value | null>(null)

// ✅ Good - Initial state from function (for SSR safety)
const [visibleItems, setVisibleItems] = useState(1)

useEffect(() => {
  setVisibleItems(getVisibleItems())
}, [])
```

### useEffect

```typescript
// ✅ Good - Cleanup function
useEffect(() => {
  const handleResize = () => {
    setVisibleItems(getVisibleItems())
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// ✅ Good - Dependencies array
useEffect(() => {
  if (selectedValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }

  return () => {
    document.body.style.overflow = ''
  }
}, [selectedValue])
```

## Progressive Loading

### Loading States (Skeleton)

```typescript
if (loading) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Skeleton structure matching final content */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </section>
  );
}
```

### Error States

```typescript
if (error) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-red-600">Error loading content</p>
      </div>
    </section>
  );
}
```

## Styling with Tailwind CSS

### Custom Colors

Use the beige color palette defined in `globals.css`:

```typescript
// Available colors
className = 'bg-beige-50' // Lightest
className = 'bg-beige-100'
className = 'bg-beige-200'
className = 'bg-beige-300'
className = 'bg-beige-400'
className = 'bg-beige-500'
className = 'bg-beige-600' // Primary
className = 'bg-beige-700'
className = 'bg-beige-800'
className = 'bg-beige-900' // Darkest
```

### Responsive Design

```typescript
// ✅ Mobile-first approach
className = 'grid grid-cols-2 lg:grid-cols-4' // 2 cols mobile, 4 desktop
className = 'text-base md:text-lg lg:text-xl' // Responsive text
className = 'hidden md:flex' // Hide on mobile
```

### Animations

```typescript
// ✅ Loading skeleton
className = 'animate-pulse'

// ✅ Smooth transitions
className = 'transition-all duration-300'

// ✅ Hover effects
className = 'hover:bg-beige-700 transition-colors'

// ✅ Transform on hover
className = 'transform hover:scale-105 transition-transform'
```

## Image Optimization

### Using Next.js Image Component

```typescript
import Image from 'next/image';

// ✅ Good - With dimensions
<Image
  src="/images/product.jpg"
  alt="Product description"
  width={400}
  height={300}
  priority  // For above-the-fold images
/>

// ✅ Good - Responsive
<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={256}
  height={256}
  className="rounded-full object-cover"
/>
```

## Event Handlers

```typescript
// ✅ Good - Typed event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // Handle click
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ✅ Good - Arrow functions for inline handlers
<button onClick={() => handleSelect(item.id)}>
  Select
</button>

// ✅ Good - Stop propagation when needed
<div onClick={onClose}>
  <div onClick={(e) => e.stopPropagation()}>
    {/* Modal content */}
  </div>
</div>
```

## Accessibility

```typescript
// ✅ Good - Semantic HTML
<button aria-label="Close modal">×</button>

// ✅ Good - Alt text for images
<Image src="/photo.jpg" alt="felipeoliveira-xyz logo" />

// ✅ Good - Keyboard navigation
<button
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Escape' && handleClose()}
>
  Close
</button>
```

## File Organization

```
app/
├── api/
│   ├── products/route.ts       # GET /api/products
│   ├── testimonials/route.ts   # GET /api/testimonials
│   └── faq/route.ts            # GET /api/faq
├── layout.tsx                  # Root layout
├── page.tsx                    # Home page
└── globals.css                 # Global styles

components/
├── Hero.tsx                    # Server Component
├── About.tsx                   # Server Component
├── Products.tsx                # Client Component
├── Mission.tsx                 # Client Component
├── Testimonials.tsx            # Client Component
├── FAQ.tsx                     # Client Component
└── Footer.tsx                  # Server Component

hooks/
├── useProducts.ts              # Products fetching hook
├── useTestimonials.ts          # Testimonials fetching hook
└── useFaq.ts                   # FAQ fetching hook

types/
├── product.ts                  # Product interface
├── testimonial.ts              # Testimonial interface
├── faq.ts                      # FAQ interface
└── value.ts                    # Value interface

public/
└── images/
    ├── products/
    ├── testimonials/
    └── *.jpeg
```

## Testing Checklist

Before committing:

- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)
- [ ] All components render without errors
- [ ] Loading states work correctly
- [ ] Error states display properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] No console errors in browser
- [ ] Code follows English naming convention
- [ ] Types are properly defined

## Common Patterns

### Conditional Rendering

```typescript
// ✅ Good - Early returns
if (loading) return <LoadingState />;
if (error) return <ErrorState />;
return <Content />;

// ✅ Good - Conditional with &&
{products.length > 0 && <ProductList products={products} />}

// ✅ Good - Ternary for either/or
{isOpen ? <Modal /> : null}
```

### Array Operations

```typescript
// ✅ Good - map with key
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}

// ✅ Good - filter then map
{products
  .filter((p) => p.price > 100)
  .map((p) => <ProductCard key={p.id} product={p} />)}

// ✅ Good - Random selection with useMemo
const selectedItems = useMemo(() => {
  return getRandomItems(items, 3);
}, [items]);
```

## Performance Optimization

```typescript
// ✅ Use useMemo for expensive calculations
const sortedProducts = useMemo(() => {
  return products.sort((a, b) => a.price - b.price)
}, [products])

// ✅ Use useCallback for event handlers passed as props
const handleSelect = useCallback((id: number) => {
  setSelected(id)
}, [])

// ✅ Use force-cache for static API data
fetch('/api/products', { cache: 'force-cache' })
```

## Commit Message Convention

Follow Conventional Commits:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
perf: improve performance
test: add tests
chore: update dependencies
```

Examples:

- `feat: add FAQ API route and load FAQs dynamically`
- `fix: resolve React hooks and Tailwind v4 compatibility issues`
- `docs: update README to reflect felipeoliveira-xyz project`
- `chore: complete migration to Next.js with successful build`
