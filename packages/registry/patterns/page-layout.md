---
title: Page layout
summary: Standard page frame and heading hierarchy.
---
```tsx
<div className="min-h-screen bg-background text-foreground">
  <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-8">
    <h1 className="text-2xl font-bold tracking-tight">Title</h1>
    <p className="text-sm text-muted-foreground">Supporting text</p>
    {/* sections */}
  </div>
</div>
```
Use one `h1`. Section headings use `text-xl font-semibold`.
