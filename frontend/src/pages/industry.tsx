import Header from "@/components/Header";
import { Box, Card, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "@/styles/industry.module.css";
import Image from "next/image";

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
                    <h1 className="text-white text-shadow-md text-shadow-orange-300 m-auto text-center">Meet Our Sponsors</h1>
                </Box>


                <Box className="m-5 mb-8 p-2 text-center"
                    bgGradient="linear(to-l, orange.100, orange.300)"
                    shadow="md"
                    borderRadius={20}
                >
                    <p>The support we receive from our sponsors make running FiRE+ possible. Their unwavering support  
                        helps us promote inclusivity in engineering.<br/>
                        Not to mention, they also provide opportunities for budding engineers to get into industry, whether it be 
                        through internships or graduate programs. 
                        So make sure to check out their websites below!
                    </p>
                </Box>
                

                <div className="grid grid-cols-2 gap-5 m-3 justify-center">
                    <div className="col transition duration-300 hover:-translate-y-2">
                        
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
                                 (Females in RMIT Engineering) for a second consecutive year,
                                 reinforcing our commitment to diversity, inclusion, and supporting
                                 the next generation of engineering talent. As an inclusive
                                 organisation, we are guided by our mission: to take a stand for
                                 all investors, to treat them fairly, and to give them the best chance
                                 for investment success.
                                </i>
                            </p>
                        </Card>
                        
                        <div className="m-auto">
                            <a className="btn" href="https://www.vanguard.com.au/corporate/"
                                target="_blank" rel="noopener noreferrer">
                                Find Out More <ExternalLinkIcon />
                            </a>
                        </div>
                        
                    </div>


                    <div className="col transition duration-300 hover:-translate-y-2">

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

                        <a className="btn" href="https://www.kbr.com/en"
                         target="_blank" rel="noopener noreferrer">
                            Find Out More <ExternalLinkIcon />
                        </a>

                    </div>
                </div>


                {/* <a href="/contactUs" className="">Want to sponsor us? Get in touch!</a> */}


            </div>



        </div>
    )
}