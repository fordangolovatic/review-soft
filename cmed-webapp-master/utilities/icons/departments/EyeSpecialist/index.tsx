import * as React from 'react';

const Icon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={80}
      height={80}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.745 50.255c-9.209-9.21-9.209-24.14 0-33.348 9.209-9.21 24.14-9.21 33.348 0 9.21 9.208 9.21 24.139 0 33.348-9.208 9.209-24.139 9.209-33.348 0zm0 0c.507.506 1.037.99 1.588 1.448l-3.427 3.426a1.793 1.793 0 00-.331-.458m2.17-4.416a23.828 23.828 0 01-1.448-1.588l-3.427 3.427c.17.085.325.197.459.331m2.246 4.78L25 59.779l-4.78-4.78 2.574-2.574c.7-.7 1.834-.7 2.534 0l2.246 2.246c.7.7.7 1.834 0 2.534zm0 0l-6.165 6.164m6.165-6.164c.7-.7.7-1.834 0-2.534m-2.246-2.246l2.246 2.246m-2.246-2.246c-.7-.7-1.834-.7-2.534 0l-12.27 12.27c-.7.7-.7 1.835 0 2.534l2.246 2.246c.7.7 1.834.7 2.533 0l3.116-3.115m36.284-34.94a8.561 8.561 0 10.025 4.225m5.23-15.604c-7.478-7.478-19.602-7.478-27.08 0-7.478 7.477-7.478 19.602 0 27.08 7.478 7.477 19.602 7.477 27.08 0 7.478-7.478 7.478-19.603 0-27.08zm1.237 11.922a19.409 19.409 0 00-1.273-1.395c-7.441-7.402-19.566-7.402-27.007 0-.447.444-.871.91-1.273 1.395a2.539 2.539 0 00.017 3.235c.386.465.792.911 1.22 1.338 7.477 7.478 19.601 7.478 27.08 0 .426-.427.833-.873 1.218-1.338a2.539 2.539 0 00.018-3.235zM50.7 33.583a4.28 4.28 0 11-8.561 0 4.28 4.28 0 018.56 0z"
        stroke="#00534C"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;