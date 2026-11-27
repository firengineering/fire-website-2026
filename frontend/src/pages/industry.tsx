import Header from "@/components/Header";
import { Box, Card, Link, Heading, Grid, GridItem, Button, Highlight } from "@chakra-ui/react";
import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { Bricolage_Grotesque, DM_Sans, Cedarville_Cursive } from "next/font/google";


const headingFont = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["600", "800"],
    display: "swap",
});

const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap" });


export default function IndustryPage() {
    return (
        <div>
            <Header active="industry" />

            <div className="mb-10">

                <Box className="py-25"
                    bgImage={"url('/banner-events-bg.png')"}
                    bgPosition={"25% 90%"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}
                >
                    <Heading as="h1"
                        className={"text-white text-shadow-md text-shadow-orange-300 m-auto text-center " + headingFont.className}
                        fontSize={"6xl"}>Meet Our Sponsors</Heading>
                </Box>


                <Box className={"mb-10 py-15 px-5 text-center w-10/10 " + bodyFont.className}
                    bgColor="black"
                    textColor="white"
                >
                    <p>The support we receive from our sponsors make running FiRE+ possible. Their unwavering support
                        helps us promote inclusivity in engineering.<br />
                        Not to mention, they also provide opportunities for budding engineers to get into industry, whether it be
                        through internships or graduate programs.
                        So make sure to check out their websites below!
                    </p>
                </Box>


                <Grid templateColumns={"1fr 1fr"} gap={5} placeItems={"center"}
                    className={"mx-5 " + bodyFont.className}>

                    <GridItem className="col shadow-lg hover:shadow-2xl transition-shadow duration-300" h={"100%"} >
                        <Link href="https://www.vanguard.com.au/corporate/" isExternal>
                            <Image src="/industry/vanguard.png" alt="FiRE+ logo" width={400} height={20} className="m-auto mt-10 my-3" />
                        </Link>

                        <p>
                            {/* FROM THE AUG 2026 NEWSLETTER */}
                            Vanguard is one of the world's largest investment management
                            companies with more than 50 million investors worldwide who
                            have worked in Australia for over 25 years and globally since 1975.
                        </p>

                        <Card className="p-2 my-4">
                            <p>
                                <i>
                                    {/* FROM THE AUG 2026 NEWSLETTER */}
                                    We are proud to continue our partnership with FIRE+
                                    (Females in RMIT Engineering),
                                    reinforcing our commitment to diversity, inclusion, and supporting
                                    the next generation of engineering talent. As an inclusive
                                    organisation, we are guided by our mission: to take a stand for
                                    all investors, to treat them fairly, and to give them the best chance
                                    for investment success.
                                </i>
                            </p>
                        </Card>

                        <Button as={"a"} my={"2"}>
                            <a href="https://www.vanguard.com.au/corporate/"
                                target="_blank" rel="noopener noreferrer">
                                Find Out More <ExternalLinkIcon />
                            </a>
                        </Button>
                    </GridItem>

                    <GridItem className="col shadow-lg hover:shadow-2xl transition-shadow duration-300" h={"100%"}>
                        <Link href="https://www.vanguard.com.au/corporate/" isExternal>
                            <Image src="/industry/kbr.png" alt="FiRE+ logo" width={300} height={20} className="m-auto mt-10 my-3" />
                        </Link>

                        <p>
                            {/* FROM THE AUG 2026 NEWSLETTER */}
                            KBR is a company operating in the field of science, technology
                            and engineering, conducting projects and providing comprehensive,
                            efficient, safe and sustainable solutions to their clients and the
                            government to solve challenges in various fields such as space
                            exploration, national security, climate change, and energy. For
                            instance, KBR provide solutions for NASA regarding space exploration,
                            health innovation, engineering, technological and scientific research.
                        </p>

                        <Button as={"a"} my={"2"}>
                            <a href="https://www.kbr.com/en"
                                target="_blank" rel="noopener noreferrer">
                                Find Out More <ExternalLinkIcon />
                            </a>
                        </Button>
                    </GridItem>
                </Grid>


            </div>


            <Box className={"py-15 px-15 w-10/10 " + bodyFont.className}
                bgColor="black"
                textColor="white"
            >
                <Grid templateColumns={"1fr 1fr"} justifyItems={"center"} gap={15}>
                    <GridItem>
                        <Heading fontSize={"4xl"} fontWeight={"bold"} className={"my-2 " + headingFont.className}>
                            <Highlight query="FiRE+" styles={{color: "orange"}}>Want to Sponsor FiRE+?</Highlight>
                        </Heading>
                        <p>Get in touch with us by sending us an email at </p>
                            <a className={bodyFont.className} href="mailto:firengineering@rmit.com.au">
                            <EmailIcon /> <u>firengineering@rmit.edu.au</u>
                            </a>
                    </GridItem>
                    <GridItem>
                        <Image src="/logo.png" alt="FiRE+ Logo" width={150} height={70} />
                    </GridItem>
                </Grid>
            </Box>


        </div>
    )
}