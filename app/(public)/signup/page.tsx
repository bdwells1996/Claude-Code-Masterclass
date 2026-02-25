'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { generateCodename } from '@/lib/generateCodename'
import AuthForm from '@/components/AuthForm'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(data: { email: string; password: string }) {
    try {
      setLoading(true)
      setError('')

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      // Generate codename
      const codename = generateCodename()

      // Update user profile with codename as displayName
      await updateProfile(userCredential.user, {
        displayName: codename,
      })

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        id: userCredential.user.uid,
        codename,
      })

      // Redirect to dashboard
      router.push('/heists')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <AuthForm
      type="signup"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  )
}
