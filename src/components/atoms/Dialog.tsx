"use client"

import {
  Dialog as MuiDialog,
  type DialogProps as MuiDialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"

export function Dialog({ children, ...props }: MuiDialogProps) {
  return <MuiDialog {...props}>{children}</MuiDialog>
}

export { DialogTitle, DialogContent, DialogActions }
