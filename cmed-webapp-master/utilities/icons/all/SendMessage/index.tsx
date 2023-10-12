import * as React from 'react';

export const SendMessageIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.169 6.831l-7.92 5.5L.963 9.568a1.41 1.41 0 01.014-2.68L22.158.067a1.412 1.412 0 011.774 1.775l-6.82 21.18a1.41 1.41 0 01-2.68.012l-2.776-8.324 5.513-7.88z"
        fill="#818181"
      />
    </svg>
  );
};
