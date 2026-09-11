import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { HStack, VStack } from "@chakra-ui/react";


export default function Home() {
  return (
    <div>
        <Header active="home" />
        <HStack>
          <Image src="/banner-orange-bg.png" width={200} height={400} alt="banner" />
          <VStack maxWidth={500}>

            {/* FIXME: Format this better */}
            
            <h1 className="text-2xl text-bold">Our Vision</h1>
            <p>We want to:</p>
              <ul>
                <li>Bring women and gender diverse students in engineering and aviation cohorts together and encourage networking across the variety of disciplines.</li>
                <li>Create a strong community of engineering and aviation students, staff, academics, and professionals.</li>
                <li>Educate engineering and aviation students about diversity, inclusivity, and how to support women and gender diverse individuals.</li>
                <li>Help prepare engineering and aviation students to be industry ready through workshops and seminars.</li>
                <li>Organise STEM volunteering opportunities and promote engineering and aviation to young students.</li>
                <li>Actively build an inclusive RMIT engineering and aviation community for all minorities and underrepresented groups in STEM (i.e. women and gender diverse people, people of the LGBTQI+ community, people of colour, people living with disabilities).</li>
              </ul>
          </VStack>
        </HStack>
        
    </div>
  );
}
