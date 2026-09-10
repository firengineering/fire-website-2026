import { HStack, Link } from "@chakra-ui/react"; // HStack will be used to align elements properly in the footer
import { EmailIcon, PhoneIcon, QuestionIcon } from "@chakra-ui/icons"; // These are the icons used for the footer

//creating a Footer that can be used sitewide by simply adding "<Footer />" to the page
const Footer = () => {
  return (
    <footer className="bg-[#FFA500] text-white p-9">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>© Females+ in RMIT Engineering.</div>
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