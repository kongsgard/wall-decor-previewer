import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import { ModelViewer } from "./ModelViewer";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <Box minHeight="100vh">
      <Header />
      <ModelViewer />
      <Flex width="100%">{props.children}</Flex>{" "}
    </Box>
  );
};
export default Layout;
