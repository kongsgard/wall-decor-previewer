import { Flex, Text, Heading } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="60px"
      className="header"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        as="h1"
        fontWeight="700"
        color="white"
        fontFamily="Parisienne"
        textShadow="0 0 10px rgba(0,0,0,0.5)"
      >
        Wall Decor Previewer
      </Heading>
    </Flex>
  );
};
export default Header;
