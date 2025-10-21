"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthProvider, useAuth } from "@/lib/contexts/auth-context"
import { PasswordDialog } from "@/components/dashboard/password-dialog"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login } = useAuth()

  if (!isAuthenticated) {
    return <PasswordDialog open={true} onAuthenticated={login} />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <DashboardHeader />
        <div className="flex-1">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  )
}