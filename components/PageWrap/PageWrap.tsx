import cn from "@/utils/cn";

type PageWrapProps = {
  children: React.ReactNode;
  className?: string;
};

const PageWrap = ({ children, className }: PageWrapProps) => {
  return (
    <div
      className={cn("flex flex-col min-h-screen p-4", {
        [className as string]: !!className,
      })}
    >
      {children}
    </div>
  );
};

export default PageWrap;
