import Link from 'next/link'
import { User, UserCheck, Clock, Calendar, Target } from 'lucide-react'
import { Heist } from '@/types/firestore'

type HeistCardProps = {
  heist: Heist
  className?: string
}

function getTimeRemaining(deadline: Date): string {
  const diff = deadline.getTime() - Date.now()
  if (diff <= 0) return 'Overdue'
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 24) return `${hours}h left`
  const days = Math.floor(hours / 24)
  return `${days}d left`
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function HeistCard({ heist, className = '' }: HeistCardProps) {
  const timeRemaining = getTimeRemaining(heist.deadline)
  const createdDateString = formatDate(heist.createdAt)

  return (
    <div className={`rounded-xl border border-[#DDD5C9] shadow-[0px_2px_12px_rgba(44,36,22,0.06)] overflow-hidden bg-white max-w-[325px] my-5 ${className}`}>
      {/* Orange accent bar */}
      <div className="h-[3px] w-full bg-secondary" />

      {/* Card body */}
      <div className="p-6 flex flex-col gap-5">
        {/* Header row: icon badge + title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-secondary rounded-lg flex-shrink-0 flex items-center justify-center" >
            <Target size={20} className="text-white" />
          </div>
          <Link href={`/heists/${heist.id}`} className="font-serif font-medium text-xl text-text hover:text-secondary transition-colors">
            {heist.title}
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-disabled-border" />

        {/* Metadata rows */}
        <div className="space-y-4">
          {/* Assigned To */}
          <div className="flex items-start gap-3">
            <div className="w-[34px] h-[34px] bg-main border border-disabled-border rounded-md flex-shrink-0 flex items-center justify-center">
              <User size={16} className="text-secondary" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase">Assigned to</div>
              <div className="text-sm font-medium text-text">{heist.assignedToCodeName}</div>
            </div>
          </div>

          {/* Created By */}
          <div className="flex items-start gap-3">
            <div className="w-[34px] h-[34px] bg-main border border-disabled-border rounded-md flex-shrink-0 flex items-center justify-center">
              <UserCheck size={16} className="text-secondary" />
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase">Created by</div>
              <div className="text-sm font-medium text-text">{heist.createdByCodename}</div>
            </div>
          </div>
        </div>

        {/* Bottom tiles row */}
        <div className="flex gap-3 pt-2">
          <div className="flex-1 bg-main border border-disabled-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-secondary" />
              <div className="text-xs text-text-muted">Time left</div>
            </div>
            <div className="text-sm font-semibold text-text">{timeRemaining}</div>
          </div>
          <div className="flex-1 bg-main border border-disabled-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-secondary" />
              <div className="text-xs text-text-muted">Created</div>
            </div>
            <div className="text-sm font-semibold text-text">{createdDateString}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
