# Dashboard UI - Visual Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  Cronicorn 🦄                                                    [User ▼] │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│  Dashboard                                                                    │
│  Monitor your scheduled jobs and endpoints                                   │
│                                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │  💼         │  │  🌐         │  │  📊      ↑  │  │  🕐         │       │
│  │             │  │             │  │             │  │             │       │
│  │ Total Jobs  │  │ Endpoints   │  │Success Rate │  │Last 24 Hours│       │
│  │     12      │  │     45      │  │   94.5%     │  │    287      │       │
│  │             │  │ ✓42  ⏸3    │  │  ↑Improving │  │ ✓271  ✗16   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                               │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Run Activity (Last 7 Days)                                           │  │
│  │                                                                        │  │
│  │  100 ┤                              ███                               │  │
│  │      │                          ████████                              │  │
│  │   75 ┤                      ██████████████                            │  │
│  │      │                  ████████████████████                          │  │
│  │   50 ┤              ████████████████████████████                      │  │
│  │      │          ████████████████████████████████████                  │  │
│  │   25 ┤      ████████████████████████████████████████████              │  │
│  │      │  ████████████████████████████████████████████████████          │  │
│  │    0 ┼──────────────────────────────────────────────────────────      │  │
│  │       Oct 14  Oct 15  Oct 16  Oct 17  Oct 18  Oct 19  Oct 20         │  │
│  │                                                                        │  │
│  │       ████ Success (green)    ████ Failed (red)                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                               │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │  Top Endpoints                      │  │  Recent Runs                │  │
│  │                                     │  │                             │  │
│  │  Endpoint       Job      Rate Runs │  │  ✓ health-check             │  │
│  │  ────────────────────────────────  │  │    API Monitor              │  │
│  │  health-check   API      ✓98% 156  │  │    2m ago • 234ms           │  │
│  │                 Monitor             │  │                             │  │
│  │  Last: 2m ago                       │  │  ✓ process-orders           │  │
│  │                                     │  │    E-commerce               │  │
│  │  process-orders E-comm   ✓95% 143  │  │    5m ago • 1.2s            │  │
│  │                 erce                │  │                             │  │
│  │  Last: 5m ago                       │  │  ✗ sync-inventory           │  │
│  │                                     │  │    Warehouse                │  │
│  │  sync-inventory Warehou  ⚠87% 98   │  │    8m ago • timeout         │  │
│  │                 se                  │  │                             │  │
│  │  Last: 8m ago                       │  │  ✓ send-report              │  │
│  │                                     │  │    Analytics                │  │
│  │  backup-db      Maintena ✓99% 72   │  │    15m ago • 456ms          │  │
│  │                 nce                 │  │                             │  │
│  │  Last: 1h ago                       │  │  ✓ cleanup-logs             │  │
│  │                                     │  │    Maintenance              │  │
│  │  email-digest   Marketin ✓92% 45   │  │    23m ago • 89ms           │  │
│  │                 g                   │  │                             │  │
│  │  Last: 3h ago                       │  │  ... and more               │  │
│  └─────────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Stats Cards
- **Jobs Card**: Blue background, briefcase icon
- **Endpoints Card**: Purple background, globe icon
- **Success Rate Card**: Green background, activity icon, trend arrow
- **24h Activity Card**: Orange background, clock icon

### Status Indicators
- **Success (✓)**: Green (#10b981)
- **Failure (✗)**: Red (#ef4444)
- **Warning (⚠)**: Yellow (#f59e0b)
- **Paused (⏸)**: Gray (#6b7280)
- **Timeout (🕐)**: Orange (#f97316)

### Chart
- **Success Area**: Green gradient (solid → transparent)
- **Failure Area**: Red gradient (solid → transparent)
- **Grid Lines**: Light gray (#e5e7eb)
- **Background**: White

### Badges
- **≥90% Success**: Green badge with checkmark
- **50-89% Success**: Yellow badge with warning
- **<50% Success**: Red badge with X icon

## Responsive Breakpoints

### Mobile (< 768px)
```
┌─────────────────────┐
│  ☰  Cronicorn 🦄   │
├─────────────────────┤
│                     │
│  Dashboard          │
│                     │
│  ┌───────────────┐  │
│  │  💼          │  │
│  │ Total Jobs   │  │
│  │     12       │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │  🌐          │  │
│  │ Endpoints    │  │
│  │     45       │  │
│  │ ✓42  ⏸3     │  │
│  └───────────────┘  │
│                     │
│  [More cards...]    │
│                     │
│  ┌───────────────┐  │
│  │   Chart       │  │
│  │   (7 days)    │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Top Endpoints │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Recent Runs   │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘
```

### Tablet (768-1024px)
```
┌───────────────────────────────────┐
│  ☰  Cronicorn 🦄         [User ▼] │
├───────────────────────────────────┤
│                                   │
│  Dashboard                        │
│                                   │
│  ┌──────────┐  ┌──────────┐      │
│  │   Jobs   │  │Endpoints │      │
│  └──────────┘  └──────────┘      │
│                                   │
│  ┌──────────┐  ┌──────────┐      │
│  │  Success │  │ Activity │      │
│  └──────────┘  └──────────┘      │
│                                   │
│  ┌─────────────────────────────┐ │
│  │        Chart                │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │    Top Endpoints            │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │    Recent Runs              │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

## Interaction States

### Hover Effects
- **Cards**: Subtle shadow increase
- **Table Rows**: Light gray background (#f9fafb)
- **Links**: Underline + color change
- **Buttons**: Background darkening

### Loading State
```
┌─────────────────────────────────┐
│                                 │
│         ⟳  Loading...           │
│                                 │
│    Loading dashboard stats...   │
│                                 │
└─────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────┐
│  ⚠ Error loading dashboard      │
│                                 │
│  Failed to fetch dashboard      │
│  data. Please try again.        │
│                                 │
│  [Retry]                        │
└─────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────┐
│         📭                      │
│                                 │
│    No jobs yet                  │
│                                 │
│  Create your first job to       │
│  see dashboard metrics          │
│                                 │
│  [Create Job]                   │
└─────────────────────────────────┘
```

## Animation Patterns

### Page Load
1. Header appears instantly
2. Cards fade in (100ms stagger)
3. Chart animates in (400ms)
4. Tables populate (200ms delay)

### Data Update
1. Loading spinner on card
2. Smooth number transitions
3. Chart re-draws with animation
4. Table rows fade in/out

### Trend Changes
- Arrow icon rotates
- Color transitions smoothly
- Percentage animates

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter to activate links/buttons
- Escape to close modals
- Arrow keys for table navigation

### Screen Reader
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icons
- Table headers associated with cells
- Chart data table alternative

### Color Contrast
- All text meets WCAG AA (4.5:1)
- Interactive elements have focus indicators
- Status colors work for colorblind users

---

This visual design ensures a clean, professional, and highly functional dashboard that provides all critical information at a glance while remaining accessible and responsive across devices.
