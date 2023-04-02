import React from 'react'
import Style from "./Discover.module.css"
import Link from 'next/link'
const Discover = () => {
  const discover = [
    {
      name: "Collection",
      link: "collection"
    },
    {
      name: "Search",
      link: "search"
    },
    {
      name: "Author Profile",
      link: "author"
    },
    {
      name: "NFT Details",
      link: "nft-details"
    },
    {
      name: "Account settings",
      link: "account"
    },
    {
      name: "Connect Wallet",
      link: "connect-wallet"
    },    
    {
      name: "Blog",
      link: "blog"
    }
  ]

  return (
    <div>{discover.map((el, i) => (
      <div key={i+1} className={Style.discover}> 
        <Link href={{pathname: `${el.link}`}} > {el.name}</Link>
      </div>
    ))}</div>
  )
}

export default Discover