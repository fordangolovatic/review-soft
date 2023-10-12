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
        d="M46.77 53.434v6.055l15.132 2.971C66.04 63.345 69 67.026 69 71.288V72M33.348 53.085v6.38l-15.25 2.995C13.96 63.345 11 67.026 11 71.288V72m13.624-34.698a3.733 3.733 0 00-2.395 3.492c0 2.062 1.659 3.733 3.705 3.733h.993m26.265 0h.89c2.046 0 3.705-1.671 3.705-3.733a3.733 3.733 0 00-2.31-3.458M42.111 55.5c4.863-1.051 11.385-6.337 11.385-13.59v-9.651c0-4.016-3.232-7.272-7.218-7.272a9.08 9.08 0 01-6.211 2.451H35.58c-4.947 0-8.958 4.04-8.958 9.024v5.448c0 7.163 6.315 11.955 11.165 13.09M26.519 40.222c-2.25-2.92-3.59-5.949-3.59-9.933 0-3.755.571-6.87 4.484-10.723 1.06-1.044 2.278-1.98 3.62-2.819C31.733 12.355 35.51 9 40.066 9c4.56 0 8.34 3.36 9.036 7.757 4.856 3.046 8.089 7.344 8.089 13.532 0 3.984-1.34 7.012-3.592 9.933m-4.496-23.465c.076.483.115.972.115 1.462a9.226 9.226 0 01-2.94 6.77m-16.282-7.54a16.97 16.97 0 0110.064-3.29m-8.83 24.146h5.075m7.164 0h5.319m-11 28.767c-8.338-.257-15.625-1.97-20.19-4.488m24.517 4.489c3.257-.098 8.215-.784 11.053-1.288 3.655-.786 6.8-1.889 9.193-3.213M42.11 51.205c3.161-.565 5.311-3.314 5.311-6.662v-2.74l-3.705-1.244v-1.286c0-2.062-1.66-3.733-3.706-3.733-2.047 0-3.706 1.671-3.706 3.733v1.286L32.6 41.803v2.74c0 3.286 2.112 6.028 5.188 6.662m0 20.795V45.868a2.17 2.17 0 012.161-2.178 2.17 2.17 0 012.162 2.178V72m14.586-56.93h2.47l-1.235 3.484h2.47m1.915-9.317h2.47l-1.235 3.484h2.47M37.787 49.103h4.328"
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