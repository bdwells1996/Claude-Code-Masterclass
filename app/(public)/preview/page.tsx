// preview page for newly created UI components
import Button from '@/components/Button/Button'

export default function PreviewPage() {
  return (
    <div className="page-content space-y-12">
      <section>
        <h2 className="text-xl font-bold mb-4">Buttons</h2>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <Button variant="primary">Explore Musicians</Button>
            <Button variant="secondary">Discover Gigs</Button>
          </div>
          <div className="flex flex-wrap gap-6">
            <Button variant="primary" disabled>Explore Musicians</Button>
            <Button variant="secondary" disabled>Discover Gigs</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
