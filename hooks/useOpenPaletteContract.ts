import {useMemo} from "react";
import {useBackupProvider} from "./useBackupProvider";
import {useWallet} from "./useWallet";
import * as config from "../config";
import {ERC721Enumerable, ERC721Enumerable__factory} from "../typechain";

export enum ContractConnectionType {
    Injected = 0,
    Fallback = 1,
}

export type UseOpenPaletteContractValue = {
    openPaletteContract: ERC721Enumerable;
    connectionType: ContractConnectionType;
};

export function useOpenPaletteContract(): UseOpenPaletteContractValue {
    const {provider} = useBackupProvider();
    const {wallet} = useWallet();
    const injectedProvider = wallet?.web3Provider;

    const openPaletteContract = useMemo(
        () => {
            if (!process.browser) {
                return null;
            }
            const contractAddress = config.selectedNetwork.openPaletteContractAddress;
            console.log(`Connecting to OpenPalette contract at address: ${contractAddress}`);
            return ERC721Enumerable__factory.connect(contractAddress, injectedProvider ?? provider);
        },
        [provider, injectedProvider],
    );

    return {
        openPaletteContract: openPaletteContract!,
        connectionType: injectedProvider ? ContractConnectionType.Injected : ContractConnectionType.Fallback,
    };
}
