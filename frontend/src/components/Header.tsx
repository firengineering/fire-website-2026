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
                return "Industry Connect";
            case "newsletter":
                return "Newsletters";
            case "photos":
                return "Photo Gallery";
            case "social":
                return "Events";
            default:
                return "FiRE+"
        }
    }

  return (
    <div className="">
        <Flex bg="#EC7D3C">
            <HStack spacing="6" className='text-white'>
                <Spacer />
                <Link href="/" className='inline-block'>
                    <Image src="/logo.png" alt="FiRE+ logo" width={100} height={20} className="inline-block" />
                </Link>
                <Link href="/" className='inline-block'>
                    <Heading size="lg" className='inline-block'>Females+ in RMIT Engineering</Heading>
                </Link>
                
                <Spacer />

                <Link href="/events" className={"px-5 py-3 " + active == "social" ? "bg-white" : ""}>Events</Link>
                <Link href="/industry" className={"px-5 py-3 " + active == "industry" ? "bg-white" : ""}>Industry Sponsors</Link>
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
