export const infuraApiKey = "61168004b36c4524bccf07881b0ae7d7";
export const networks = {
    mainnet: {
        name: "mainnet",
        chainId: 1,
        rpcUrl: `https://mainnet.infura.io/v3/${infuraApiKey}`,
        blockExplorer: "https://etherscan.io/",
        openPaletteContractAddress: "0x1308c158e60D7C4565e369Df2A86eBD853EeF2FB",
    },
    rinkeby: {
        name: "rinkeby",
        chainId: 4,
        rpcUrl: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
        blockExplorer: "https://rinkeby.etherscan.io/",
        openPaletteContractAddress: "0x6C989C4Eda8E3fABce543Af5bfaa0D67b256354e",
    },
}
export const selectedNetwork = networks.mainnet;