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
        d="M40.125 69a1.37 1.37 0 01-.708-.198c-8.271-5.02-16.79-14.088-21.131-19.047a42.252 42.252 0 01-4.636-6.361 1.354 1.354 0 01.516-1.805A1.367 1.367 0 0116 42.02a39.443 39.443 0 004.337 5.952c4.114 4.698 12.049 13.163 19.788 18.072 7.737-4.91 15.673-13.374 19.785-18.072 3.34-3.814 5.715-7.822 7.063-11.914 2.797-8.487 1.108-14.927-5.024-19.14-11.04-7.594-18.324.443-20.293 3.087-.716.963-2.343.963-3.06 0-1.968-2.645-9.25-10.683-20.294-3.088-5.248 3.609-7.242 8.9-5.924 15.724a1.353 1.353 0 01-1.08 1.589 1.366 1.366 0 01-1.594-1.076c-1.52-7.868.919-14.254 7.05-18.47 12.138-8.344 20.647-.354 23.372 2.88 2.723-3.232 11.233-11.224 23.37-2.88 7.142 4.91 9.239 12.594 6.066 22.22-1.461 4.44-4.017 8.764-7.597 12.852-4.341 4.96-12.86 14.03-21.131 19.047-.217.13-.463.197-.708.197z"
        fill="#00534C"
      />
      <path
        d="M32.264 50.742h-.024a1.367 1.367 0 01-1.304-1.05l-4.84-20.805-3.927 9.266c-.214.502-.708.83-1.254.83H10.362c-.361 0-.708-.144-.963-.398a1.355 1.355 0 01.963-2.317h9.65l5.209-12.289a1.343 1.343 0 011.371-.823 1.36 1.36 0 011.21 1.046l4.554 19.581 3.994-14.877a1.33 1.33 0 011.332-1.006 1.365 1.365 0 011.307 1.038l1.834 7.555h8.687c.361 0 .707.143.963.398a1.354 1.354 0 01-.963 2.316h-9.76a1.365 1.365 0 01-1.323-1.038l-.83-3.415-4.02 14.982a1.351 1.351 0 01-1.313 1.006z"
        fill="#00534C"
      />
    </svg>
  );
};

export default Icon;
