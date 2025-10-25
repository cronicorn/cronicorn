# Cronicorn MVP UI - Visual Implementation Roadmap

## 🎯 The Big Picture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRONICORN MVP USER INTERFACE                  │
│                                                                   │
│  Mission: Enable users to manage AI-powered job scheduling       │
│  Timeline: 3-4 weeks                                             │
│  Scope: 9 pages, 15-20 components, 4 core workflows             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📅 4-Week Implementation Timeline

```
┌───────────┬───────────┬───────────┬───────────┐
│  WEEK 1   │  WEEK 2   │  WEEK 3   │  WEEK 4   │
├───────────┼───────────┼───────────┼───────────┤
│ Foundation│  Config   │ Monitoring│  Polish   │
│   +       │           │     +     │     +     │
│ Dashboard │ Endpoints │  History  │ API Keys  │
└───────────┴───────────┴───────────┴───────────┘
     ↓           ↓           ↓           ↓
   Users      Users       Users      Ready
     can        can         can         to
   manage    configure    debug      launch
    jobs     endpoints   failures      🚀
```

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                         │
│  (React + TanStack Router + Tailwind CSS)                    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Dashboard  │  │    Jobs    │  │ Monitoring │            │
│  │            │  │ Management │  │  & Runs    │            │
│  │ • Job list │  │ • Create   │  │ • History  │            │
│  │ • Summary  │  │ • Edit     │  │ • Details  │            │
│  │ • CTA      │  │ • Delete   │  │ • Health   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Endpoints  │  │  Settings  │  │  Shared    │            │
│  │   Config   │  │            │  │ Components │            │
│  │ • Add      │  │ • Profile  │  │ • Badges   │            │
│  │ • Edit     │  │ • Sub      │  │ • Forms    │            │
│  │ • Pause    │  │ • API Keys │  │ • Modals   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  API CLIENT   │
                    │ (fetch + auth)│
                    └───────┬───────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                      BACKEND API LAYER                         │
