import * as React from 'react';

export const CommentsIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={28}
      height={28}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.243 14.892h.008m-3.817 0h.009m-3.818 0h.009m10.584 6.324c-2.904 2.904-7.203 3.531-10.72 1.904-.52-.209-.946-.378-1.35-.378-1.128.007-2.532 1.1-3.261.372-.73-.73.364-2.134.364-3.269 0-.405-.162-.823-.371-1.343-1.628-3.518-1-7.818 1.904-10.721 3.706-3.708 9.728-3.708 13.434-.001 3.713 3.713 3.706 9.73 0 13.436z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
