# Portfolio Module API Contract

This directory isolates the Portfolio feature.

## Structure
- `components/`: UI strictly related to the Portfolio.
- `hooks/`: Local state or data-fetching hooks (e.g., React Query).
- `services/`: Business logic.
- `repositories/`: The exact points where the backend connects.
- `types.ts`: Domain models.

## Backend Integration Required

### GET /portfolio
Fetch all portfolio items with optional filters.

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "port-1",
      "slug": "modern-minimalism",
      "title": "Modern Minimalism",
      "category": "Residential",
      "coverImage": "/path/to/image.jpg",
      "client": "John Doe",
      "year": 2026
    }
  ],
  "meta": { "total": 12, "page": 1, "limit": 10 }
}
```

### GET /portfolio/:slug
Fetch detailed portfolio story, images, and before/after comparisons.
