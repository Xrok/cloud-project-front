import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Center,
  VStack,
  Box,
  Button,
  IconButton,
  Heading,
  FormControl,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/v1/';

const userLogin = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(API_URL + 'auth/login/', credentials);
  if (response.status === 200) {
    localStorage.setItem('user', JSON.stringify(response.data));
  } else {
    throw response.data.message;
  }
};

const LoginForm = (props: { setIsAuth: Function; setIsLoading: Function }) => {
  const setIsAuth = props.setIsAuth;
  const setIsLoading = props.setIsLoading;
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    // alert(`Email: ${username} & Password: ${password}`);
    setIsLoading(true);
    try {
      const response = await userLogin({ email, password });
      console.log(response);
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      // setError('Invalid username or password');
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
  };
  const handleClick = () => setShow(!show);

  return (
    <Center h='60vh'>
      <Box
        bgGradient='linear(to-l, #9ACE68 ,#7DBE3B)'
        borderRadius='lg'
        p={8}
        width={['80%', '60%', '40%', '30%', '20%']}
      >
        <VStack spacing={6}>
          <Heading color='white' fontFamily='Alatsi'>
            Admin Panel
          </Heading>
          <FormControl>
            {/* <FormLabel>Username</FormLabel> */}
            <InputGroup bg='white' borderRadius='lg'>
              <InputLeftElement pointerEvents='none' children={<EmailIcon color='gray.300' />} />
              <Input
                fontFamily='Alatsi'
                variant='outline'
                placeholder='Username'
                focusBorderColor='#4F4F4F'
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            {/* <FormLabel>Password</FormLabel> */}
            <InputGroup bg='white' borderRadius='lg'>
              <InputLeftElement pointerEvents='none' children={<LockIcon color='gray.300' />} />
              <Input
                fontFamily='Alatsi'
                variant='outline'
                placeholder='Password'
                focusBorderColor='#4F4F4F'
                type={show ? 'text' : 'password'}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <InputRightElement width='4.5rem'>
                <IconButton
                  bg='white'
                  h='1.75em'
                  aria-label='show password'
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handleClick}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            // fontFamily='Alatsi'
            variant='solid'
            type='submit'
            onClick={handleSubmit}
            onSubmit={handleSubmit}
          >
            LogIn
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginForm;
