import {Box, Flex, Heading, Image, Link, LinkBox, LinkOverlay, Text,} from "@chakra-ui/react";
import React from "react";

const Header = (props) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            color="black"
            verticalAlign={"middle"}
            {...props}
            mt={4}
        >
            <LinkBox>
                <Flex direction={"column"}>
                    <LinkOverlay href={"/"}>
                        <Heading as="h1" fontSize={{base: "24px", md: "34px", lg: "40px"}} fontWeight={"400"}>
                            <Text className={"rainbowText"}>
                                Open Palette Ecosystem
                            </Text>
                        </Heading>
                    </LinkOverlay>
                    <Heading as="h2" fontSize={{base: "16px", md: "22px", lg: "24px"}} fontWeight={"400"}>
                        <Text color={"white"}>
                            by <Link href="https://twitter.com/YigitDuman" target="_blank"
                                     rel="noopener noreferrer">Yigit Duman</Link>
                        </Text>
                    </Heading>
                </Flex>
            </LinkBox>

            <Box mt={["10px", "10px", "0"]}>
                <Link href={"https://openpalette.io/"} isExternal>
                    <Image src={"/images/openpalette-logo.png"} alt={"OpenPalette"} w={["40px", "60px"]}
                           h={["40px", "60px"]}
                           display="inline-block" mr={"8px"}/>
                </Link>
                <Link href={"https://opensea.io/collection/openpalette"} isExternal>
                    <Image src={"/images/opensea.svg"} alt={"OpenSea"} w={["40px", "60px"]}
                           h={["40px", "60px"]}
                           display="inline-block" mr={"8px"}/>
                </Link>
                <Link href={"https://twitter.com/open_pal"} isExternal>
                    <Image src={"/images/twitter.svg"} alt={"Twitter"} w={["40px", "60px"]}
                           h={["40px", "60px"]}
                           display="inline-block" mr={"8px"}/>
                </Link>
                <Link href={"https://discord.gg/XwQ3guVfe3"} isExternal>
                    <Image src={"/images/discord.svg"} alt={"Discord"} w={["40px", "60px"]}
                           h={["40px", "60px"]}
                           display="inline-block"/>
                </Link>
            </Box>
        </Flex>
    );
};
export default Header;