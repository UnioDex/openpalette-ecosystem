import {Button, Text} from "@chakra-ui/react";
import React from "react";
import {useWallet} from "../hooks/useWallet";

export default function ConnectWalletButton() {
    const {connect, disconnect, isConnected, address} = useWallet();
    return (
        <Button onClick={isConnected ? disconnect : connect}
                _hover={{bg: "#f3d500", color: "black"}}
                mt={"20px"} borderColor={"#ffb200"} borderStyle={"solid"} borderBottomWidth={"3px !important"}
                borderRightWidth={"2px !important"} borderWidth={"1px"}
                bg={"transparent"} color={"white"}>
            <Text filter={"unset"}>{isConnected ? address && address.slice(0, 8) : "Connect Wallet"}</Text>
        </Button>
    );
}