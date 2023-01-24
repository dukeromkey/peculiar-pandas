import styles from "./peculiarPenguin.module.css";
import React, { useEffect, useState } from "react";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import { BigNumber } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import pp1 from "../../public/images/pp1.png";
import pp2 from "../../public/images/pp2.png";
import pp3 from "../../public/images/pp3.png";
import pp4 from "../../public/images/pp4.png";
import pp5 from "../../public/images/pp5.png";
import pp6 from "../../public/images/pp6.png";
import pp7 from "../../public/images/pp7.png";
import pp8 from "../../public/images/pp8.png";
import aboutPanda from "../../public/images/32.png";
import blueTriangle from "../../public/images/blue_wide_triangle.png";
import smallPandaRow1 from '../../public/images/pandas_4v1.png';
import smallPandaRow2 from '../../public/images/pandas_4v2.png';
import smallPandaRow3 from '../../public/images/pandas_4v3.png';
import smallPandaRow4 from '../../public/images/pandas_4v4.png';
import largePandaRow1 from '../../public/images/pandas_5v1.png';
import largePandaRow2 from '../../public/images/pandas_5v2.png';
import largePandaRow3 from '../../public/images/pandas_5v3.png';
import largePandaRow4 from '../../public/images/pandas_5v4.png';
import { motion } from 'framer-motion';


