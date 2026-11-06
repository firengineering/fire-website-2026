import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { HStack, VStack, Heading, Container } from "@chakra-ui/react";


export default function Home() {
  return (
    <div>
        <Header active="home" />
        <Container maxW= "container.2xl" minH = "80vh" bgImage = "/homepage-banner.jpg" bgSize = "cover" bgPosition="center" display = "flex" alignItems = "flex-end" justifyContent = "flex-start" pb={8}
        //adding a banner with image to enhance the design of the hompage
        >
            <Heading as = "h1" fontSize = "75px" color = "white" textAlign = "left">
                FiRE+ <br/> Engineering
            </Heading>
        </Container>
        
    </div>
  );
}
