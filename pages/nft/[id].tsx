import styles from './peculiarPenguin.module.css';
import React, { useEffect, useState } from 'react';
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import pp1 from '../../images/pp1.png';
import pp2 from '../../images/pp2.png';
import pp3 from '../../images/pp3.png';
import pp4 from '../../images/pp4.png';
import pp5 from '../../images/pp5.png';
import pp6 from '../../images/pp6.png';
import pp7 from '../../images/pp7.png';
import pp8 from '../../images/pp8.png';

interface Props {
  collection: Collection
}

function NFTDropPage({collection}: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [loading, setLoading] = useState(true);
  const [priceInEth, setPriceInEth] = useState<string>();
  // Get NFT smart contract information
  const nftDrop = useContract(collection.address, "nft-drop").contract;
  const [mainImage, setMainImage] = useState(pp1);

  // Auth
  const address = useAddress();

  useEffect(() => {
    if (!nftDrop) return;

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
    }

    fetchPrice();
  }, [nftDrop]);

  useEffect(() => {
    if (!nftDrop) return;
    const fetchNFTDropData = async () => {
      setLoading(true);

      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalSupply();

      setClaimedSupply(claimed.length);
      setTotalSupply(total);

      setLoading(false);
    };
    fetchNFTDropData();
  }, [nftDrop])

  // Cycle through images
  useEffect(() => {
    const intervalId = setInterval(() => {
      imageIndex++;
      if (imageIndex === imageArr.length) {
        imageIndex = 0;
      }
      setMainImage(imageArr[imageIndex]);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  // Main image files being cycled through
  const imageArr = [pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
  let imageIndex: number = 0;

  const mintNFT = () => {
    if (!nftDrop || !address) return;

    const quantity = 1;

    setLoading(true);
    const notification = toast.loading('Minting NFT...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    });

    nftDrop?.claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // the transaction receipt
        const claimedTokenId = tx[0].id; // the id of the NFT claimed
        const claimedNFT = await tx[0].data(); // get the claimed NFT metadata

        toast(`HOORAY... You've Successfully Minted!`, {
          duration: 8000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast('Whoops... Something went wrong', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        });
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(notification);
      });
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-panda-blue">
      <Toaster position='bottom-left' />
      {/*left*/}
      {/* <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" src={urlFor(collection.previewImage).url()} alt="" />
          </div>
          <div className="p-5 text-center space-y-2">
            <h1 className="text-4xl font-bold text-white">{collection.title}</h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div> */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-around py-2">
          <Link href='/'>
            <h1 className="cursor-pointer font-extralight sm:w-80">
            Duke NFT Home
            </h1>
          </Link>
          <div className={styles.header}>
            <ConnectWallet colorMode="light" accentColor='#F9C80E' />
          </div>
        </header>

        {/* {address && <p className="text-center text-sm text-rose-400">Logged in with wallet {address.substring(0,5)}...{address.substring(address.length - 5)}</p>} */}
        {/* Content */}

        <div className="flex flex-col space-y-6 text-center lg:space-y-0 lg:justify-center">
          <h1 className="text-6xl font-ranchers text-gray-800 mt-12 font-extrabold lg:text-5xl lg:font-extrabold">{collection.title.toUpperCase()}</h1>
          <Image src={mainImage} alt="" />
          {/* <img className="w-80 object-cover" src={urlFor(collection.mainImage).url()} alt="" /> */}

          {loading ? (
            <p className="pt-2 text-xl text-green-500 animate-pulse">
              Loading Supply Count...
            </p>
          ): (
            <p className="pt-2 text-xl text-green-500">{claimedSupply} / {totalSupply?.toString()} NFT's claimed</p>
          )}

          {loading && (
            <img className="h-80 w-80" src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
          )}
        </div>
        {/* Mint Button */}
        <button onClick={mintNFT} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className="mx-auto h-12 w-5/6 bg-panda-yellow text-gray-700 rounded font-bold disabled:bg-gray-400">
          {loading ? (
            <>Loading</>
          ): claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ): !address ? (
            <>Sign in to Mint</>
          ): (
            <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
          )}
          </button>
      </div>

    </div>
  );
}

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const query = `*[_type == 'collection' && slug.current == $id][0] {
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
      },
    }
  }`

  const collection = await sanityClient.fetch(query, {
    id: params?.id
  });

  if (!collection) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      collection
    }
  }
}