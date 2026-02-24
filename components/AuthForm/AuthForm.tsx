'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import FormInput from '@/components/FormInput'
import PasswordInput from '@/components/PasswordInput'

type AuthFormType = 'login' | 'signup'

type AuthFormProps = {
  type: AuthFormType
  onSubmit: (data: { email: string; password: string }) => void
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!email || !password) return

    if (type === 'signup') {
      if (!confirmPassword) return
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match')
        return
      }
    }

    setPasswordError('')
    onSubmit({ email, password })
  }

  const isLogin = type === 'login'
  const title = isLogin ? 'Log in to Your Account' : 'Sign Up for an Account'
  const buttonText = isLogin ? 'Log In' : 'Sign Up'
  const linkText = isLogin ? "Don't have an account?" : 'Already have an account?'
  const linkHref = isLogin ? '/signup' : '/login'
  const linkLabel = isLogin ? 'Sign up' : 'Log in'

  return (
    <div className="center-content">
      <div className="page-content">
        <h2 className="form-title">{title}</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isLogin ? 'Enter your password' : 'Create a password'}
            required
          />
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
              />
              {passwordError && (
                <p className="text-sm text-error">{passwordError}</p>
              )}
            </div>
          )}
          <Button type="submit" variant="primary" className="w-full mt-2">
            {buttonText}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-muted">
          {linkText}{' '}
          <Link href={linkHref} className="text-primary hover:underline">
            {linkLabel}
          </Link>
        </p>
      </div>
    </div>
  )
}
