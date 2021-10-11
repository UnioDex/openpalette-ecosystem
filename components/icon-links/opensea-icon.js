import {Image, Link} from "@chakra-ui/react";
import React from "react";

export default function OpenseaIcon({url}) {
    return (<Link isExternal h={["20px", "30px"]} w={["20px", "30px"]} href={url}><Image src={"/images/opensea-transparent.svg"} alt={"OpenSea"} display="inline-block"/></Link>);
}