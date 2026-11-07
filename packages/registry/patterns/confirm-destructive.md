---
title: Confirm destructive action
summary: AlertDialog flow for delete and reset actions.
---
```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive">Delete account</Button>} />
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete your account?</AlertDialogTitle>
      <AlertDialogDescription>This removes your profile and data permanently.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
The sandbox uses Base UI, so triggers take a `render` prop instead of `asChild`. Confirm the exact API from the registry entry for alert-dialog.
