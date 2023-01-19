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
import bamboo from '../../images/bamboo_bg.png';

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

        {/* Body */}
        <div className="flex mt-8 bg-bamboo flex-col text-center lg:space-y-0 lg:justify-center">
          <h1 className="text-7xl drop-shadow-md font-ranchers text-gray-900 t-12 font-extrabold lg:text-5xl lg:font-extrabold">PEC<span className="text-gray-100">U</span>L<span className="text-gray-100">IA</span>R P<span className="text-gray-100">A</span>ND<span className="text-gray-100">A</span>S</h1>
          <Image className="mx-auto -mt-10" src={mainImage} alt="" />
          {/* <img className="w-80 object-cover" src={urlFor(collection.mainImage).url()} alt="" /> */}

          {loading ? (
            <p className="pt-2 text-xl text-gray-200 animate-pulse">
              Loading Supply Count...
            </p>
          ): (
            <p className="pt-2 text-xl text-gray-200">{claimedSupply} / {totalSupply?.toString()} NFT's claimed</p>
          )}
        </div>

        {/* Mint Button */}
        <button onClick={mintNFT} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className="mt-6 mx-auto h-12 w-5/6 bg-panda-yellow text-gray-700 rounded font-bold disabled:bg-gray-400">
          {loading ? (
            <>Loading</>
          ): claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ): !address ? (
            <>Connect Wallet To Mint</>
          ): (
            <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
          )}
          </button>
      </div>

      {/* About */}
      <div>

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