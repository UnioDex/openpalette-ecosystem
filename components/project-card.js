import {Box, Center, HStack, Image, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import WebsiteIcon from "./icon-links/website-icon";
import OpenseaIcon from "./icon-links/opensea-icon";
import EtherscanIcon from "./icon-links/etherscan-icon";
import React, {useEffect, useState} from "react";
import {useWallet} from "../hooks/useWallet";
import {useContract} from "../hooks/useContract";

export default function ProjectCard({project}) {
    const {isConnected, wallet} = useWallet();
    const {contract} = useContract(project.address);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (!isConnected) return;
        if (!contract) return;
        if (!wallet.address) return;

        async function update() {
            let tokenCount;
            try {
                tokenCount = await contract.balanceOf(wallet.address);
            } catch {
                tokenCount = 0;
            }

            if (tokenCount)
                setBalance(tokenCount.toNumber());
            else
                setBalance(0);
        }

        // noinspection JSIgnoredPromiseFromCall
        update();

    }, [isConnected, wallet, contract]);

    return (<Center>
        <Box border={"1px solid"} borderColor={"gray.100"} borderRadius={"10"} bg="gray.700"
             overflow={"hidden"} maxW={["360px", "600px", "1400px"]} w={"100%"}>
            <Image w={"100%"} h={["150px", "175px", "200px"]} objectFit="contain" bg={"black"}
                   borderBottom={"1px solid"}
                   borderColor={"gray.600"}
                   src={project.thumbnail}
                   alt={project.name + "Logo"}/>
            <Box padding={"10px"} w={"100%"}>
                <Box align={"center"} w={"100%"}>
                    <Center w={"100%"}>
                        <HStack align={"center"}>
                            {project.isOfficial && <Icon fontSize={"20px"} viewBox="0 0 24 24"
                                                         strokeWidth="0"
                                                         height="1em"
                                                         width="1em"
                                                         stroke="currentColor" fill="blue.400" color="currentColor">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path
                                    d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
                            </Icon>}
                            <Text fontSize={"20px"} color={"white"} align={"center"}>{project.name}</Text>
                        </HStack>
                    </Center>
                </Box>
                {project.address && isConnected && <Text fontSize={"16px"} color={"whiteAlpha.800"} align={"center"}>
                    Your Balance: {balance}
                </Text>}
                {(!project.address || !isConnected) &&
                <Text fontSize={"16px"} color={"whiteAlpha.800"} align={"center"}>Your Balance: Unknown</Text>}
                <Center>
                    <HStack columns={"3"} gap={"5"} mt={"10px"}>
                        <WebsiteIcon url={project.website}/>
                        <OpenseaIcon url={project.opensea}/>
                        {project.etherscan && <EtherscanIcon url={project.etherscan}/>}
                    </HStack>
                </Center>
            </Box>
        </Box>
    </Center>)
}