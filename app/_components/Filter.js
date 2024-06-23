'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  const activeFilter = searchParams.get('capacity') || 'all';

  return (
    <div className='border border-primary-800 flex'>
      <Button
        activeFilter={activeFilter}
        filter='all'
        handleFilter={handleFilter}
      >
        All cabin
      </Button>
      <Button
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        filter='small'
      >
        1&mdash; 3 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        filter='medium'
        handleFilter={handleFilter}
      >
        4&mdash; 7 guests
      </Button>
      <Button
        activeFilter={activeFilter}
        filter='large'
        handleFilter={handleFilter}
      >
        8&mdash; 12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;
