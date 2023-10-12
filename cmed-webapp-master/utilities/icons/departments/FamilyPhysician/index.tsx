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
        d="M67.975 47.241c-.255-2.09-1.084-3.729-2.952-4.87-1.353-.829-2.449-.957-7.63-2.248v-.27h5.172a2.295 2.295 0 002.292-2.264c.653-11.072.75-12.34.706-12.863a.879.879 0 10-1.757 0v.834c-.738 12.504-.707 11.95-.707 12 0 .29-.245.534-.534.534h-5.172v-.227c.283-.19 2.384-1.116 3.909-3.587 1.69-2.726 1.454-5.03 1.457-7.262 0-.894-.697-1.621-1.588-1.655-6.518-.25-9.863-3.944-10.733-5.07a1.458 1.458 0 00-1.736-.45 1.472 1.472 0 00-.518.373c-1.368 1.54-2.915 2.027-3.715 2.18a1.545 1.545 0 00-1.252 1.517c.003 5.525-.007 5.22.008 5.609.023 3.431 2.332 6.88 5.324 8.328v.244h-5.247a.541.541 0 01-.534-.534c0-.051.03.481-.708-12.027a1.124 1.124 0 00-.004-.048c-.01-.091-.982-9.146 4.102-10.264a.878.878 0 00.593-.457c.021-.04 2.19-4.09 9.184-2.727 2.784.53 6.95 3.846 7.732 8.726a.88.88 0 001.735-.279c-.338-2.311-1.489-4.75-3.228-6.602l-.063-.067c-1.745-1.849-4.342-3.212-5.84-3.504-2.358-.459-5.764-.632-8.598 1.15-1.221.766-1.933 1.652-2.263 2.137-2.593.736-4.292 3.049-4.924 6.716-.451 2.62-.211 5.052-.18 5.346.824 12.714.541 12.239 1.018 13.053-2.497-.401-5.04.313-6.966 2.134l-.768-.191-2.138-1.024v-1.784c4.353-2.16 5.05-6.48 5.092-6.56a9.95 9.95 0 00.236-2.144v-.009c1.587-.346 2.767-1.605 2.767-3.102 0-.62-.203-1.2-.553-1.69.014-2.312.08-3.671-.415-5.495-.127-.322-.542-2.364-2.382-4.559l-.008-.01c-3.4-4.045-9.264-5.589-14.524-3.025a11.99 11.99 0 00-6.642 10.731v2.358c-1.306 1.832-.19 4.268 2.215 4.792.08 3.986 2.224 7.13 5.37 8.734v1.743l-2.225 1.066c-2.425.678-4.306.856-5.746 1.924-1.744 1.331-2.355 2.538-2.612 4.648C9.94 66.111 9.99 64.966 10.003 65.806c-.025 2.24 1.54 4.194 4.13 4.194h7.684a.879.879 0 100-1.758h-3.302l.871-16.486a.88.88 0 00-1.755-.093l-.183 3.467-4.484-.47.015-.13c.905-7.166.58-8.252 1.789-9.69l.01-.012c1.472-1.739 3.807-1.777 5.615-2.341l2.702 3.459a1.745 1.745 0 002.614.155l.421-.425v4.253a.879.879 0 101.758 0v-4.253l.421.425a1.745 1.745 0 002.614-.155l1.235-1.581c-.512 1.65-.332 2.889-.37 3.59-1.685 1.578-.826 4.168 1.554 4.696a6.74 6.74 0 003.445 4.803v1.07c-3.1.834-5.54.869-6.643 3.498a4.74 4.74 0 00-.223.736c-.135.656-.14 1.07-.657 5.484H25.92a.879.879 0 100 1.758h27.743a.879.879 0 100-1.758h-2.925c-.477-3.506-.432-5.012-.83-6.092-.529-1.443-1.816-2.408-3.211-2.76l-3.481-.867v-1.084a6.748 6.748 0 003.416-4.788c.012-.007 2.047-.379 2.39-2.298.097-.535.023-1.1-.246-1.622 1.673-.34 3.31-1.577 4.194-2.344 4.479 3.886 8.502 3.4 8.83-3.355.645.2 3.69.666 4.299 3.611.046.22.098.534.13.802l.808 7.213-4.448.466-.183-3.461a.88.88 0 00-1.531-.542.88.88 0 00-.225.634l.872 16.487h-3.758a.879.879 0 100 1.757h8.103c1.184 0 2.2-.395 2.94-1.145.76-.77 1.205-1.91 1.191-3.051.012-.74.072.302-2.022-18.562zM17.3 56.883l-.57 11.359h-2.597c-1.529 0-2.34-1-2.373-2.453-.01-.622.023-.412 1.008-9.382l4.532.476zM36.78 27.3v-2.534c1.342.554 1.343 1.98 0 2.534zm-19.542 0c-1.343-.553-1.343-1.98 0-2.534V27.3zm.76-4.461a4.073 4.073 0 00-1.217.22c.011-.92-.057-1.753.182-3 .102-.273.489-3.264 3.254-5.722.37-.286.978-.926 2.546-1.66 3.379-1.543 7.512-1.3 11.037 1.66 2.384 2.119 2.906 4.521 3.081 4.967.49 1.809.319 3.087.355 3.756a4.063 4.063 0 00-1.215-.22c-.223-.127-.43-.301-.592-.48-1.198-1.38-.182-2.45-1.467-3.523-.907-.756-1.775-.467-3.379-.258-7.47.806-8.968-1.043-10.527.258-.46.384-.749.938-.768 1.626-.07 1.867-1.214 2.29-1.29 2.376zm.998 6.305V24.29c.665-.48 1.154-.868 1.592-1.797.251-.53.434-1.2.46-2.03a.388.388 0 01.452-.364c9.281 1.236 11.442-.757 11.47.364.056 1.965 1.137 3.046 1.154 3.075.322.356.53.486.898.752v4.068c-.058.254.625 5.243-4.338 7.91-.012.004-1.293.74-3.145.87-.465.03-.923.01-.91.01-4.35-.202-7.633-3.809-7.633-8.004zm5.475 15.708l-2.366-3.03 1.19-.57 2.455 2.312-1.279 1.288zm2.538-2.517l-2.643-2.489v-1.294a9.846 9.846 0 005.307-.006v1.28l-2.664 2.509zm2.538 2.517l-1.279-1.288 2.469-2.325 1.188.569-2.378 3.044zm3.7 5.9c-.802-.458-.733-1.287 0-1.704v1.704zm13.896-16.126c-2.78-3.09-2.166-5.878-2.169-10.539 1.008-.22 2.73-.819 4.29-2.45 1.249 1.508 4.974 5.185 11.737 5.479-.004 2.336.006 1.92-.008 2.39v-.002c-.08.316.082 3.22-2.873 5.794l-.101.082a8.028 8.028 0 01-9.374.499c-.177-.115-1.303-1.062-1.502-1.253zm-3.156 25.901l.038.01c1.775.484 2.372.485 3.137.944 1.602.96 1.15 2.143 1.796 6.761h-2.34l-.103-1.897a.878.878 0 10-1.755.096l.098 1.8h-9.691l.099-1.8a.88.88 0 00-1.465-.703.876.876 0 00-.29.607l-.104 1.897h-2.364c.583-4.996.336-5.887 1.796-6.762.73-.437 1.204-.43 3.175-.953a5.324 5.324 0 003.987 1.8 5.323 5.323 0 003.986-1.8zm-5.443-2.42a6.772 6.772 0 001.185.149l.062.002a6.597 6.597 0 001.666-.158c.043.338-.193 1.32.542 1.853a3.552 3.552 0 01-3.997 0c.733-.531.5-1.524.542-1.846zm6.415-6.3a4.984 4.984 0 01-2.858 4.226c-.04.005-2.69 1.424-5.241-.634-.028-.04-1.538-1.097-1.813-3.23-.075-.573-.027-1.03-.042-3.473 3.86.799 6.55-.751 7.726-2.288.78 1.149 1.669 1.642 2.237 1.852-.002 3.763.005 3.286-.01 3.548zm1.468-4.697c-.295-.364-.643-.431-.783-.476-.387-.123-1.13-.512-1.762-1.724-.494-.947-1.85-.911-2.304.042-.514 1.08-2.86 2.962-6.83 1.876a1.177 1.177 0 00-1.115.27l-.087.014c.002-.577.007-.599.006-.587.226-5.364 6.634-8.142 10.701-4.546 0 .004.01.004.01.008 1.039.924 1.749 2.119 2.05 3.604.147.773.108 1.398.114 1.519zm-.806-6.258a7.516 7.516 0 00-1.288-1h4.216v.272l-2.928.728zm1.105 9.902v-1.706c.313.179.578.49.578.853 0 .456-.346.678-.578.853zm1.459-3.7c-.018-.134.096-1.358-.454-2.946.924.793 2 1.364 3.16 1.675-.839.602-1.85 1.177-2.706 1.27zm-.014-5.025l1.14-.284a.89.89 0 00.151-.052c.513-.233.844-.824.844-1.507v-1.644c1.59.451 3.27.539 5.329.01v1.634c0 .683.331 1.275.844 1.507.049.022.099.04.15.052l1.138.284c-2.579 3.017-7.012 3.024-9.596 0zm10.394 4.932c-1.018.425-2.624-.53-3.53-1.184 1.867-.518 3.454-1.65 4.594-3.285l.428.107c-.073 2.45-.595 3.988-1.492 4.362zm8.99 20.659c-.932.945-2.197.51-4.274.622l-.6-11.36 4.55-.477.99 8.85c.075.874-.045 1.736-.666 2.365z"
        fill="#00534C"
      />
    </svg>
  );
};

export default Icon;
