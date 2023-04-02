import React, {useState, useEffect, useContext} from 'react'

import Image from 'next/image'
import Style from './HeroSection.module.css'
import { Button } from "../componentindex";
import images  from "../../img";


import { NFTMarketplaceContext } from '../../Context/NFTMarketplaceContext';

const HeroSection = () => {
  const {titleData} = useContext(NFTMarketplaceContext)
    return (
      <div className={Style.heroSection}>
        <div className={Style.heroSection_box}>
          <div className={Style.heroSection_box_left}>
          <h1>Discover, Collect and sell NFTs</h1>
          {titleData}

            <p>
              Discover the most outstanding NTFs in all topics of life. Creative
              your NTFs and sell them
            </p>
            <Button
              btnName="Start your search"

            />
          </div>
          <div className={Style.heroSection_box_right}>
            <Image
                className={Style.heroImg}
              src={images.hero}
              alt="Hero section"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    );
  };
  

export default HeroSection