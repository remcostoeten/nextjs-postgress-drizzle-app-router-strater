import { Skeleton } from "@/components/ui/skeleton"

interface MiniSpinnerProps {
  size?: '25' | '50' | '75';
}

export const MiniSpinner: React.FC<MiniSpinnerProps> = ({ size = '50' }) => {
  const scale = size === '25' ? '0.25' : size === '50' ? '0.5' : '0.75';
  return (
    <div className='mini-spinner' style={{ transform: `scale(${scale})` }}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  )
}


export const BarLoader = () => {
  return (
    <>
      <div className="box">
        <div className="barloader"></div>
      </div>
    </>
  )
}

export const SkeletonFourBarsWSpinner = () => {
  return (
    <div className="relative flex items-center space-x-4 text-black">
      <div className="absolute -left-6 lex items-center justify-center">
        <MiniSpinner size="75" />
      </div>
      <div className="opacity-30 space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[270px]" />
        <Skeleton className="h-4 w-[220px]" />
      </div>
    </div>
  )
}
