'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS, Heist, heistConverter } from '@/types/firestore'
import { useUser } from './useUser'

type HeistsFilter = 'active' | 'expired' | 'assigned'

export type UseHeistsResult = {
  heists: Heist[]
  loading: boolean
  error: string
}

export function useHeists(filter: HeistsFilter): UseHeistsResult {
  const { user } = useUser()
  const [heists, setHeists] = useState<Heist[]>([])
  const [loading, setLoading] = useState(
    (filter === 'assigned' || filter === 'active') ? user !== null : true
  )
  const [error, setError] = useState('')

  useEffect(() => {
    // If filter requires user and no user exists, don't subscribe
    if ((filter === 'active' || filter === 'assigned') && !user) {
      return
    }

    let q

    if (filter === 'active') {
      // Active heists: assigned to current user and deadline in the future
      q = query(
        collection(db, COLLECTIONS.HEISTS),
        where('assignedTo', '==', user!.uid),
        where('deadline', '>', new Date())
      )
    } else if (filter === 'assigned') {
      // Heists created by current user that are still in progress
      q = query(
        collection(db, COLLECTIONS.HEISTS),
        where('createdBy', '==', user!.uid),
        where('finalStatus', '==', null)
      )
    } else {
      // Expired heists: deadline has passed and finalStatus is set
      q = query(
        collection(db, COLLECTIONS.HEISTS),
        where('deadline', '<=', new Date()),
        where('finalStatus', '!=', null)
      )
    }

    const unsubscribe = onSnapshot(
      q.withConverter(heistConverter),
      (snapshot) => {
        const fetchedHeists = snapshot.docs.map((doc) => doc.data() as Heist)
        setHeists(fetchedHeists)
        setLoading(false)
        setError('')
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [filter, user])

  return { heists, loading, error }
}
