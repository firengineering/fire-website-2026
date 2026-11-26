import Header from "@/components/Header";
import { AtSignIcon, BellIcon, ChatIcon, EmailIcon, SearchIcon, StarIcon } from "@chakra-ui/icons";
import { Card, Box, Grid, GridItem, LinkBox, LinkOverlay, Heading } from "@chakra-ui/react";
import { Bricolage_Grotesque, DM_Sans, Cedarville_Cursive } from "next/font/google";


const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});
const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap" });

const cursiveFont = Cedarville_Cursive({ subsets: ["latin"], weight: ["400"], display: "swap" });


export default function ContactPage() {
    return (
        <div>

            <div className="">

                <Header active="contact" />

                <Box className="py-40"
                    bgImage={"url('/logo-extended-vision.png')"}
                    bgPosition={"25% 50%"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}>
                </Box>

                <Box className="m-5 mb-8 p-2 text-center"
                    bgGradient="linear(to-r, orange.100, orange.300)"
                    shadow="md"
                    borderRadius={20}>
                    <p className={bodyFont.className}>For any queries, concerns or suggestions, feel free to contact us on</p>
                    <a className={bodyFont.className} href="mailto:firengineering@rmit.com.au"><EmailIcon /> <u>firengineering@rmit.edu.au</u></a>
                </Box>

                <div className="mx-3">

                    <Heading size="lg" fontWeight={"semibold"} className={headingFont.className}>Check Out Our Socials</Heading>
                    <Heading size="sm" fontWeight={"thin"} className={bodyFont.className}>
                        We'll keep you posted on our events, newsletters and photo releases through these channels! 
                        So make sure you follow us to be notified ;)
                    </Heading>



                    <Grid gap={3} templateColumns={"repeat(5, 1fr)"} className="my-5 mx-2">
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={"2"}>Instagram</Heading>
                                <LinkBox>
                                    <LinkOverlay href="http://instagram.com/firengineering_" isExternal target="_blank" rel="noopener noreferrer" />
                                    <AtSignIcon boxSize={10} className="mt-2" />
                                    <Heading className={bodyFont.className} size="sm" fontWeight={"thin"} marginBlock={"2"}>@firengineering_</Heading>
                                </LinkBox>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={"2"}>TikTok</Heading>
                                <LinkBox>
                                    <LinkOverlay href="https://www.tiktok.com/@firengineering?lang=en" isExternal target="_blank" rel="noopener noreferrer" />
                                    <StarIcon boxSize={10} className="mt-2" />
                                    <Heading className={bodyFont.className} size="sm" fontWeight={"thin"} marginBlock={"2"}>@firengineering</Heading>
                                </LinkBox>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={"2"}>Facebook</Heading>
                                <LinkBox>
                                    <LinkOverlay href="https://www.facebook.com/firengineering" isExternal target="_blank" rel="noopener noreferrer" />
                                    <ChatIcon boxSize={10} className="mt-2" />
                                    <Heading className={bodyFont.className} size="sm" fontWeight={"thin"} marginBlock={"2"}>firengineering</Heading>
                                </LinkBox>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={"2"}>Linkedin</Heading>
                                <LinkBox>
                                    <LinkOverlay href="https://au.linkedin.com/company/firengineering" isExternal target="_blank" rel="noopener noreferrer" />
                                    <SearchIcon boxSize={10} className="mt-2" />
                                    <Heading className={bodyFont.className} size="sm" fontWeight={"thin"} marginBlock={"2"}>Females+ in RMIT Engineering</Heading>
                                </LinkBox>
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={"2"}>Linktree</Heading>
                                <LinkBox>
                                    <LinkOverlay href="https://linktr.ee/firengineering" isExternal target="_blank" rel="noopener noreferrer" />
                                    <BellIcon boxSize={10} className="mt-2" />
                                    <Heading className={bodyFont.className} size="sm" fontWeight={"thin"} marginBlock={"2"}>@firengineering</Heading>
                                </LinkBox>
                            </Card>
                        </GridItem>
                    </Grid>


                    <Box className="m-5 my-8 p-2 text-center"
                    bgGradient="linear(to-r, orange.100, orange.300)"
                    shadow="md"
                    borderRadius={20}>
                        <Heading size="lg" fontWeight={"light"} margin={"auto"} textAlign={"center"}>
                            We hope to see you at our next event!
                        </Heading>
                    </Box>
                    

                </div>

            </div>

        </div>
    )
}