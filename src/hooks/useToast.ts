'use client'
import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info'
interface Toast { id: string; message: string; type: ToastType }

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const toast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])
  const remove = useCallback((id: string) => setToasts(t => t.filter(x => x.id !== id)), [])
  return { toasts, toast, remove }
}
