import React, { FC, useState, ChangeEvent } from 'react';
import {
    Stack,
    IconButton,
    Slide,
    VStack,
    HStack,
    Spacer,
    Switch,
    Text,
    useMediaQuery,
    CheckboxGroup,
    Checkbox,
    useBreakpointValue,
} from '@chakra-ui/react';
import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { ProcessorsFilter } from '../../../interfaces/ProcessorFilter';

interface ProcessorFilterProps {
    query: ProcessorsFilter;
    handleSwitchOnStores: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    onChangeCheckbox: ((value: string[]) => void) | undefined;
}

const ProcessorFilterComponent: FC<ProcessorFilterProps> = ({
    query,
    handleSwitchOnStores,
    onChangeCheckbox,
}: ProcessorFilterProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const isLargerThanLg = useBreakpointValue({ base: false, lg: true });

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <Stack>
            {!isLargerThanLg && (
                <IconButton
                    onClick={handleFilterToggle}
                    aria-label='Close filter'
                    icon={<ArrowRightIcon />}
                    position='absolute'
                    top='128px'
                    color='black'
                    bgColor='#E1FCC5'
                />
            )}

            <Slide
                in={isFilterOpen}
                direction='left'
                className='filter'
                style={{ width: '250px', position: 'absolute', zIndex: 100, top: '120px' }}
            >
                <VStack
                    padding={3}
                    className='filter'
                    position='absolute'
                    alignSelf='start'
                    w='250px'
                    backgroundColor='white'
                    borderColor='greenUnleash.500'
                    borderWidth='2px'
                    borderLeftWidth='0px'
                    roundedRight='lg'
                    alignItems='start'
                >
                    <HStack width='100%' align='center' alignContent='space-between'>
                        <Text fontSize='md'>
                            {' '}
                            <b>Disponible en tiendas</b>{' '}
                        </Text>
                        <Spacer />
                        <Switch
                            colorScheme='greenUnleash'
                            size='md'
                            isChecked={query.OnStores}
                            onChange={handleSwitchOnStores}
                        />
                        <Spacer />
                        {!isLargerThanLg && (
                            <IconButton
                                onClick={handleFilterToggle}
                                alignSelf='flex-end'
                                aria-label='Close filter'
                                color='black'
                                bgColor='#E1FCC5'
                                icon={<CloseIcon />}
                            />
                        )}
                    </HStack>

                    <Text>
                        <b>Marcas</b>
                    </Text>
                    <CheckboxGroup
                        onChange={onChangeCheckbox}
                        colorScheme='green'
                        defaultValue={query.brands}
                    >
                        <VStack paddingLeft={6}>
                            <Checkbox value='amd'>AMD</Checkbox>
                            <Checkbox value='intel'>Intel</Checkbox>
                        </VStack>
                    </CheckboxGroup>
                </VStack>
            </Slide>
        </Stack>
    );
};

export default ProcessorFilterComponent;
