'use client'

import AuthForm from '@/components/AuthForm'

export default function SignupPage() {
  function handleSubmit(data: { email: string; password: string }) {
    console.log(data)
  }

  return <AuthForm type="signup" onSubmit={handleSubmit} />
}
