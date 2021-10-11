import {useOpenPaletteContract} from "../hooks/useOpenPaletteContract";
import React, {useEffect, useState} from "react";
import {getPaletteById} from "@openpalette/core";
import {Box, Center, Grid, Select, Text} from "@chakra-ui/react";
import {useWallet} from "../hooks/useWallet";

export default function PaletteDisplay() {
    const {isConnected, wallet} = useWallet();
    const {openPaletteContract} = useOpenPaletteContract();
    const [palettes, setPalettes] = useState([]);
    const [paletteObjects, setPaletteObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPalette, setSelectedPalette] = useState(null);

    const changePalette = (e) => {
        if (e.target.value)
            setSelectedPalette(paletteObjects[e.target.value]);
    };

    useEffect(() => {
        if (!isConnected) return;

        async function update() {
            let tokenCount;
            try {
                tokenCount = await openPaletteContract.balanceOf(wallet.address);
            } catch {
                tokenCount = 0;
            }
            let paletteArr = [];
            for (let i = 0; i < tokenCount; i++) {
                paletteArr.push(await openPaletteContract.tokenOfOwnerByIndex(wallet.address, i));
            }
            setPalettes(paletteArr);
        }

        // noinspection JSIgnoredPromiseFromCall
        update();

    }, [isConnected, wallet, openPaletteContract]);

    useEffect(() => {
        if (!palettes || palettes.length === 0) return;
        let paletteArr = [];
        for (let palette of palettes) {
            paletteArr.push(getPaletteById(palette.toNumber()).colors);
        }
        setPaletteObjects(paletteArr);
        setSelectedPalette(paletteArr[0])
        setLoading(false);
    }, [palettes]);

    if (isConnected && !loading && selectedPalette) {
        if (paletteObjects.length !== 0) {
            return (<>
                <Box mt={"10px"} w={"280px"}>
                    <Select onChange={changePalette} placeholder="Select Palette">
                        {palettes ? palettes.map((palette, i) => {
                            return (
                                <option key={i} value={i}>{"#" + palette.toString()}</option>);
                        }) : <></>}
                    </Select>
                </Box>
                <Grid mt={"10px"} templateColumns="repeat(5, 1fr)" gap={0}>
                    <Box w="100%" h="10" bg={selectedPalette[0]}>
                        <Center h={"100%"}><Text
                            fontSize={["12px", "14px", "16px"]}>{selectedPalette[0]}</Text></Center>
                    </Box>
                    <Box w="100%" h="10" bg={selectedPalette[1]}>
                        <Center h={"100%"}><Text
                            fontSize={["12px", "14px", "16px"]}>{selectedPalette[1]}</Text></Center>
                    </Box>
                    <Box w="100%" h="10" bg={selectedPalette[2]}>
                        <Center h={"100%"}><Text
                            fontSize={["12px", "14px", "16px"]}>{selectedPalette[2]}</Text></Center>
                    </Box>
                    <Box w="100%" h="10" bg={selectedPalette[3]}>
                        <Center h={"100%"}><Text
                            fontSize={["12px", "14px", "16px"]}>{selectedPalette[3]}</Text></Center>
                    </Box>
                    <Box w="100%" h="10" bg={selectedPalette[4]}>
                        <Center h={"100%"}><Text
                            fontSize={["12px", "14px", "16px"]}>{selectedPalette[4]}</Text></Center>
                    </Box>
                </Grid></>);
        } else {
            return (
                <Text mt={"10px"}>{"You don't have any OpenPalettes."}</Text>
            );
        }
    } else {
        return <></>
    }
}