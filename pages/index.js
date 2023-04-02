import React, {useState, useContext, useEffect} from 'react'


import Style from "../styles/Index.module.css"
import { HeroSection, Service, Video, BigNFTSlider, Subscribe, Title, Category, Filter, NFTcard, Collection, FollowerTab, AudioLive, Slider, Brand} from '@/components/componentindex'

import { NFTMarketplaceContext } from '@/Context/NFTMarketplaceContext'


const Home = () => {
  const {checkContract } = useContext(NFTMarketplaceContext);
  useEffect(() => {

  }, );
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider /> 
      <Title heading="Latest Audio Collection" paragraph="Discover the most outstanding nfts" />

      <Title heading="Filter by collection" paragraph="Discover the most outstanding nfts" />
      <AudioLive />

      <FollowerTab />
      <Slider />

      <Collection />
      <Title heading="Featured NFTs" paragraph="Discover the most outstanding nfts" />
      <Filter />
      <NFTcard />
      <Title heading="Browse by category" paragraph="Explore the NFTs in the most featured categories" />
      <Category />
      <Subscribe />
      <Brand />
      <Video />

    </div>
  )
}

export default Home