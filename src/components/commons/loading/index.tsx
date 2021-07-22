import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Center>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="greenUnleash.300"
      size="xl"
    />
  </Center>
);

export default Loading;
