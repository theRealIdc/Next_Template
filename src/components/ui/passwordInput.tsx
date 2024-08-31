import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = {
  isError?: boolean;
  containerClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { className, containerClassName, children, isError = false, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className={cn(containerClassName)}>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
              {
                "border-destructive text-destructive": isError,
              }
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
            {showPassword ? (
              <EyeOff
                className="size-6"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="size-6"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        {children}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
