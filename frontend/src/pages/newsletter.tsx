import Header from "@/components/Header";
import { Box, Grid, GridItem, Heading, Card, LinkBox, LinkOverlay } from "@chakra-ui/react";

export default function NewsletterPage() {
    return (
        <div>

            <div className="">

                <Header active="newsletter" />

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
                    <Heading size="xl" fontWeight={"semibold"}>2026 Issues</Heading>
                </Box>

                <div className="mx-3">

                    <Grid gap={5} templateColumns={"repeat(3, 1fr)"} className="my-5 mx-2">
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>October</Heading>
                                    <LinkOverlay href="https://us8.campaign-archive.com/?u=c0580e8ce775eb477e58e4439&id=166876eabd" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://us8.campaign-archive.com/?u=c0580e8ce775eb477e58e4439&id=166876eabd" title="FiRE+ October Newsletter" />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>September</Heading>
                                    <LinkOverlay href="https://mailchi.mp/74d3c76ec2db/fire-august-newsletter-17242106?e=c7b7bd3e8e" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://mailchi.mp/74d3c76ec2db/fire-august-newsletter-17242106?e=c7b7bd3e8e" title="FiRE+ September Newsletter" />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>August</Heading>
                                    <LinkOverlay href="https://mailchi.mp/bb12a5c9f87b/fire-august-newsletter-17241512" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://mailchi.mp/bb12a5c9f87b/fire-august-newsletter-17241512" title="FiRE+ August Newsletter" />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>July</Heading>
                                    <LinkOverlay href="https://mailchi.mp/3b62d0728548/fire-july-newsletter?e=c7b7bd3e8e" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://mailchi.mp/3b62d0728548/fire-july-newsletter?e=c7b7bd3e8e" title="FiRE+ July Newsletter" />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>June</Heading>
                                    <LinkOverlay href="https://mailchi.mp/0d3c0102a476/lauhcpi7ke-17240470" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://mailchi.mp/0d3c0102a476/lauhcpi7ke-17240470" title="FiRE+ June Newsletter" />
                            </Card>
                        </GridItem>
                        <GridItem>
                            <Card className="text-lg m-auto text-center transition hover:scale-103"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>May</Heading>
                                    <LinkOverlay href="https://mailchi.mp/9b4905796c35/lauhcpi7ke-17239778" isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src="https://mailchi.mp/9b4905796c35/lauhcpi7ke-17239778" title="FiRE+ May Newsletter" />
                            </Card>
                        </GridItem>
                    </Grid>

                </div>

            </div>


        </div>
    )
}