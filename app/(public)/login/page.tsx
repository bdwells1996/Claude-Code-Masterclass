'use client'

import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  function handleSubmit(data: { email: string; password: string }) {
    console.log(data)
  }

  return <AuthForm type="login" onSubmit={handleSubmit} />
}
