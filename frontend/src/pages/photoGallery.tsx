import Header from "@/components/Header";
import { SunIcon } from "@chakra-ui/icons";
import { Box, Heading, Grid, GridItem, Card, LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function GalleryPage() {
    return (
        <div>

            <Header active="photos" />

            <div>

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
                    <Heading size="xl" fontWeight={"semibold"}>Photo Gallery</Heading>
                </Box>

            </div>

            <div className="mx-3">

                <Grid gap={5} templateColumns={"repeat(3, 1fr)"} className="my-5 mx-2">
                    <GridItem>
                        <LinkBox>
                        <Card className="text-lg m-auto text-center justify-center transition hover:scale-103 h-50"
                            bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <div className="align-center">
                                    <Heading size="md" fontWeight={"medium"} marginBlock={5}>Halloween EOX</Heading>
                                    <SunIcon boxSize={10} className="m-auto" />
                                </div>
                                <LinkOverlay href="https://rmiteduau.sharepoint.com/sites/FIRECommittee/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FFIRECommittee%2FShared%20Documents%2FFIRE%20Social%20Media%20Team%20%F0%9F%94%A5%2F2026%2FSocial%20Event%20Photos%2FHalloween%20EOX&p=true&ga=1" isExternal target="_blank" rel="noopener noreferrer" />
                        </Card>
                        </LinkBox>
                    </GridItem>
                    <GridItem>
                        <LinkBox>
                        <Card className="text-lg m-auto text-center justify-center transition hover:scale-103 h-50"
                            bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <div className="align-center">
                                    <Heading size="md" fontWeight={"medium"} marginBlock={5}>Industry Mixer</Heading>
                                    <SunIcon boxSize={10} className="m-auto" />
                                </div>
                                <LinkOverlay href="https://rmiteduau.sharepoint.com/:f:/s/FIRECommittee/IgBQZ5OJO12CQqlGhRDxAch3AdzrSRDGZsFGmijb7ROLR6w?e=0Gwpl5" isExternal target="_blank" rel="noopener noreferrer" />
                        </Card>
                        </LinkBox>
                    </GridItem>
                </Grid>

            </div>

        </div>
    )
}