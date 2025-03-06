import { ReactNode } from "react";
interface CustomContainerProps {
  children: ReactNode;
  className?: string;
}

const CustomContainer = ({
  children,
  className = "",
}: CustomContainerProps) => {
  return (
    <div className={`container mx-auto my-5 px-4 ${className}`}>{children}</div>
  );
};

export default CustomContainer;
