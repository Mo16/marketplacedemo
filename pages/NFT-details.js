import React, { useEffect, useState, useContext } from "react";


//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";


const NFTDetails = () => {


  return (
    <div>
        <NFTDetailsPage />
        <Category />


    </div>
  );
};

export default NFTDetails;