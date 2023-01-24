import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import mainimage from '../public/images/37.png';


const Home = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col m-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>Duke NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap" rel="stylesheet" />
      </Head>
      <h1 className="mb-10 text-4xl font-extralight">
        <span className="font-extrabold">Duke's</span> NFT Projects
      </h1>

      <main className='bg-slate-100 p-10 shadow-xl shadow-rose-400/20'>
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          <Link href={`/nft/peculiar-pandas`}>
            <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
              <Image className="h-96 w-60 rounded-2xl object-cover" src={mainimage} alt="" />
              <div className='p-5'>
                <h2 className='text-3xl'>Peculiar Pandas</h2>
                <p className='mt-2 text-sm text-gray-400'>A fun collection of digital panda characters that make perfect profile pictures. With a mix of cute and peculiar designs, this collection offers a wide range of options for you to express your individuality.</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home;