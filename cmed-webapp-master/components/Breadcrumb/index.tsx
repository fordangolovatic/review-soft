import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export interface IBreadcrumbProps {
  route?: string;
  id?: number;
  last?: string;
}

export const Breadcrumb: FC<IBreadcrumbProps> = ({ last }) => {
  const route = useRouter().asPath;
  const urlRoute: string = route;
  const splitUrl: string[] = urlRoute.split('/');
  return (
    <Breadcrumbs>
      <Link href={'/'}>Home</Link>
      {splitUrl.map((url, i) =>
        i === 0 ? null : (
          <Link
            key={i}
            href={splitUrl
              .slice(0, i + 1)
              .toString()
              .replaceAll(',', '/')}
          >
            {url !== ''
              ? last && i + 1 === splitUrl.length
                ? last.charAt(0).toUpperCase() + last.slice(1).replaceAll('-', ' ')
                : url.charAt(0).toUpperCase() + url.slice(1).replaceAll('-', ' ')
              : 'Home'}
          </Link>
        ),
      )}
    </Breadcrumbs>
  );
};
