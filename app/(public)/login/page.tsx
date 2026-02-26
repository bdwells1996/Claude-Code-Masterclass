'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(data: { email: string; password: string }) {
    try {
      setLoading(true)
      setError('')

      await signInWithEmailAndPassword(auth, data.email, data.password)
      router.push('/heists')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return <AuthForm type="login" onSubmit={handleSubmit} loading={loading} error={error} />
}
