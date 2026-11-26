import Header from "@/components/Header";
import { EmailIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Heading, Grid, GridItem, Card, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Bricolage_Grotesque, DM_Sans, Cedarville_Cursive } from "next/font/google";

const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});
const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap" });

const cursiveFont = Cedarville_Cursive({ subsets: ["latin"], weight: ["400"], display: "swap" });

const PHOTOS: Record<string, string> = {
        "Halloween EOX": "https://rmiteduau.sharepoint.com/sites/FIRECommittee/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FFIRECommittee%2FShared%20Documents%2FFIRE%20Social%20Media%20Team%20%F0%9F%94%A5%2F2026%2FSocial%20Event%20Photos%2FHalloween%20EOX&p=true&ga=1",
        "Industry Mixer": "https://rmiteduau.sharepoint.com/:f:/s/FIRECommittee/IgBQZ5OJO12CQqlGhRDxAch3AdzrSRDGZsFGmijb7ROLR6w?e=0Gwpl5",
    }

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
                    <Heading className={headingFont.className} size="xl" fontWeight={"semibold"}>Photo Gallery</Heading>
                </Box>

            </div>

            <div className="mx-3">

                <Grid gap={5} templateColumns={"repeat(3, 1fr)"} className="my-5 mx-2">

                    {
                        (Object.entries(PHOTOS) as Array<[string, string]>).map(([key, value]) => (
                            <GridItem>
                                <LinkBox>
                                <Card className="text-lg m-auto text-center justify-center transition hover:scale-103 h-50"
                                    bgColor={"black"} textColor={"white"} _hover={{ shadow: "lg", bgColor: "orange.500", textColor: "white" }}>
                                        <div className="align-center">
                                            <Heading className={cursiveFont.className} size="lg" fontWeight={"medium"} marginBlock={5}>{key}</Heading>
                                            <SunIcon boxSize={10} className="m-auto" />
                                        </div>
                                        <LinkOverlay href={value} isExternal target="_blank" rel="noopener noreferrer" />
                                </Card>
                                </LinkBox>
                            </GridItem>
                        ))
                    }

                </Grid>

                <Box className="m-2 my-8 p-2 text-center"
                    bgGradient="linear(to-r, orange.100, orange.300)"
                    shadow="md"
                    borderRadius={20}>
                    <p className={bodyFont.className}>If you missed out on photos for an event, shoot us an email at: </p>
                    <a href="mailto:firengineering@rmit.com.au"><EmailIcon /> <u>firengineering@rmit.edu.au</u></a>
                </Box>

            </div>

        </div>
    )
}