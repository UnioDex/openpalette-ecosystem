import {useMemo} from "react";
import {useBackupProvider} from "./useBackupProvider";
import {useWallet} from "./useWallet";
import {ERC721, ERC721__factory} from "../typechain";

export enum ContractConnectionType {
    Injected = 0,
    Fallback = 1,
}

export type UseContractValue = {
    contract: ERC721;
    connectionType: ContractConnectionType;
};

export function useContract(contractAddress: string): UseContractValue {
    const {provider} = useBackupProvider();
    const {wallet} = useWallet();
    const injectedProvider = wallet?.web3Provider;

    const contract = useMemo(
        () => {
            if (!process.browser) {
                return null;
            }
            if (!contractAddress) return null;
            console.log(`Connecting to contract at address: ${contractAddress}`);
            return ERC721__factory.connect(contractAddress, injectedProvider ?? provider);
        },
        [contractAddress, injectedProvider, provider],
    );

    return {
        contract: contract!,
        connectionType: injectedProvider ? ContractConnectionType.Injected : ContractConnectionType.Fallback,
    };
}
