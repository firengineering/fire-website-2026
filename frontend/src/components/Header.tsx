import React from 'react'
import Image from "next/image";
import Link from 'next/link'
import { Flex, Heading, HStack, Spacer } from '@chakra-ui/react'

interface headerProps {
    active: "home" | "industry" | "contact" | "newsletter" | "photos" | "social";
}


const Header = ({ active } : headerProps) => {

    const getTitle = () : String => {
        switch (active) {
            case "contact":
                return "Contact Us";
            case "home":
                return "Home";
            case "industry":
                return "Industry Events";
            case "newsletter":
                return "Newsletters";
            case "photos":
                return "Photo Gallery";
            case "social":
                return "Social Events";
            default:
                return "FiRE+"
        }
    }

  return (
    <div className="">
        <Flex bg="orange.300">
            <HStack spacing="6">
                <Link href="/" className='inline-block'>
                    <Image src="/logo.png" alt="FiRE+ logo" width={100} height={20} className="inline-block" />
                </Link>
                <Heading size="lg" className='inline-block'>Females+ in RMIT Engineering</Heading>
                
                <Spacer />

                <Link href="/socialEvents" className={"px-5 py-3 " + active == "social" ? "bg-white" : ""}>Social Events</Link>
                <Link href="/industry" className={"px-5 py-3 " + active == "industry" ? "bg-white" : ""}>Industry Events</Link>
                <Link href="/newsletter" className={"px-5 py-3 " + active == "newsletter" ? "bg-white" : ""}>Newsletter</Link>
                <Link href="/photoGallery" className={"px-5 py-3 " + active == "photos" ? "bg-white" : ""}>Photo Gallery</Link>
                <Link href="/contactUs" className={"px-5 py-3 " + active == "contact" ? "bg-white" : ""}>Contact</Link>
            </HStack>
        </Flex>

        <head>
            <title>{getTitle()}</title>
            <link rel="icon" type="png" href="/logo.png" />
        </head>
      
    </div>
  )
}

export default Header
