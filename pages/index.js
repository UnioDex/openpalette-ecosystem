import App from "../components/app";
import Header from "../components/header";
import ConnectWalletButton from "../components/connect-wallet-button";
import {Container} from "@chakra-ui/react";
import PaletteDisplay from "../components/palette-display";
import ProjectGrid from "../components/project-grid";
import nftProjects from "../config/projects";

export default function Home() {
    return (
        <App>
            <Container maxW="1440">
                <Header/>
                <ConnectWalletButton/>
                <PaletteDisplay/>
            </Container>
            <ProjectGrid projects={nftProjects} mt={"20px"} py={"20px"} />
        </App>
    );
}