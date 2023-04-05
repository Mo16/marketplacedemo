import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import {
    TiSocialFacebook,
    TiSocialInstagram,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiArrowSortedDown,
    TiArrowSortedUp,
} from "react-icons/ti";

import Style from "./Sidebar.module.css";

import images from "../../../img";
import Button from "../../Button/Button";

const Sidebar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
    const [openDiscover, setOpenDiscover] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    const discover = [
        {
            name: "Collection",
            link: "collection",
        },
        {
            name: "Search",
            link: "search",
        },
        {
            name: "Author Profile",
            link: "author-profile",
        },
        {
            name: "NFT Details",
            link: "nft-details",
        },
        {
            name: "Account settings",
            link: "account-settings",
        },
        {
            name: "Connect Wallet",
            link: "connect-wallet",
        },
        {
            name: "Blog",
            link: "blog",
        },
    ];

    const helpCenter = [
        {
            name: "About",
            link: "about",
        },
        {
            name: "Contact us",
            link: "contact-us",
        },
        {
            name: "Sign in",
            link: "sign-in",
        },
        {
            name: "Subscription",
            link: "subscription",
        },
    ];

    const openDiscoverMenu = () => {
        if (!openDiscover) {
            setOpenDiscover(true);
        } else {
            setOpenDiscover(false);
        }
    };

    const openHelpMenu = () => {
        if (!openHelp) {
            setOpenHelp(true);
        } else {
            setOpenHelp(false);
        }
    };
    const closeSideBar = () => {
        setOpenSideMenu(false);
    };

    return (
        <div className={Style.sideBar}>
            <GrClose
                className={Style.sideBar_closeBtn}
                onClick={() => closeSideBar()}
            />

            <div className={Style.sideBar_box}>
                <p>
                    <a href="/">
                        <Image
                            src={images.logo}
                            width={150}
                            alt="profile braground"
                            height={150}
                        />
                    </a>
                </p>
                <p>
                    Discover the most outstanding articles on all topices of NFT
                    & write your own stories and share them
                </p>
                <div className={Style.sideBar_social}>
                    <a href="#">
                        <TiSocialFacebook />
                    </a>
                    <a href="#">
                        <TiSocialLinkedin />
                    </a>
                    <a href="#">
                        <TiSocialTwitter />
                    </a>
                    <a href="#">
                        <TiSocialYoutube />
                    </a>
                    <a href="#">
                        <TiSocialInstagram />
                    </a>
                </div>
            </div>

            <div className={Style.sideBar_menu}>
                <div>
                    <div
                        className={Style.sideBar_menu_box}
                        onClick={() => openDiscoverMenu()}
                    >
                        <p>Discover</p>
                        <TiArrowSortedDown />
                    </div>

                    {openDiscover && (
                        <div className={Style.sideBar_discover}>
                            {discover.map((el, i) => (
                                <p key={i + 1}>
                                    <Link href={{ pathname: `${el.link}` }}>
                                        {el.name}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div
                        className={Style.sideBar_menu_box}
                        onClick={() => openHelpMenu()}
                    >
                        <p>Help Center</p>
                        <TiArrowSortedDown />
                    </div>
                    {openHelp && (
                        <div className={Style.sideBar_discover}>
                            {helpCenter.map((el, i) => (
                                <p key={i + 1}>
                                    <Link href={{ pathname: `${el.link}` }}>
                                        {el.name}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={Style.sideBar_button}>
              <a href="/createNFT">
              <Button btnName="Create" handleClick={() => {}} />

              </a>
                {currentAccount == "" ? (
                    <Button
                        btnName="Connect Wallet"
                        handleClick={() => connectWallet()}
                    />
                ) : (
                  <a href="/createNFT">
                  <Button btnName="Create" handleClick={() => {} } />
    
                  </a>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