│  (Hono + Better Auth + Drizzle + PostgreSQL)                  │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  17 Public API Endpoints (already implemented):                │
│                                                                 │
│  Jobs:      POST/GET/PATCH/DELETE /jobs                       │
│  Endpoints: POST/GET/PATCH/DELETE /jobs/:id/endpoints         │
│  Runs:      GET /endpoints/:id/runs                           │
│  Health:    GET /endpoints/:id/health                         │
│  Hints:     POST/DELETE /endpoints/:id/hints                  │
│  Auth:      POST /auth/*, GET /subscriptions/*                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔀 User Journey Map

```
┌─────────────────────────────────────────────────────────────┐
│                    NEW USER JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

START
  │
  ├─► Landing Page (/)
  │   └─► Click "Login"
  │
  ├─► OAuth Flow (GitHub)
  │   └─► Authenticate
  │
  ├─► Dashboard (/dashboard) ◄── ENTRY POINT
  │   │
  │   ├─► Empty state: "Create your first job"
  │   └─► Click "Create Job"
  │
  ├─► Create Job (/jobs/new)
  │   │
  │   ├─► Fill form (name, description)
  │   └─► Submit
  │
  ├─► Job Details (/jobs/:id)
  │   │
  │   ├─► See empty endpoints list
  │   └─► Click "Add Endpoint"
  │
  ├─► Add Endpoint (/jobs/:jobId/endpoints/new)
  │   │
  │   ├─► Fill form (URL, method, interval)
  │   └─► Submit
  │
  ├─► Back to Job Details
  │   │
  │   ├─► See endpoint in list
  │   └─► Wait for first run (1-5 min)
  │
  ├─► Refresh page
  │   │
  │   ├─► See run status (success/failure)
  │   └─► If failed → click to debug
  │
  ├─► Run Details (/runs/:id)
  │   │
  │   ├─► See error message
  │   ├─► See request/response
  │   └─► Fix configuration
  │
  └─► SUCCESS! ✅
      User has working job

TOTAL TIME: < 5 minutes
```

---

## 📊 Feature Dependency Tree

```
                    ┌──────────────┐
                    │  Dashboard   │ ◄── Start here
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
      ┌─────▼─────┐  ┌────▼────┐  ┌─────▼──────┐
      │ Job CRUD  │  │Settings │  │  API Keys  │
      └─────┬─────┘  └────┬────┘  └────────────┘
            │             │
      ┌─────▼─────┐      │
      │ Endpoints │      │
      │   Config  │      │
      └─────┬─────┘      │
            │            │
      ┌─────▼─────┐      │
      │   Runs    │      │
      │  History  │      │
      └─────┬─────┘      │
            │            │
      ┌─────▼─────┐      │
      │  Health   │      │
      │  Summary  │      │
      └───────────┘      │
                         │
                    ┌────▼──────┐
                    │Subscription│
                    │  (Stripe) │
                    └───────────┘

Legend:
  ─► Dependencies (build in order)
  Must complete parent before children
```

---

## 🎨 Page Layout Patterns

```
┌────────────────────────────────────────────────────────────┐
│                     HEADER (All Pages)                      │
│  Cronicorn 🦄    [Dashboard] [Settings] [User ▼]          │
└────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────┐
│                      MAIN CONTENT                           │
│                                                             │
│  Pattern 1: LIST PAGE                                       │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Page Title                        [Action Button]  │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Filter/Search Controls                             │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ ┌────────────────────────────────────────────┐    │   │
│  │ │ Item 1                            [Actions]│    │   │
│  │ └────────────────────────────────────────────┘    │   │
│  │ ┌────────────────────────────────────────────┐    │   │
│  │ │ Item 2                            [Actions]│    │   │
│  │ └────────────────────────────────────────────┘    │   │
│  │                                                     │   │
│  │ [Pagination: ← Prev | Next →]                     │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  Pattern 2: DETAIL PAGE                                     │
│  ┌────────────────────────────────────────────────────┐   │
│  │ ← Back | Item Name                   [Edit] [Del] │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Section 1: Overview                                │   │
│  │ [Key-value pairs or description]                   │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Section 2: Related Items                           │   │
│  │ [Table or list of child items]                     │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Section 3: Activity/History                        │   │
│  │ [Timeline or recent events]                        │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
│  Pattern 3: FORM PAGE                                       │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Form Title                                          │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Label 1                                             │   │
│  │ [___________________________________________]       │   │
│  │                                                     │   │
│  │ Label 2 (optional)                                  │   │
│  │ [___________________________________________]       │   │
│  │                                                     │   │
│  │ Advanced Settings ▼ (collapsible)                  │   │
│  │                                                     │   │
│  │ [Cancel]  [Save]                                   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND DATA FLOW                        │
└─────────────────────────────────────────────────────────────┘

User Action
    │
    ├─► 1. Navigate to page
    │      │
    │      └─► TanStack Router Loader
    │             │
    │             └─► Fetch data from API
    │                    │
    │                    └─► Render page with data
    │
    ├─► 2. Submit form
    │      │
    │      ├─► Validate inputs (client-side)
    │      │      │
    │      │      └─► If invalid: Show errors
    │      │
    │      └─► If valid: POST/PATCH to API
    │             │
    │             ├─► Success → Redirect or refetch
    │             └─► Error → Show error message
    │
    └─► 3. Click action (delete, pause, etc.)
           │
           └─► Confirm dialog
                  │
                  ├─► User cancels → No-op
                  └─► User confirms → API request
                         │
                         └─► Refetch page data

┌─────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                          │
└─────────────────────────────────────────────────────────────┘

Route Loader State (TanStack Router)
  ↓
  Fetched data cached automatically
  ↓
  Revalidated on navigation
  ↓
  No manual state management needed

Component Local State (React useState)
  ↓
  Form inputs
  ↓
  UI toggles (modals, dropdowns)
  ↓
  Temporary state only

Server as Source of Truth
  ↓
  Always refetch after mutations
  ↓
  No client-side caching complexity
```

---

## 🧩 Component Hierarchy

```
App
│
├─ __root.tsx (Layout)
│  ├─ Header
│  │  ├─ Logo (link to dashboard)
│  │  ├─ Navigation
│  │  │  ├─ Dashboard link
│  │  │  └─ Settings link
│  │  └─ UserMenu
│  │     ├─ User info
│  │     └─ Logout button
│  │
│  └─ Outlet (page content)
│
├─ Dashboard (/dashboard)
│  ├─ AccountSummaryCard
│  │  ├─ TierBadge
│  │  ├─ Usage stats
│  │  └─ Upgrade CTA
│  │
│  └─ JobsList
│     ├─ CreateJobButton
│     └─ JobCard[] (loop)
│        ├─ Job name/description
│        ├─ Endpoint count
│        ├─ RunStatusBadge
│        └─ Click → navigate
│
├─ Job Pages
│  ├─ Create (/jobs/new)
│  │  └─ JobForm
│  │     ├─ Input fields
│  │     └─ Submit button
│  │
│  └─ Details (/jobs/:id)
│     ├─ JobHeader
│     │  ├─ Name (editable)
│     │  ├─ Description
│     │  └─ ActionsMenu
│     │
│     ├─ EndpointsList
│     │  ├─ AddEndpointButton
│     │  └─ EndpointRow[] (loop)
│     │     ├─ Name, URL, method
│     │     ├─ Interval display
│     │     ├─ RunStatusBadge
│     │     └─ ActionsMenu
│     │
│     └─ RecentActivity
│        └─ RunRow[] (loop)
│
├─ Endpoint Pages
│  ├─ Add (/jobs/:id/endpoints/new)
│  │  └─ EndpointForm
│  │
│  ├─ Edit (/jobs/:id/endpoints/:id/edit)
│  │  └─ EndpointForm (pre-filled)
│  │
│  ├─ Runs (/endpoints/:id/runs)
│  │  ├─ FilterControls
│  │  ├─ RunsTable
│  │  │  └─ RunRow[] (loop)
│  │  └─ Pagination
│  │
│  └─ Health (/endpoints/:id/health)
│     ├─ MetricsGrid
│     │  └─ MetricCard[] (success rate, etc.)
│     └─ RecentFailures
│        └─ FailureRow[] (loop)
│
├─ Run Details (/runs/:id)
│  ├─ RunSummary
│  │  ├─ RunStatusBadge
│  │  ├─ Duration
│  │  └─ Timestamp
│  │
│  ├─ RequestDetails
│  │  ├─ URL/Method
│  │  ├─ Headers display
│  │  └─ CodeBlock (body)
│  │
│  └─ ResponseDetails
│     ├─ Status code
│     ├─ CodeBlock (body)
│     └─ Error message
│
└─ Settings
   ├─ Profile (existing)
   ├─ Subscription (existing)
   └─ API Keys (/settings/api-keys)
      ├─ GenerateKeyButton
      ├─ KeysList
      │  └─ KeyRow[] (loop)
      │     ├─ Key name
      │     ├─ Prefix
      │     └─ RevokeButton
      └─ GenerateKeyModal
         ├─ Input (name)
         ├─ Submit
         └─ KeyDisplay (one-time)
            └─ CopyButton
```

---

## 🚦 Critical Path (Must Complete for MVP)

```
Priority Level 1 (CRITICAL - Week 1)
┌────────────────────────────────────┐
│ 1. Dashboard                        │ ◄── Users see their jobs
│ 2. Create Job                       │ ◄── Users make first job
│ 3. Job Details                      │ ◄── Users see endpoints
│ 4. Add Endpoint                     │ ◄── Users configure HTTP
└────────────────────────────────────┘

Priority Level 2 (HIGH - Week 2)
┌────────────────────────────────────┐
│ 5. Edit Endpoint                    │ ◄── Users fix config
│ 6. Delete Job/Endpoint              │ ◄── Users clean up
│ 7. Pause/Resume                     │ ◄── Users control execution
└────────────────────────────────────┘

Priority Level 3 (MEDIUM - Week 3)
┌────────────────────────────────────┐
│ 8. Run History                      │ ◄── Users see executions
│ 9. Run Details                      │ ◄── Users debug failures
│ 10. Health Summary                  │ ◄── Users monitor health
└────────────────────────────────────┘

Priority Level 4 (NICE-TO-HAVE - Week 4)
┌────────────────────────────────────┐
│ 11. API Key Management              │ ◄── Developers integrate
│ 12. Quota Display                   │ ◄── Users see limits
│ 13. Polish & Responsive             │ ◄── Production ready
└────────────────────────────────────┘
```

---

## 📈 Success Milestones

```
WEEK 1 MILESTONE ✅
├─ Users can log in
├─ Users can create jobs
├─ Users can add endpoints
└─ First job executes successfully

WEEK 2 MILESTONE ✅
├─ Users can edit/delete jobs
├─ Users can pause/resume endpoints
└─ Users can configure all endpoint options

WEEK 3 MILESTONE ✅
├─ Users can view run history
├─ Users can debug failures
└─ Users can monitor endpoint health

WEEK 4 MILESTONE ✅
├─ Users can generate API keys
├─ Users can see quota usage
├─ UI works on mobile
└─ READY TO LAUNCH 🚀

LAUNCH SUCCESS ✅
├─ 3+ beta users complete all workflows
├─ No critical bugs
├─ Page load < 2 seconds
└─ Zero console errors
```

---

## 🎯 Scope Boundary

```
┌──────────────────────────────────────────────────────────┐
│                    IN SCOPE (MVP)                         │
│                                                           │
│  ✅ Dashboard with jobs list                             │
│  ✅ Job CRUD operations                                  │
│  ✅ Endpoint configuration (full form)                   │
│  ✅ Run history with filters                             │
│  ✅ Run details (request/response)                       │
│  ✅ Health summary (basic metrics)                       │
│  ✅ API key generation/revocation                        │
│  ✅ Quota usage display                                  │
│  ✅ Mobile responsive design                             │
│  ✅ Basic error handling                                 │
│                                                           │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                  OUT OF SCOPE (Post-MVP)                  │
│                                                           │
│  ❌ Analytics dashboards with charts                     │
│  ❌ AI control interface (hints/nudges)                  │
│  ❌ Job templates or cloning                             │
│  ❌ Bulk operations (select multiple)                    │
│  ❌ Advanced search/filtering                            │
│  ❌ Custom dashboards                                    │
│  ❌ Team management                                      │
│  ❌ Webhook configuration UI                             │
│  ❌ Export/import functionality                          │
│  ❌ Visual workflow builder                              │
│                                                           │
│  Reason: Not required for core workflows                 │
│  Build based on user feedback post-launch                │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

**Visual roadmap complete!** Use this alongside the detailed planning documents for implementation.

**Next:** Start with Week 1 tasks in [ui-implementation-checklist.md](./ui-implementation-checklist.md).
