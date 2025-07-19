'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4 px-4">
      <Link href="/" className="hover:underline">Home</Link>
      {pathSegments.map((segment, i) => {
        const href = '/' + pathSegments.slice(0, i + 1).join('/');
        const name = segment.replace(/-/g, ' ');

        return (
          <span key={i}>
            {' >> '}
            <Link href={href} className="hover:underline capitalize">
              {name}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};
