import {Image, Link} from "@chakra-ui/react";
import React from "react";

export default function EtherscanIcon({url}) {
    return (<Link isExternal h={["20px", "30px"]} w={["20px", "30px"]} href={url}><Image src={"/images/etherscan.svg"} alt={"Etherscan"} display="inline-block"/></Link>);
}