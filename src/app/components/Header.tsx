import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          FeedbackSaaS
        </Link>
        <nav>
          <Link href="/" className="text-white hover:text-blue-200 mr-4">
            Início
          </Link>          
        </nav>
      </div>
    </header>
  )
}

