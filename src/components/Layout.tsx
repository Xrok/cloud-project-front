import { ReactNode } from 'react';
import Head from 'next/head';
import { Container, Flex, Heading, HStack, Link, Box, Button } from '@chakra-ui/react';
import { Logo } from './Logo';
import { useRouter } from 'next/dist/client/router';


type Props = {
  children: ReactNode;
  title?: string;
};

export const Layout = ({ children, title }: Props) => {
  const router = useRouter();

  return (
    <Container maxWidth='1200px'>
      <Box spacing={4} display={{ md: 'flex'}} justifyContent={{ md: 'space-between' }} alignItems={{ md: 'center'}} >
        <Box onClick={() => router.push("/")} _hover={{ background: '#F2F2F2', cursor: 'pointer' }} borderRadius='lg' width="200px">
          <HStack>
            <Logo h='2.5rem' pointerEvents='none' mr={4} />
            <Heading fontFamily='Alatsi' size='lg'>
              UNLEASH
              </Heading>
          </HStack>
        </Box>
        {title &&
          <Box>
            <Heading size="lg">
              {title}
            </Heading>
          </Box>}
      </Box>
      
      {children}
      
    </Container>
  );
}
