'use client'

import { useHeists } from '@/hooks/useHeists'

export default function HeistsPage() {
  const { heists: activeHeists, loading: loadingActive } = useHeists('active')
  const { heists: assignedHeists, loading: loadingAssigned } = useHeists('assigned')
  const { heists: expiredHeists, loading: loadingExpired } = useHeists('expired')

  return (
    <div className="page-content">
      <div className="active-heists">
        <h2>Your Active Heists</h2>
        {loadingActive && <p>Loading...</p>}
        {!loadingActive && activeHeists.length === 0 && <p>No heists found.</p>}
        {!loadingActive && activeHeists.length > 0 && (
          <ul>
            {activeHeists.map((heist) => (
              <li key={heist.id}>{heist.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="assigned-heists">
        <h2>Heists You&apos;ve Assigned</h2>
        {loadingAssigned && <p>Loading...</p>}
        {!loadingAssigned && assignedHeists.length === 0 && <p>No heists found.</p>}
        {!loadingAssigned && assignedHeists.length > 0 && (
          <ul>
            {assignedHeists.map((heist) => (
              <li key={heist.id}>{heist.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="expired-heists">
        <h2>All Expired Heists</h2>
        {loadingExpired && <p>Loading...</p>}
        {!loadingExpired && expiredHeists.length === 0 && <p>No heists found.</p>}
        {!loadingExpired && expiredHeists.length > 0 && (
          <ul>
            {expiredHeists.map((heist) => (
              <li key={heist.id}>{heist.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}