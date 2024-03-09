import cn from "@/utils/cn";

type PageWrapProps = {
  children: React.ReactNode;
  className?: string;
}

const PageWrap = ({
  children,
  className
}: PageWrapProps) => {
  return (
    <div className={cn('p-4 min-h-screen bg-slate-300 text-black',{
      [className as string]: !!className,
    })}>
      {children}
    </div>
  )

}

export default PageWrap;