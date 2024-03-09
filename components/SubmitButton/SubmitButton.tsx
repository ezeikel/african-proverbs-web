'use client'
 
import cn from '@/utils/cn';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children?: React.ReactNode;
  className?: string;
}

const SubmitButton = ({
  children,
  className
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()
 
  return (
    <button className={cn({
      [className as string]: !!className,
    })}type="submit" aria-disabled={pending}>
      {children ? children : "Add"}
    </button>
  )
}

export default SubmitButton;
