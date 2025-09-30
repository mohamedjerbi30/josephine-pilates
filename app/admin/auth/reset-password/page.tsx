import { ResetPasswordForm } from "../../../../components/admin/auth/reset-password"
import { RedirectIfAuthenticated } from "../../../../components/admin/auth/redirect-if-authenticated"

export default function ResetPasswordPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8">
          <ResetPasswordForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}