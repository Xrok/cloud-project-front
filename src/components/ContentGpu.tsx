import { Search2Icon } from '@chakra-ui/icons';
import { HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ContentGpu = () => {
  const [search, setSearch] = useState('');
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  return (
    <HStack w='100%' h='100%'>
      <VStack w='80%' h='100%'>
        <InputGroup w='80%'>
          <Input onChange={handleChangeSearch}></Input>
          <InputRightElement children={<Search2Icon></Search2Icon>}></InputRightElement>
        </InputGroup>
        <h1>{search}</h1>
      </VStack>
    </HStack>
  );
};
export default ContentGpu;
