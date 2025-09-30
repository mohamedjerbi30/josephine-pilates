import { ProtectedRoute } from "../../../components/admin/auth/protected-route"
import { ProfileForm } from "../../../components/admin/profile/profile-form"
// Add to your profile page for testing


// Then use it in your profile page:

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <ProfileForm />
        </div>
      
    </ProtectedRoute>
  )
}