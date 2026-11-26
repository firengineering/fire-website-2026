import Header from "@/components/Header";
import { Box, Grid, GridItem, Heading, Card, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useState } from "react";

export default function NewsletterPage() {

    // key is the month
    // string holds the url of the newsletter (taken from Linktree)
    // displays in REVERSE order
    const ISSUES: Record<string, string> = {
        "May": "https://mailchi.mp/9b4905796c35/lauhcpi7ke-17239778",
        "June": "https://mailchi.mp/0d3c0102a476/lauhcpi7ke-17240470",
        "July": "https://mailchi.mp/3b62d0728548/fire-july-newsletter?e=c7b7bd3e8e",
        "August": "https://mailchi.mp/bb12a5c9f87b/fire-august-newsletter-17241512",
        "September": "https://mailchi.mp/74d3c76ec2db/fire-august-newsletter-17242106?e=c7b7bd3e8e",
        "October": "https://us8.campaign-archive.com/?u=c0580e8ce775eb477e58e4439&id=166876eabd"
    }


    // based on which button is clicked
    const [month, setMonth] = useState<string>("October");

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
                    <Grid gap={5} templateColumns={"2fr 1fr"} className="my-5 mx-2">
                        <GridItem rowSpan={7}>
                            <Card className="text-lg m-auto text-center"
                                bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                <LinkBox>
                                    <Box className="p-2 text-center"
                                        shadow="md"
                                        borderRadius={5}>
                                        <Heading size="lg" fontWeight={"semibold"}>{month}</Heading>
                                    </Box>
                                    <LinkOverlay href={ISSUES[month]} isExternal target="_blank" rel="noopener noreferrer" />
                                </LinkBox>
                                <iframe src={ISSUES[month]} title={"FiRE+ " + month + " Newsletter"} className="h-100" />
                            </Card>
                        </GridItem>

                        <GridItem>
                            <Box className="p-2 text-center"
                                bgGradient="linear(to-r, orange.100, orange.300)"
                                shadow="md"
                                borderRadius={5}>
                                <Heading size="lg" fontWeight={"semibold"}>Other 2026 Issues</Heading>
                            </Box>
                        </GridItem>

                        {
                            (Object.entries(ISSUES) as Array<[string, string]>).reverse().map(([key, value]) => (
                                <GridItem id={key} as={"button"} onClick={() => setMonth(key)}>
                                    <Card className="text-lg m-auto text-center transition hover:scale-103"
                                     bgColor={month == key ? "orange.400" : "black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                        <Heading size="md" fontWeight={"medium"} marginBlock={"2"}>{key}</Heading>
                                    </Card>
                                </GridItem>
                            ))
                        }

                    </Grid>
                </div>

            </div>


        </div>
    )
}