# Build-a-Box Module

This module provides a complete page experience for customizing brigadeiro boxes, replacing the previous drawer/dialog approach with a dedicated page for improved UX/UI.

## Structure

### Page
- `app/build-a-box/page.tsx` - Main page component with full customization experience

### Components
- `box-selector.tsx` - Grid of available box sizes with selection
- `progress-header.tsx` - Shows progress and cart actions when box is selected
- `brigadeiro-grid.tsx` - Main grid with tabs, filters, and search
- `brigadeiro-card.tsx` - Individual brigadeiro card with quantity controls

## Features

### ✅ Implemented
- **Header & Sub Header** - Navigation and contextual information
- **Box Card Selector** - Visual selection of box sizes (4, 6, 10 pieces)
- **Tabs** - Separate views for "Clásicos" and "Temporada" brigadeiros
- **Search Filter** - Real-time search by brigadeiro name
- **Product Grid** - Responsive grid layout for all screen sizes
- **Progress Tracking** - Visual progress bar and completion status
- **Quantity Controls** - Add/remove brigadeiros with visual feedback
- **Cart Integration** - Seamless integration with existing cart system

### 🎨 UX/UI Improvements
- **Dedicated Page** - No more drawer/dialog constraints
- **Better Mobile Experience** - Optimized layouts for all devices
- **Visual Feedback** - Hover effects, transitions, and loading states
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Responsive Design** - Works seamlessly from mobile to desktop

### 🔄 Migration
The original `components/home/build-a-box/build-a-box.tsx` now shows a preview with a call-to-action button that redirects to the new dedicated page.

## Usage

Users can access the build-a-box experience by:
1. Clicking "Personalizar mi Caja" button on the home page
2. Navigating directly to `/build-a-box`

The flow is:
1. Select box size (4, 6, or 10 pieces)
2. Browse brigadeiros by category (Clásicos/Temporada)
3. Use search to find specific flavors
4. Add/remove brigadeiros until box is full
5. Add completed box to cart