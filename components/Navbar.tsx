import { FC } from 'react'

const Navbar: FC = () => {
  return (
    <nav className="bg-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800">FluxAI WebUI</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
