import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { NFTMarketplaceABI, NFTMarketplaceAddress } from "./constants";

import {useRouter} from "next/router";

const projectId = "2Nv82rkhRGcrKyJJc5XGQkGxffs";
const projectSecretKey = "0030e393c8c35238c7d2f0421edf76c6";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`;

const subdomain = "https://mytestnftmarket.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );
const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        console.log(signer)

        const contract = fetchContract(signer);
        // console.log(await contract.getListingPrice)
        return contract;
    } catch (error) {
        console.log(
            "Something went wrong while connecting with contract",
            error
        );
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect and sell nfts";

    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter()

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                console.log(accounts[0])
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
            console.log(currentAccount);
        } catch (err) {
            console.log("CHeckifwalletconnected: " + err);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
            // window.location.reload();
        } catch (err) {
            console.log("connectWallet " + err);
        }
    };

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({
                content: file,
            });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (err) {
            console.log("uplaod err" + err);
        }
    };

    const createNFT = async (name, price, image, description, router) => {


        const contract = await connectingWithSmartContract();
        console.log(await contract.getListingPrice());
        if (!name || !description || !price || !image) {
            return console.log("data missing");
        }

        const data = JSON.stringify({
            name,
            description,
            image,
        });

        try {
            const added = await client.add(data);
            const url = `https://ipfs.io/ipfs/${added.path}`;
            await createSale(url, price);
        } catch (err) {
            console.log(err);
        }
    };

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();
            console.log(listingPrice);
            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                      value: listingPrice.toString(),
                  })
                : await contract.resellToken(url, price, {
                      value: listingPrice.toString(),
                  });

            await transaction.wait();
            console.log(transaction)
            router.push("/searchPage")
        } catch (err) {
            console.log("create ssale error " + err);
        }
    };

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();

            const contract = fetchContract(provider);
            console.log(contract)

            const data = await contract.fetchMarketItem();
            console.log("f" + await data)
            const items = await Promise.all(
                data.map(
                  async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    console.log("TEST" + tokenURI)
        
                    const {
                      data: { image, name, description },
                    } = await axios.get(tokenURI, {});
                    const price = ethers.utils.formatUnits(
                      unformattedPrice.toString(),
                      "ether"
                    );
        
                    return {
                      price,
                      tokenId: tokenId.toNumber(),
                      seller,
                      owner,
                      image,
                      name,
                      description,
                      tokenURI,
                    };
                  }
                )
              );
              console.log("g"+ items)
              return items;
        } catch (err) {
            console.log("axios err "+err);
        }
    };

    useEffect(() => {
        fetchNFTs()
    }, []);

    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
          if (currentAccount) {
            const contract = await connectingWithSmartContract();
    
            const data =
              type == "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();
    
            const items = await Promise.all(
              data.map(
                async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                  const tokenURI = await contract.tokenURI(tokenId);
                  const {
                    data: { image, name, description },
                  } = await axios.get(tokenURI);
                  const price = ethers.utils.formatUnits(
                    unformattedPrice.toString(),
                    "ether"
                  );
    
                  return {
                    price,
                    tokenId: tokenId.toNumber(),
                    seller,
                    owner,
                    image,
                    name,
                    description,
                    tokenURI,
                  };
                }
              )
            );
            return items;
          }
        }  catch (er) {
            console.log(er);
        }
    };

    const buyNFT = async (nft) => {
        try {
          const contract = await connectingWithSmartContract();
          const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    
          const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price,
          });
    
          await transaction.wait();
          router.push("/author");
        } catch (error) {
          console.log("Error While buying NFT"+ err);

        }
      };
    


    return (
        <NFTMarketplaceContext.Provider
            value={{
                titleData,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchMyNFTsOrListedNFTs,
                checkIfWalletConnected,
                fetchNFTs,
                buyNFT,
                currentAccount,
            }}
        >
            {" "}
            {children}{" "}
        </NFTMarketplaceContext.Provider>
    );
};