function NFTDropPage() {
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [loading, setLoading] = useState(true);
  const [priceInEth, setPriceInEth] = useState<string>();
  // Get NFT smart contract information
  const nftDrop = useContract('0x57a77D51ff1CA0c6Ae526EB9D001665849D5C277', "nft-drop").contract;
  const [mainImage, setMainImage] = useState(pp1);

  // Auth
  const address = useAddress();

  useEffect(() => {
    if (!nftDrop) return;

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll();
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
    };

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
  }, [nftDrop]);

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
    };
  }, []);

  // Main image files being cycled through
  const imageArr = [pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
  let imageIndex: number = 0;

  const mintNFT = () => {
    if (!nftDrop || !address) return;

    const quantity = 1;

    setLoading(true);
    const notification = toast.loading("Minting NFT...", {
      style: {
        background: "white",
        color: "green",
        fontWeight: "bolder",
        fontSize: "17px",
        padding: "20px",
      },
    });

    nftDrop
      ?.claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // the transaction receipt
        const claimedTokenId = tx[0].id; // the id of the NFT claimed
        const claimedNFT = await tx[0].data(); // get the claimed NFT metadata

        toast(`HOORAY... You've Successfully Minted!`, {
          duration: 8000,
          style: {
            background: "green",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast("Whoops... Something went wrong", {
          style: {
            background: "red",
            color: "white",
            fontWeight: "bolder",
            fontSize: "17px",
            padding: "20px",
          },
        });
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(notification);
      });
  };

  return (
    <div className="flex min-h-screen flex-1 font-rubik text-gray-700 flex-col bg-panda-blue">
      <Toaster position="bottom-left" />
      <div className="flex flex-col relative pb-12 md:pb-20 lg:w-5/6 mx-auto max-w-screen-xl">
        {/* Header */}
        <header className="flex items-center justify-between py-4 px-8 md:py-6">
          <Link href="/">
            <h1 className="border-2 border-panda-blue-dark cursor-pointer text-panda-blue-dark px-2 py-1 rounded md:text-lg">
              NFT Portfolio
            </h1>
          </Link>
          <div className={styles.header}>
            <ConnectWallet colorMode="light" accentColor="#F9C80E" />
          </div>
        </header>

        {/* Body */}
        <div className="flex mt-6 flex-col text-center md:mt-4">
          <h1 className="text-7xl font-ranchers drop-shadow-md text-gray-900 font-extrabold md:text-8xl px-3">
            PEC<span className="text-gray-100">U</span>L
            <span className="text-gray-100">IA</span>R P
            <span className="text-gray-100">A</span>ND
            <span className="text-gray-100">A</span>S
          </h1>
          <div className="relative max-w-xl mx-auto">
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 left-10 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
              <Image src={pp1} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -left-14 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.5 }}>
              <Image src={pp2} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -left-36 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.5 }}>
              <Image src={pp3} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -left-56 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.5 }}>
              <Image src={pp4} alt="" />
            </motion.div>
            <Image className="z-10 mx-auto -mt-10 md:-mt-16" src={mainImage} alt="" />
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 right-6 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
              <Image src={pp5} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -right-14 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.5 }}>
              <Image src={pp6} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -right-36 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.5 }}>
              <Image src={pp7} alt="" />
            </motion.div>
            <motion.div className="hidden lg:flex w-28 absolute bottom-0 -right-60 z-10" initial={{ opacity: 0, y: -500 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.5 }}>
              <Image src={pp8} alt="" />
            </motion.div>
          </div>


          {/* Mint Button */}
          <button
            onClick={mintNFT}
            disabled={
              loading || claimedSupply === totalSupply?.toNumber() || !address
            }
            className="mt-10 mx-auto w-5/6 bg-panda-yellow text-gray-700 rounded font-medium disabled:bg-gray-400 hover:bg-button-border drop-shadow-lg md:text-2xl md:max-w-md p-2"
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>SOLD OUT</>
            ) : !address ? (
              <>Connect Wallet To Mint</>
            ) : (
              <span className="font-medium">Mint Panda ({priceInEth} ETH)</span>
            )}
          </button>

          {loading ? (
            <p className="pt-4 text-md text-gray-700 animate-pulse md:text-xl">
              Loading Supply Count...
            </p>
          ) : (
            <p className="pt-4 text-md text-gray-800 md:text-xl">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}
          {/* Triangle */}
          <Image className="absolute left-0 right-0 mx-auto -bottom-9 w-20 rotate-45" src={blueTriangle} alt="" />
        </div>
      </div>

      <div className="bg-panda-electric-blue flex flex-1 flex-col items-center border-t-2 border-panda-electric-dark pb-6 px-4">
        {/* About */}
        <div className="flex flex-col items-center mt-40 bg-gray-100 rounded w-5/6 p-6 pb-10 border-4 border-panda-electric-dark md:mt-52 max-w-5xl">
          <Image
            className="w-40 -mt-24 rounded-full border-4 border-panda-electric-dark md:w-52 md:-mt-32"
            src={aboutPanda}
            alt=""
          />
          <h1 className="text-5xl mt-6 font-ranchers drop-shadow-md text-gray-900 font-extrabold md:text-7xl md:mt-10">
            <span className="text-panda-blue">A</span>B
            <span className="text-panda-blue">OU</span>T
          </h1>
          <p className="mt-2 text-center md:text-xl md:mt-4 lg:text-3xl lg:px-8">
            A fun collection of digital panda characters that make perfect
            profile pictures. With a mix of cute and peculiar designs, this
            collection offers a wide range of options for you to express your
            individuality.
          </p>
          <button
            onClick={mintNFT}
            disabled={
              loading || claimedSupply === totalSupply?.toNumber() || !address
            }
            className="mt-10 lg:mt-16 mx-auto p-2 md:text-2xl w-5/6 bg-panda-yellow text-gray-700 rounded font-medium disabled:bg-gray-400 hover:bg-button-border drop-shadow-lg max-w-lg"
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>SOLD OUT</>
            ) : !address ? (
              <>Connect Wallet To Mint</>
            ) : (
              <span className="font-medium">Mint Panda</span>
            )}
          </button>
        </div>
        {/* Panda Image Rows */}
        <div className="flex flex-col space-y-4 mt-12 overflow-hidden md:mt-24 md:space-y-10 max-w-screen-2xl w-5/6">
          <motion.div initial={{ opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}>
            <Image src={smallPandaRow1} className="lg:hidden" alt="" />
            <Image src={largePandaRow1} className="hidden lg:flex" alt="" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}>
            <Image src={smallPandaRow2} className="lg:hidden" alt="" />
            <Image src={largePandaRow2} className="hidden lg:flex" alt="" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}>
            <Image src={smallPandaRow3} className="lg:hidden" alt="" />
            <Image src={largePandaRow3} className="hidden lg:flex" alt="" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }}>
            <Image src={smallPandaRow4} className="lg:hidden" alt="" />
            <Image src={largePandaRow4} className="hidden lg:flex" alt="" />
          </motion.div>

        </div>

        {/* Credits */}
        <footer className="mt-16">
          <h5 className="text-gray-400 text-xs">Designed & Built by Duke Romkey</h5>
        </footer>
      </div>

    </div>
  );
}

export default NFTDropPage;
