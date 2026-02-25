'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS, heistConverter, CreateHeistInput } from '@/types/firestore'
import { useUser } from '@/hooks/useUser'
import CreateHeistForm from '@/components/CreateHeistForm'

export default function CreateHeistPage() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [users, setUsers] = useState<{ uid: string; codename: string }[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      const snapshot = await getDocs(collection(db, COLLECTIONS.USERS))
      setUsers(snapshot.docs.map((doc) => ({ uid: doc.id, codename: doc.data().codename })))
      setLoadingUsers(false)
    }
    fetchUsers()
  }, [])

  async function handleSubmit(data: {
    title: string
    description: string
    assignedTo: string
    assignedToCodeName: string
  }) {
    try {
      setLoading(true)
      setError('')

      const input: CreateHeistInput = {
        title: data.title,
        description: data.description,
        createdBy: user!.uid,
        createdByCodename: user!.displayName ?? '',
        assignedTo: data.assignedTo,
        assignedToCodeName: data.assignedToCodeName,
        deadline: new Date(Date.now() + 48 * 60 * 60 * 1000),
        finalStatus: null,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, COLLECTIONS.HEISTS).withConverter(heistConverter), input)
      router.push('/heists')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="center-content">
      <div className="page-content">
        <h1 className="form-title">Create a Heist</h1>
        <CreateHeistForm
          onSubmit={handleSubmit}
          users={users}
          loading={loading}
          error={error}
          loadingUsers={loadingUsers}
        />
      </div>
    </div>
  )
}
