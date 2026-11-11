import Image from "next/image";
import Header from "@/components/Header";
import { HStack, VStack, Box, Heading, Container, Button } from "@chakra-ui/react";
import { INSTAGRAM_URL, LINKTREE_URL, RUBRIC_SIGNUP_URL } from "@/data/events";
import { Bricolage_Grotesque, DM_Sans, Cedarville_Cursive } from "next/font/google";

const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
});
const bodyFont = DM_Sans({ subsets: ["latin"], display: "swap" });

const cursiveFont = Cedarville_Cursive({ subsets: ["latin"], weight: ["400"], display: "swap" });

const visions = [
  "Bring women and gender diverse students in engineering and aviation cohorts together and encourage networking across the variety of disciplines.",
  "Create a strong community of engineering and aviation students, staff, academics, and professionals.",
  "Educate engineering and aviation students about diversity, inclusivity, and how to support women and gender diverse individuals.",
  "Help prepare engineering and aviation students to be industry ready through workshops and seminars.",
  "Organise STEM volunteering opportunities and promote engineering and aviation to young students.",
  "Actively build an inclusive RMIT engineering and aviation community for all minorities and underrepresented groups in STEM (i.e. women and gender diverse people, people of the LGBTQI+ community, people of colour, people living with disabilities).",
];


export default function Home() {
  return (
    <div>

      <div>
        <Header active="home" />

        {/* <Box className="py-40"
          bgImage={"url('/logo-extended-vision.png')"}
          bgPosition={"25% 50%"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
        >
          {/* <h1 className="text-white text-shadow-md text-shadow-orange-300 text-4xl">Welcome to FiRE+</h1> */}
        {/* </Box> */}


        <Container maxW= "container.2xl" minH = "80vh" bgImage = "/homepage-banner.jpg" bgSize = "cover"
         bgPosition="center" display = "flex" alignItems = "flex-end" justifyContent = "flex-start" pb={8}
        //adding a banner with image to enhance the design of the homepage
        >
            <Heading as = "h1" className={headingFont.className} fontSize = "75px" color = "white" textAlign = "left">
                FiRE+ <br/> Engineering
            </Heading>
        </Container>


        <Box bg="yellow.50" className="px-6 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <Heading as="h2" className={headingFont.className} size="2xl" color="black">
                Our Vision
              </Heading>
              <p className={`${cursiveFont.className} mt-3 text-xl text-orange-600`}>We strive to:</p>
            </div>

            <div className={`${bodyFont.className} grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
              {visions.map((text) => (
                <div
                  key={text}
                  className="flex items-center justify-center rounded-xl border-t-4 border-orange-400 text-center bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="leading-relaxed text-stone-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Box>

        <HStack className="px-10" gap="10" bg="orange.100" justifyContent="flex-start"> 

          <VStack padding="10" alignItems="flex-start">

            <Heading as = "h1" className={headingFont.className} color = "black">
              Explore Our Events
            </Heading>

            <p className={`${bodyFont.className} text-left`}>
              Events are a great way to meet new people, learn new skills, and have fun! We host a variety of events throughout the year, including workshops, seminars, networking events, and social gatherings. Check out our events page to see what's coming up next!
            </p>

            <Button colorScheme="orange" size="lg" mt={4} onClick={() => window.location.href = '/events'}>
              Explore Events
            </Button>

          </VStack>

          <Image src= "/event-photo.jpeg" alt= "Event Photo" width={500} height={300} className="rounded-lg shadow-lg mt-4 mb-4">
            </Image>

        </HStack>

        <HStack className="px-10" gap="10" bg="black" justifyContent="space-between" alignItems="center" spacing={4} padding ="10" height="400px"> 
          <Button colorScheme="orange" size="lg" mt={4} ml={10}>
            <a href={RUBRIC_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Join Now
            </a>
          </Button>

          <VStack alignItems="flex-end" spacing={4} mr={10} maxW="2xl">
            <Heading as = "h1" className={headingFont.className} color = "orange.600" textAlign="right" fontSize = "60px">
              Join FiRE+ Engineering!
            </Heading>

            <p style={{ color: "white", textAlign: "right" }} className={bodyFont.className}>
              Join FiRE+ Engineering today to be part of a supportive community that empowers women and gender diverse students in engineering and aviation. By joining, you'll gain access to exclusive events, networking opportunities, and resources to help you succeed in your academic and professional journey.
            </p>
          </VStack>

        </HStack>

      </div>
        
    </div>
  );
}
