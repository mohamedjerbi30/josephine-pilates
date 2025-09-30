// Add this to your existing auth-service.ts file to debug token storage

const API_URL = process.env.NEXT_PUBLIC_API_URL;


class AuthService {
  async login(email: string, password: string) {
    console.log('=== AUTH SERVICE LOGIN DEBUG ===')
    console.log('Attempting login for:', email)
    
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to login')
    }

    const data = await response.json()
    console.log('Login response:', {
      token: data.token ? `${data.token.substring(0, 10)}...` : 'null',
      user: data.user
    })
    
    // Store token
    if (data.token) {
      localStorage.setItem('token', data.token)
      console.log('Token stored in localStorage')
      
      // Verify token was stored
      const storedToken = localStorage.getItem('token')
      console.log('Verified stored token:', storedToken ? `${storedToken.substring(0, 10)}...` : 'null')
    }

    return data.user
  }

  async register(name: string, email: string, password: string) {
    console.log('=== AUTH SERVICE REGISTER DEBUG ===')
    console.log('Attempting register for:', email)
    
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to register')
    }

    const data = await response.json()
    console.log('Register response:', data)
    
    // After registration, automatically login
    return await this.login(email, password)
  }

  async getCurrentUser() {
    console.log('=== AUTH SERVICE GET CURRENT USER DEBUG ===')
    const token = localStorage.getItem('token')
    console.log('Token from localStorage:', token ? `${token.substring(0, 10)}...` : 'null')
    
    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${API_URL}/api/users/verify-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('Verify token response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.log('Verify token error:', errorData)
      localStorage.removeItem('token')
      throw new Error(errorData.message || 'Failed to verify token')
    }

    const data = await response.json()
    console.log('Current user data:', data.user)
    return data.user
  }

  async logout() {
    console.log('=== AUTH SERVICE LOGOUT DEBUG ===')
    localStorage.removeItem('token')
    console.log('Token removed from localStorage')
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to send reset email')
    }

    return response.json()
  }

  async verifyResetCode(email: string, code: string) {
    const response = await fetch(`${API_URL}/api/verify-reset-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to verify code')
    }

    return response.json()
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const response = await fetch(`${API_URL}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code, newPassword }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to reset password')
    }

    return response.json()
  }
}

export const authService = new AuthService()