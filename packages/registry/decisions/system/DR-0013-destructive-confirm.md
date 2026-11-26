---
id: DR-0013
title: Destructive actions are confirmed with an AlertDialog
status: accepted
severity: error
scope: [button, alert-dialog]
enforcement: { type: reviewer, ref: review/destructive-confirm }
rationale: Deleting data without a confirmation step causes irreversible mistakes. Intent is hard to detect from code alone, so the reviewer judges it.
do: ["Delete button opens AlertDialog with a Cancel and a destructive Action"]
dont: ["Delete button that acts immediately"]
---
Any control that deletes, removes or resets user data must open an `AlertDialog` that names what will be lost.
