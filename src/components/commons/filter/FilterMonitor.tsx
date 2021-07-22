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
    NumberInput,
    NumberInputField,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    useQuery,
    useBreakpointValue,
    Box,
} from '@chakra-ui/react';
import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { MonitorFilter } from '../../../interfaces/MonitorFilter';
import { Range } from 'rc-slider';

interface MonitorFilterProps {
    query: MonitorFilter;
    handleSwitchOnStores: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
    handleMaxScreenSize: (valueAsString: string, valueAsNumber: number) => void;
    handleMinScreenSize: any;
    handleMaxRefreshRate: any;
    handleMinRefreshRate: any;
    handleResponseTime: any;
    handleResolutionType: any;
    handlePanelType: any;
    handleRatios: any;
}

const MonitorFilterComponent: FC<MonitorFilterProps> = (props: MonitorFilterProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const isLargerThanLg = useBreakpointValue({ base: false, lg: true });

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    const onSliderChange = (value: any) => {
        console.log(value);
    };
    return (
        <>
            HOLA2
            <Range
                className={'RAAAA'}
                defaultValue={[20, 30]}
                min={1}
                max={10}
                onChange={onSliderChange}
            ></Range>
            holaaa
            <Stack>
                {!isLargerThanLg && (
                    <IconButton
                        onClick={handleFilterToggle}
                        alignSelf='start'
                        aria-label='Close filter'
                        icon={<ArrowRightIcon />}
                        position='absolute'
                        top='128px'
                        color='black'
                        bgColor='#E1FCC5'
                    />
                )}
                <Slider
                    in={isFilterOpen}
                    direction='left'
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
                    style={{ width: '250px', position: 'absolute', zIndex: 100, top: '120px' }}
                >
                    <VStack
                        padding={3}
                        className='filter'
                        position='absolute'
                        alignSelf='start'
                        w='250px'
                        backgroundColor='white'
                        marginLeft={{ xl: '3em' }}
                        borderColor='greenUnleash.500'
                        borderWidth='2px'
                        borderLeftWidth='0px'
                        roundedRight='lg'
                        alignItems='start'
                    >
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
                        <HStack width='100%' align='center' alignContent='space-between'>
                            <Text fontSize='md'>
                                {' '}
                                <b>Disponible en tiendas</b>{' '}
                            </Text>
                            <Spacer />
                            <Switch
                                colorScheme='greenUnleash'
                                size='md'
                                isChecked={props.query.OnStores}
                                onChange={props.handleSwitchOnStores}
                            />
                        </HStack>
                        <Text>
                            <b>Tamaño</b>
                        </Text>
                        <HStack>
                            <Text>Minimo</Text>
                            <NumberInput
                                size='xs'
                                maxW={16}
                                defaultValue={15}
                                min={10}
                                value={props.query.minSize}
                                onChange={props.handleMinScreenSize}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </HStack>
                        <HStack>
                            <Text>Maximo</Text>
                            <NumberInput
                                size='xs'
                                maxW={16}
                                max={70}
                                value={props.query.maxSize}
                                onChange={props.handleMaxScreenSize}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </HStack>
                        <Text>
                            <b>Frecuencia de Actualización</b>
                        </Text>
                        <HStack>
                            <Text>Minimo</Text>
                            <NumberInput
                                size='xs'
                                maxW={16}
                                defaultValue={15}
                                min={10}
                                onChange={props.handleMinRefreshRate}
                                value={props.query.minRefreshRate}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </HStack>
                        <HStack>
                            <Text>Maximo</Text>
                            <NumberInput
                                size='xs'
                                maxW={16}
                                defaultValue={15}
                                min={10}
                                onChange={props.handleMaxRefreshRate}
                                value={props.query.maxRefreshRate}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </HStack>
                        <Text>
                            <b>Tiempo de Respuesta GA</b>
                        </Text>
                        <Box>
                            <Range defaultValue={[20, 30]} min={1} max={10}></Range>
                        </Box>
                        <Slider
                            aria-label='slider-ex-1'
                            value={props.query.responseTime}
                            onChange={props.handleResponseTime}
                            max={25}
                            min={1}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb
                                fontSize='sm'
                                boxSize='32px'
                                children={props.query.responseTime}
                            />
                        </Slider>
                        <Text>
                            <b>Resolucion</b>
                        </Text>
                        <CheckboxGroup
                            defaultValue={props.query.resolutionType}
                            colorScheme='green'
                            onChange={props.handleResolutionType}
                        >
                            {props.query.valuesResolutionType.map((resolution) => {
                                return (
                                    <Checkbox key={resolution} value={resolution}>
                                        {resolution}
                                    </Checkbox>
                                );
                            })}
                        </CheckboxGroup>
                        <Text>
                            <b>Tipo de Panel</b>
                        </Text>
                        <CheckboxGroup
                            defaultValue={props.query.panelType}
                            colorScheme='green'
                            onChange={props.handlePanelType}
                        >
                            {props.query.valuesPanelType.map((panelType) => {
                                return (
                                    <Checkbox key={panelType} value={panelType}>
                                        {panelType}
                                    </Checkbox>
                                );
                            })}
                        </CheckboxGroup>
                        <Text>
                            <b>Ratio</b>
                        </Text>
                        <CheckboxGroup
                            defaultValue={props.query.ratios}
                            colorScheme='green'
                            onChange={props.handleRatios}
                        >
                            {props.query.valuesRatios.map((ratio) => {
                                return (
                                    <Checkbox key={ratio} value={ratio}>
                                        {ratio}
                                    </Checkbox>
                                );
                            })}
                        </CheckboxGroup>
                    </VStack>
                </Slider>
            </Stack>
        </>
    );
};

export default MonitorFilterComponent;
