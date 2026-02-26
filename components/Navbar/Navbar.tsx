'use client'

import { Clock8 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import styles from "./Navbar.module.css"
import Button from "../Button"

export default function Navbar() {
  const router = useRouter()

  async function handleSignOut() {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }

  return (
    <div className={styles.siteNav}>
      <nav>
        <header>
          <h1>
            <Link href="/heists">
              P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
              cket Heist
            </Link>
          </h1>
          <div>Tiny missions. Big office mischief.</div>
        </header>
        <ul>
          <li>
            <Link href="/heists/create"><Button variant="secondary" type="button" tabIndex={-1}>Create Heist</Button></Link>
          </li>
          <li>
            <Button type="button" onClick={handleSignOut}>Sign Out</Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
