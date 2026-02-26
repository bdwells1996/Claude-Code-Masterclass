'use client'

import { useState } from 'react'
import FormInput from '@/components/FormInput'
import Button from '@/components/Button'

type User = {
  uid: string
  codename: string
}

type SubmitData = {
  title: string
  description: string
  assignedTo: string
  assignedToCodeName: string
}

type Props = {
  onSubmit: (data: SubmitData) => Promise<void>
  users: User[]
  loading: boolean
  error: string
  loadingUsers: boolean
}

export default function CreateHeistForm({
  onSubmit,
  users,
  loading,
  error,
  loadingUsers,
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !assignedTo) return

    const assignedToCodeName = users.find((u) => u.uid === assignedTo)?.codename ?? ''
    onSubmit({ title: title.trim(), description: description.trim(), assignedTo, assignedToCodeName })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormInput
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name the heist"
        required
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-text">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's the plan?"
          required
          rows={4}
          className="w-full rounded-xl border border-disabled-border bg-white px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="assignedTo" className="text-sm font-medium text-text">
          Assign To
        </label>
        <select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          disabled={loadingUsers}
          className="w-full rounded-xl border border-disabled-border bg-white px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            {loadingUsers ? 'Loading crew...' : 'Select a crew member'}
          </option>
          {users.map((user) => (
            <option key={user.uid} value={user.uid}>
              {user.codename}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Heist'}
      </Button>
    </form>
  )
}
