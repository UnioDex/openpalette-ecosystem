import {Box, Container, Grid, Heading, Text} from "@chakra-ui/react";
import React from "react";
import ProjectCard from "./project-card";

export default function ProjectGrid(props) {
    return (
        <Box bg={"#2222224B"} w={"full"} {...props}>
            <Container minH={"300px"} maxW="1440">
                <Heading as="h1" fontSize={{base: "20px", md: "30px", lg: "36px"}} fontWeight={"400"}>
                    <Text color={"white"}>
                        NFT Projects
                    </Text>
                </Heading>
                <Heading as="h2" fontSize={{base: "12px", md: "14px", lg: "16px"}} fontWeight={"400"} mt={"3px"}>
                    <Text color={"white"}>
                        The NFT projects that were built on top of OpenPalette
                    </Text>
                </Heading>
                <Grid mt="20px"
                      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
                      gap={[5, 5, 15, 25, 50]}
                      padding={["5px", "10px", "20px"]}>
                    {props.projects.map((project, i) => {
                        return (<ProjectCard key={i} project={project}/>)
                    })}
                </Grid>
            </Container>
        </Box>
    );
}