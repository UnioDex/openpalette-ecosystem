import {Image, Link} from "@chakra-ui/react";
import React from "react";

export default function WebsiteIcon({url}) {
    return (<Link isExternal href={url} h={["20px", "30px"]} w={["20px", "30px"]} ><Image src={"/images/browser.svg"} alt={"Website"} display="inline-block"/></Link>);
}