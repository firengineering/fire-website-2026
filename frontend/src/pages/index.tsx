import Image from "next/image";
import Header from "@/components/Header";
import { HStack, VStack, Box, Heading, Container } from "@chakra-ui/react";


export default function Home() {
  return (
    <div>

      <div className="mb-10">
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
            <Heading as = "h1" fontSize = "75px" color = "white" textAlign = "left">
                FiRE+ <br/> Engineering
            </Heading>
        </Container>


        <HStack className="px-10" gap="10">
          <VStack>

            <h2 className="text-2xl font-bold">Our Vision</h2>

            <p className="text-left">We strive to:</p>


            <div className="grid grid-cols-3 gap-3 justify-center content-center mb-5">
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p style={{ animation: 'none', transition: 'none' }}>
                    Bring women and gender diverse students in engineering and aviation cohorts together and encourage networking across the variety of disciplines.
                  </p>
                </div>
              </div>
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p>
                    Create a strong community of engineering and aviation students, staff, academics, and professionals.
                  </p>
                </div>
              </div>
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p>
                    Educate engineering and aviation students about diversity, inclusivity, and how to support women and gender diverse individuals.
                  </p>
                </div>
              </div>
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p>
                    Help prepare engineering and aviation students to be industry ready through workshops and seminars.
                  </p>
                </div>
              </div>
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p>
                    Organise STEM volunteering opportunities and promote engineering and aviation to young students.
                  </p>
                </div>
              </div>
              <div className="grid-item transition duration-100 hover:scale-105">
                <div>
                  <p>
                    Actively build an inclusive RMIT engineering and aviation community for all minorities and underrepresented groups in STEM (i.e. women and gender diverse people, people of the LGBTQI+ community, people of colour, people living with disabilities).
                  </p>
                </div>
              </div>
            </div>
          </VStack>

        </HStack>
      </div>
        
    </div>
  );
}
