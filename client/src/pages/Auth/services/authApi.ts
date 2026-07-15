import { apiClient } from '../../../services/apiClient'
export const authApi = {
  async signup(data: any) {
    return apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async login(data: any) {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async verifyOtp(data: any) {
    return apiClient('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async fetchMe() {
    return apiClient('/auth/me', {
      method: 'GET'
    })
  },

  async updateProfile(data: { name: string }) {
    return apiClient('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  async logout() {
    return apiClient('/auth/logout', {
      method: 'POST'
    })
  },

  async forgotPassword(data: { email: string }) {
    return apiClient('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async resetPassword(data: { email: string; otp: string; newPassword: string }) {
    return apiClient('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  async resendOtp(data: { email: string; purpose: 'signup' | 'login' | 'reset-password' }) {
    return apiClient('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}
