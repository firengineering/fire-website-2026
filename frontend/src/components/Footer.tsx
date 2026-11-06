import { HStack, Link, VStack } from "@chakra-ui/react"; // HStack will be used to align elements properly in the footer
import { EmailIcon, PhoneIcon, QuestionIcon } from "@chakra-ui/icons"; // These are the icons used for the footer

//creating a Footer that can be used sitewide by simply adding "<Footer />" to the page
const Footer = () => {
  return (
    <footer className="bg-[#EC7D3C] text-white p-9">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <VStack className="w-6/7">
            <div>© Females+ in RMIT Engineering.</div>
            <p><i>FIRE+ acknowledges the people of the Kulin Nations on whose unceded lands
               RMIT University conducts its business. We respectfully acknowledge their Ancestors 
              and Elders, past and present. FIRE+ also acknowledges the Traditional Custodians and
               their Ancestors of the lands and waters across Australia where our committee works.</i></p>
          </VStack>
          
          <HStack
          //adding a HStack to align the elements properly in the footer
          >
          <div className="flex space-x-4">
            <QuestionIcon boxSize = {5} cursor = "pointer"
            //using the QuestionIcon for users to have a visual guide to see where to find help
            />
            <Link href = "/contactUs"><span><u>Contact Us</u></span></Link>
          </div>
          </HStack>
        </div>
      </div>
    </footer>
  );
};

export default Footer;