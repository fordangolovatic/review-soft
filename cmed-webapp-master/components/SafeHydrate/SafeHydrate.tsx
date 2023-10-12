import { FC, ReactNode } from 'react';

type SafeHydrateProps = {
  children: ReactNode;
};

const SafeHydrate: FC<SafeHydrateProps> = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

export default SafeHydrate;
