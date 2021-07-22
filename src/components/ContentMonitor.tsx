import { ArrowRightIcon, CloseIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Checkbox,
    CheckboxGroup,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Slide,
    Spacer,
    Stack,
    VStack,
    Text,
    useMediaQuery,
    Switch,
    NumberInput,
    NumberInputField,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Monitor } from '../interfaces/Monitor';
import { MonitorFilter } from '../interfaces/MonitorFilter';
import UnleashTable from './commons/data/Table';
import MonitorFilterComponent from './commons/filter/FilterMonitor';
import Loading from './commons/loading';

const elementsPerScroll = 30;

const ContentMonitor = () => {
    const [query, setQuery] = useState<MonitorFilter>({
        search: '',
        OnStores: true,
        maxSize: 40,
        minSize: 10,
        minRefreshRate: 60,
        maxRefreshRate: 60,
        responseTime: 5,
        resolutionType: ['No HD', 'HD', 'FHD', 'QHD', 'UHD', '8K'],
        panelType: ['VA', 'IPS', 'PLS', 'AHVA', 'OLED', 'TN', 'PVA'],
        ratios: [
            '16:10',
            '12:5',
            '256:135',
            '24:9',
            '21:9',
            '5:2',
            '32:9',
            '64:27',
            '5:4',
            '16:5',
            '4:3',
            '16:9',
            '683:240',
        ],
        valuesResolutionType: ['No HD', 'HD', 'FHD', 'QHD', 'UHD', '8K'],
        valuesPanelType: ['VA', 'IPS', 'PLS', 'AHVA', 'OLED', 'TN', 'PVA'],
        valuesRatios: [
            '16:10',
            '12:5',
            '256:135',
            '24:9',
            '21:9',
            '5:2',
            '32:9',
            '64:27',
            '5:4',
            '16:5',
            '4:3',
            '16:9',
            '683:240',
        ],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [monitors, setMonitors] = useState<Monitor[] | []>([]);
    const [queryMonitors, setQueryMonitors] = useState<Monitor[] | []>([]);
    const [showMonitors, setShowMonitors] = useState<Monitor[] | []>([]);
    const [hasMore, setHasMore] = useState(true);

    const filterByQuery = (monitor: Monitor): Boolean => {
        const res: Boolean[] = [];
        res.push((monitor.brand + ' ' + monitor.model).includes(query.search));
        res.push(!query.OnStores || monitor.stores.length > 0);
        res.push(monitor.size <= query.maxSize);
        res.push(query.minSize <= monitor.size);
        res.push(monitor.refresh_rate <= query.maxRefreshRate);
        res.push(monitor.refresh_rate >= query.minRefreshRate);
        res.push(monitor.response_time <= query.responseTime);
        res.push(query.resolutionType.includes(monitor.resolution));
        res.push(query.panelType.includes(monitor.panel_type) || query.panelType.length == 7);
        res.push(query.ratios.includes(monitor.aspect_ratio));

        let checker = (arr: Boolean[]) => arr.every(Boolean);

        return checker(res);
    };

    //--------------    FILTER HANDLERS    ----------------

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _filter = event.target.value.toLowerCase();
        const temp = { ...query };
        temp.search = _filter;
        setQuery(temp);
    };

    const handleSwitchOnStores = () => {
        const temp = { ...query };
        temp.OnStores = !query.OnStores;
        setQuery(temp);
    };

    const handleMaxScreenSize = (_valueAsString: string, valueAsNumber: number) => {
        const temp = { ...query };
        temp.maxSize = valueAsNumber;
        setQuery(temp);
    };
    const handleMinScreenSize = (value: number) => {
        const temp = { ...query };
        temp.minSize = value;
        setQuery(temp);
    };
    const handleMaxRefreshRate = (_valueAsString: string, valueAsNumber: number) => {
        const temp = { ...query };
        temp.maxRefreshRate = valueAsNumber;
        setQuery(temp);
    };
    const handleMinRefreshRate = (value: number) => {
        const temp = { ...query };
        temp.minRefreshRate = value;
        setQuery(temp);
    };
    const handleResponseTime = (value: number) => {
        const temp = { ...query };
        temp.responseTime = value;
        setQuery(temp);
    };
    const handleResolutionType = (value: string[]) => {
        const temp = { ...query };
        temp.resolutionType = value;
        setQuery(temp);
    };
    const handlePanelType = (value: string[]) => {
        const temp = { ...query };
        temp.panelType = value;
        setQuery(temp);
    };
    const handleRatios = (value: string[]) => {
        const temp = { ...query };
        temp.ratios = value;
        setQuery(temp);
    };

    //--------------    FILTER HANDLERS    ----------------

    useEffect(() => {
        console.log(query);
        setHasMore(true);
        const result = monitors.filter(filterByQuery);
        setQueryMonitors(result);
        setShowMonitors(result.slice(0, elementsPerScroll));
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            const monitorsFetch = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API + 'monitor/');
            setMonitors(monitorsFetch.data);
            const result = monitorsFetch.data.filter(filterByQuery);
            setQueryMonitors(result);
            setShowMonitors(result.slice(0, elementsPerScroll));
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const fetchMoreData = () => {
        if (showMonitors.length >= queryMonitors.length) {
            setHasMore(false);
            return;
        }
        if (showMonitors.length + elementsPerScroll > queryMonitors.length) {
            setShowMonitors([...showMonitors, ...queryMonitors.slice(showMonitors.length)]);
        } else {
            setShowMonitors([
                ...showMonitors,
                ...queryMonitors.slice(
                    showMonitors.length,
                    showMonitors.length + elementsPerScroll
                ),
            ]);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <MonitorFilterComponent
                query={query}
                handleSwitchOnStores={handleSwitchOnStores}
                handleMaxScreenSize={handleMaxScreenSize}
                handleMinScreenSize={handleMinScreenSize}
                handleMaxRefreshRate={handleMaxRefreshRate}
                handleMinRefreshRate={handleMinRefreshRate}
                handleResponseTime={handleResponseTime}
                handleResolutionType={handleResolutionType}
                handlePanelType={handlePanelType}
                handleRatios={handleRatios}
            />

            <HStack
                w='100%'
                h='100vh'
                spacing={0}
                display={{ md: 'flex' }}
                justifyContent={{ md: 'center' }}
            >
                <VStack w={['100%', '100%', '70%']} h='100%'>
                    <InputGroup w='80%' m={2}>
                        <Input onChange={handleChangeSearch} />
                        <InputRightElement children={<Search2Icon />} />
                    </InputGroup>
                    {showMonitors.length ? (
                        <div style={{ width: '100%' }}>
                            <InfiniteScroll
                                dataLength={showMonitors.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h1>Loading...</h1>}
                                endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                {
                                    <UnleashTable
                                        data={showMonitors}
                                        headers={['brand', 'model', 'size', 'stores']}
                                    />
                                }
                            </InfiniteScroll>
                        </div>
                    ) : (
                        <h1>no hay resultados</h1>
                    )}
                </VStack>
            </HStack>
        </Box>
    );
};
export default ContentMonitor;
