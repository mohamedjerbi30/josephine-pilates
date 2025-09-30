const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface UpdateProfileData {
  name: string
  email: string
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

class ProfileService {
  private getHeaders() {
    const token = localStorage.getItem('token')
    console.log('=== PROFILE SERVICE DEBUG ===')
    console.log('Token from localStorage:', token ? `${token.substring(0, 10)}...` : 'null')
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }
    
    console.log('Headers being sent:', {
      ...headers,
      Authorization: headers.Authorization ? `Bearer ${token?.substring(0, 10)}...` : 'undefined'
    })
    
    return headers
  }

  async updateProfile(data: UpdateProfileData) {
    const response = await fetch(`${API_URL}/api/users/profile/update`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to update profile')
    }

    return response.json()
  }

  async changePassword(data: ChangePasswordData) {
    const response = await fetch(`${API_URL}/api/users/profile/change-password`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to change password')
    }

    return response.json()
  }

  async getProfile() {
    const response = await fetch(`${API_URL}/api/users/profile`, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to get profile')
    }

    return response.json()
  }

  async deleteAccount() {
    const response = await fetch(`${API_URL}/api/users/profile/delete`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to delete account')
    }

    return response.json()
  }
}

export const profileService = new ProfileService()