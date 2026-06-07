"use client"

import dynamic from 'next/dynamic';

const Spreadsheet = dynamic(() => import('./(components)/Spreadsheet'), {
  ssr: false,
  loading: () => <div>Loading spreadsheet…</div>,
});

function Home() {
  return (
    <div className='h-full w-full text-black'>
      <Spreadsheet />
    </div>
  );
}

export default Home;