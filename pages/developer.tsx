import React, { useState } from 'react'
import Cube from '../components/Cube'
import MediaDisplay from '../components/MediaDisplay'

export default function Developer() {
  const [selectedCube, setSelectedCube] = useState<number | null>(null)

  const handleUpload = (cubeId: number) => {
    // Implement media upload logic here
    console.log(`Uploading media for cube ${cubeId}`)
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Developer Page</h1>
      <div className="flex space-x-4 mb-8">
        <Cube onClick={() => setSelectedCube(1)} />
        <Cube onClick={() => setSelectedCube(2)} />
        <Cube onClick={() => setSelectedCube(3)} />
      </div>
      {selectedCube && (
        <div className="flex flex-col items-center">
          <MediaDisplay cubeId={selectedCube} />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => handleUpload(selectedCube)}
          >
            Upload Media
          </button>
        </div>
      )}
    </div>
  )
}