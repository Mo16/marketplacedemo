import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { NFTMarketplaceABI, NFTMarketplaceAddress } from "./constants";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

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
        const contract = fetchContract(signer);
        return contract;
    } catch (err) {
        console.log("connectingWithSmartContract " + err);
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect and sell nfts";

    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_acounts",
            });

            if (accounts.length) {
                setCurrentAccount[accounts[0]];
            } else {
                console.log("No account found");
            }
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
                method: "eth_requestAccount",
            });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (err) {
            console.log("connectWallet " + err);
        }
    };

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return url;
        } catch (err) {
            console.log(err);
        }
    };

    const createNFT = async (formInput, fileUrl, router) => {
        const { name, description, price } = formInput;
        if (!name || !description || !price) {
            console.log("data missing");

            const data = JSON.stringify({ name, description, image: fileUrl });

            try {
                const added = await client.add(data);
                const url = `https://ipfs.infura.io/ipfs/${added.path}`;
                await createSale(url, price);
            } catch (err) {
                console.log(err);
            }
        }
    };


    const createSale = async(file, formInputPrice, isReselling, id) =>{
        try{
            const price = ethers.utils.parseUnits(formInputPrice, "ether")
            const contract = await connectingWithSmartContract()
            const listingPrice = await contract.
        }catch(err){
            console.log("create ssale error " +err)
        }
    }
    return (
        <NFTMarketplaceContext.Provider
            value={{ titleData, connectWallet, uploadToIPFS, createNFT }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    );
};
