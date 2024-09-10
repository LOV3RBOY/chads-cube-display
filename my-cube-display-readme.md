# Chad's Cube Display

## Overview

Chad's Cube Display is an interactive 3D cube display project with dual access for developers and viewers. It features a sleek, modern, minimalist aesthetic with cutting-edge performance. The project allows developers to upload media (images/videos) and assign it to specific cubes, which viewers can then interact with.

## Features

- Dual-password authentication system
- Interactive 3D cube display
- Media upload and assignment (for developers)
- Cube interaction and media reveal (for viewers)
- Customizable cube skins
- Hidden special effects and animations
- High-quality media playback
- Performance optimizations
- Responsive design

## Technologies Used

- Next.js
- React
- Three.js
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- Cloudinary
- Framer Motion

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/chad/chads-cube-display.git
   cd chads-cube-display
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   CLOUDINARY_URL=your_cloudinary_url_here
   ```

## Running the Application

To run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
chads-cube-display/
├── components/
│   ├── Cube.tsx
│   ├── PasswordUnlock.tsx
│   └── MediaDisplay.tsx
├── pages/
│   ├── index.tsx
│   ├── developer.tsx
│   └── viewer.tsx
├── styles/
│   └── globals.css
├── public/
├── lib/
│   └── cloudinary.ts
├── .env.local
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## Usage

### Developer Access
1. Enter the password "LVRDEV" on the main page.
2. Upload media and assign it to specific cubes.
3. Use the preview button to see how the cube will appear to viewers.

### Viewer Access
1. Enter the password "LVRBOY" on the main page.
2. Interact with the 3D cube display.
3. Click on cubes to reveal hidden media.
4. Customize the cube's appearance using predefined skins.

## PasswordUnlock Component

Here's the full code for the `PasswordUnlock.tsx` component:

```tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, HelpCircle, Box, Code } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PasswordLetter = ({ letter, index, total }: { letter: string; index: number; total: number }) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = 120

  return (
    <motion.div
      className="absolute text-4xl font-bold text-white"
      initial={{ x: 0, y: 0, scale: 2, opacity: 0 }}
      animate={{
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: 1,
        opacity: 1,
      }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {letter}
    </motion.div>
  )
}

export default function PasswordUnlock() {
  const [password, setPassword] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [accessGranted, setAccessGranted] = useState<'viewer' | 'developer' | null>(null)
  const [shakeError, setShakeError] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const router = useRouter()

  const viewerPassword = 'LVRBOY'
  const developerPassword = 'LVRDEV'

  useEffect(() => {
    const checkPassword = () => {
      if (password === viewerPassword) {
        setAccessGranted('viewer')
        setTimeout(() => router.push('/viewer'), 2000)
      } else if (password === developerPassword) {
        setAccessGranted('developer')
        setTimeout(() => router.push('/developer'), 2000)
      } else if (password.length === Math.max(viewerPassword.length, developerPassword.length)) {
        setShakeError(true)
        setTimeout(() => {
          setShakeError(false)
          setPassword('')
        }, 500)
      }
    }

    checkPassword()

    if (password.length > 0) {
      setShowInstructions(false)
    }
  }, [password, router])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.length === 1 && password.length < Math.max(viewerPassword.length, developerPassword.length)) {
      setPassword(prev => prev + e.key.toUpperCase())
    } else if (e.key === 'Backspace') {
      setPassword(prev => prev.slice(0, -1))
    }
  }

  const renderAccessGrantedScreen = () => {
    if (accessGranted === 'viewer') {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Box className="w-16 h-16 text-white" />
          <h2 className="text-4xl font-bold text-white">Viewer Access Granted</h2>
          <p className="text-xl text-gray-200">You can now view and interact with the cube.</p>
        </div>
      )
    } else if (accessGranted === 'developer') {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Code className="w-16 h-16 text-blue-300" />
          <h2 className="text-4xl font-bold text-blue-300">Developer Access Granted</h2>
          <p className="text-xl text-white">You can now edit the cube. Changes will be reflected in the viewer.</p>
        </div>
      )
    }
    return null
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-700 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {!accessGranted && (
        <motion.div
          className="relative w-64 h-64 rounded-full border-4 border-gray-600 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        >
          {password.split('').map((letter, index) => (
            <PasswordLetter key={index} letter={letter} index={index} total={password.length} />
          ))}
          {password.length < Math.max(viewerPassword.length, developerPassword.length) && (
            <motion.div
              className="text-6xl font-bold text-gray-400"
              key={password.length}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              ?
            </motion.div>
          )}
        </motion.div>
      )}
      <AnimatePresence>
        {accessGranted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-800"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderAccessGrantedScreen()}
          </motion.div>
        )}
      </AnimatePresence>
      {!accessGranted && (
        <motion.button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-700 text-white rounded-full text-lg font-semibold flex items-center"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowHint(!showHint)}
        >
          <HelpCircle className="mr-2" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </motion.button>
      )}
      <AnimatePresence>
        {showHint && !accessGranted && (
          <motion.div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl bg-gray-700 text-white px-6 py-3 rounded-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Hint: LVRBOY or LVRDEV
          </motion.div>
        )}
      </AnimatePresence>
      {!accessGranted && (
        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-lg text-gray-200"
          animate={{ opacity: password.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {password.length} / {Math.max(viewerPassword.length, developerPassword.length)}
        </motion.div>
      )}
      <motion.div
        className="absolute inset-0 border-8 border-gray-700 rounded-3xl pointer-events-none"
        animate={{ borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: shakeError ? [0, -2, 2, -2, 2, 0] : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="w-full max-w-lg aspect-square" />
      </motion.div>
      <AnimatePresence>
        {showInstructions && !accessGranted && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-center bg-gray-800 bg-opacity-70 p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Keyboard className="mx-auto mb-4 w-12 h-12" />
            Type the password to access the LVR experience
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

## Dependencies

Main dependencies:

- next: ^13.0.0
- react: ^18.2.0
- react-dom: ^18.2.0
- three: ^0.160.0
- gsap: ^3.9.1
- tailwindcss: ^3.3.0
- next-cloudinary: ^4.0.0
- framer-motion: ^10.0.0
- lucide-react: ^0.263.1

Dev dependencies:

- @types/react: ^18.0.0
- @types/node: ^18.0.0
- typescript: ^4.9.0
- eslint: ^8.0.0
- eslint-config-next: ^13.0.0
- postcss: ^8.4.0
- autoprefixer: ^10.4.0

For a full list of dependencies and their versions, please refer to the `package.json` file.

## Contributing

We welcome contributions to Chad's Cube Display! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Chad for project inspiration and guidance
- Three.js community for 3D rendering support
- GSAP team for animation capabilities
- Next.js team for the powerful React framework
- Cloudinary for media handling solutions

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Thank you for your interest in Chad's Cube Display project. We hope you enjoy using and contributing to this interactive 3D experience!
