import React from 'react'
import Link from 'next/link'

import Style from "./HelpCenter.module.css"

const HelpCenter = () => {

  const helpCenter = [
    {
      name: "About",
      link: "about"
    },
    {
      name: "Contact us",
      link: "contact-us"
    },
    {
      name: "Sign in",
      link: "sign-in"
    },
    {
      name: "Subscription",
      link: "subscription"
    },

  ]
  return (
    <div className={Style.box}>
      {helpCenter.map((el,i) => (
        <div className={Style.helpCenter} key={i+1}>
          <Link href={{pathname: `${el.link}`}}> {el.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default HelpCenter