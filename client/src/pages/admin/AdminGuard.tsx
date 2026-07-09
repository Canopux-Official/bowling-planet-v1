import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AuthOverlay } from '../Auth/components/AuthOverlay'

interface AdminGuardProps {
  children: ReactNode
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <AuthOverlay loading={true} message="Verifying Admin Session..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
