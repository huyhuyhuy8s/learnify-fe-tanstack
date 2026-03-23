import { useState } from 'react'
import { cn } from '~/utils'

type OptimizeImageProps = {
  src: string
  alt: string
  folder?: string
  className?: string
}

const OptimizeImage = ({ 
  src, 
  alt,
  folder,
  className
}: OptimizeImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const renderContent = () => {
    if (!src) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100/80">
          <span className="text-slate-600 text-sm">No image available</span>
        </div>
      )
    }

    const imageKitURL = src.startsWith('https') 
      ? src 
      : `https://ik.imagekit.io/q4phit8d9e/${folder}/${src}.png?tr=w-auto,h-auto,fo-auto`

    return (
      <>
        {!isLoaded && <div className="absolute inset-0 bg-slate-200 animate-pulse" />}
        <img 
          src={imageKitURL}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'transition-opacity duration-(--duration-main)',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      </>
    )
  }

  return (
    <div className="relative size-full">
      {renderContent()}
    </div>
  )
}

export default OptimizeImage