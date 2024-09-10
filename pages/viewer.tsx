import React, { useState } from 'react'
import Cube from '../components/Cube'
import MediaDisplay from '../components/MediaDisplay'

export default function Viewer() {
  const [selectedCube, setSelectedCube] = useState<number | null>(null)

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Viewer Page</h1>
      <div className="flex space-x-4 mb-8">
        <Cube onClick={() => setSelectedCube(1)} />
        <Cube onClick={() => setSelectedCube(2)} />
        <Cube onClick={() => setSelectedCube(3)} />
      </div>
      {selectedCube && (
        <MediaDisplay cubeId={selectedCube} />
      )}
    </div>
  )
}