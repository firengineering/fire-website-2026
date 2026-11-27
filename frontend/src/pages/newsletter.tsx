import Header from "@/components/Header";
import { Box, Grid, GridItem, Heading, Card, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { ISSUES } from "@/data/newsletters";
import { Bricolage_Grotesque, DM_Sans, Cedarville_Cursive } from "next/font/google";


const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});

const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap" });

const cursiveFont = Cedarville_Cursive({ subsets: ["latin"], weight: ["400"], display: "swap" });


export default function NewsletterPage() {

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
                    <Heading className={headingFont.className} size="xl" fontWeight={"semibold"}>2026 Issues</Heading>
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
                                        <Heading className={bodyFont.className} size="lg" fontWeight={"semibold"}>{month}</Heading>
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
                                <Heading className={headingFont.className} size="lg" fontWeight={"semibold"}>Other 2026 Issues</Heading>
                            </Box>
                        </GridItem>

                        {
                            (Object.entries(ISSUES) as Array<[string, string]>).reverse().map(([key, value]) => (
                                <GridItem id={key} as={"button"} onClick={() => setMonth(key)}>
                                    <Card className="text-lg m-auto text-center transition hover:scale-103"
                                     bgColor={month == key ? "orange.400" : "black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                        <Heading className={bodyFont.className} size="md" fontWeight={"medium"} marginBlock={"2"}>{key}</Heading>
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