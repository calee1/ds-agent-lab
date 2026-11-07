---
title: Form field
summary: Label + Input pair with accessible association.
---
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```
Every control needs a visible Label whose `htmlFor` matches the control `id`.
