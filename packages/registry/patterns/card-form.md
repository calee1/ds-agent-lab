---
title: Form inside a Card
summary: Where to put the form element so Card spacing survives.
---
Card lays out its children with a flex column and a gap. A `<form>` placed inside Card becomes the only child, so header, content and footer lose that gap and sit flush against each other. Put the form around the Card instead.

```tsx
<form onSubmit={handleSubmit}>
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Shown to your teammates.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">{/* form fields */}</CardContent>
    <CardFooter>
      <Button type="submit">Save</Button>
    </CardFooter>
  </Card>
</form>
```
Do not add margins to patch the gap (`mt-4` on the footer).
