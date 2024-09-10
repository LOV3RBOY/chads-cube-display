import React from 'react'
import Image from 'next/image'

interface MediaDisplayProps {
  cubeId: number
}

export default function MediaDisplay({ cubeId }: MediaDisplayProps) {
  // In a real application, you would fetch the media URL based on the cubeId
  const mediaUrl = `https://placekitten.com/400/400?image=${cubeId}`

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Media for Cube {cubeId}</h2>
      <Image src={mediaUrl} alt={`Media for Cube ${cubeId}`} width={400} height={400} />
    </div>
  )
}