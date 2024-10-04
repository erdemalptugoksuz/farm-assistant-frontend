import React from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';

interface ButtonProps {
  isLoading: boolean;
  buttonState: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, buttonState, className, children }: ButtonProps) => {
  return (
    <Button className={className ?? 'shad-primary-btn w-full'} type="submit" disabled={isLoading || !buttonState}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image className="animate-spin" src="/assets/icons/loader.svg" alt="loader" width={24} height={24} />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
