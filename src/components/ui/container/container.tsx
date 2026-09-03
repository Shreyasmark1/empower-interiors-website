import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-[94%] md:w-[90%] xl:w-[88%] max-w-[1920px]", className)}>
      {children}
    </div>
  );
}

export { Container };
