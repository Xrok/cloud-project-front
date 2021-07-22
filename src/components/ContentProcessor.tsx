import { useEffect, useState } from 'react';
import Loading from './commons/loading';
import { HStack, Input, InputGroup, InputRightElement, Spacer, VStack, Box } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UnleashTable from './commons/data/Table';
import { Processor } from '../interfaces/Processor';
import { ProcessorsFilter } from '../interfaces/ProcessorFilter';
import ProcessorFilterComponent from './commons/filter/Filter';

const elementsPerScroll = 30;

const ContentProcessor = () => {
    const [query, setQuery] = useState<ProcessorsFilter>({
        search: '',
        OnStores: true,
        brands: ['intel', 'amd'],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [processors, setProcessors] = useState<Processor[] | []>([]);
    const [queryProcessors, setQueryProcessors] = useState<Processor[] | []>([]);
    const [showProcessors, setShowProcessors] = useState<Processor[] | []>([]);
    const [hasMore, setHasMore] = useState(true);
    // const [isFilterOpen, setIsFilterOpen] = useState(true);
    // const [isLargerThan500] = useMediaQuery('(min-width: 48em)');

    // const handleFilterToggle = () => {
    //   setIsFilterOpen(!isFilterOpen);
    // };

    const filterByQuery = (processor: Processor) => {
        const cond1 = (processor.brand + ' ' + processor.model).includes(query.search);
        const cond2 = !query.OnStores || processor.stores.length > 0;
        const cond3 = query.brands.includes(processor.brand);

        const res = cond1 && cond2 && cond3;

        return res;
    };

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

    useEffect(() => {
        setHasMore(true);
        const result = processors.filter(filterByQuery);
        setQueryProcessors(result);
        setShowProcessors(result.slice(0, elementsPerScroll));
    }, [query]);

    useEffect(() => {
        const fetchData = async () => {
            const processorsFetch = await axios.get(
                process.env.NEXT_PUBLIC_BACKEND_API + 'processor/'
            );
            setProcessors(processorsFetch.data);
            const result = processorsFetch.data.filter(filterByQuery);
            setQueryProcessors(result);
            setShowProcessors(result.slice(0, elementsPerScroll));
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const fetchMoreData = () => {
        if (showProcessors.length >= queryProcessors.length) {
            setHasMore(false);
            return;
        }
        if (showProcessors.length + elementsPerScroll > queryProcessors.length) {
            setShowProcessors([...showProcessors, ...queryProcessors.slice(showProcessors.length)]);
        } else {
            setShowProcessors([
                ...showProcessors,
                ...queryProcessors.slice(
                    showProcessors.length,
                    showProcessors.length + elementsPerScroll
                ),
            ]);
        }
    };

    const onChangeCheckbox = (value: string[]) => {
        const temp = { ...query };
        temp.brands = value;
        setQuery(temp);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
        <ProcessorFilterComponent
                query={query}
                handleSwitchOnStores={handleSwitchOnStores}
                onChangeCheckbox={onChangeCheckbox}
            />
        <HStack w='100%' h='100vh' display={{md: 'flex'}} justifyContent={{md: 'center'}}>
            <VStack w={['100%', '100%', '70%']} h='100%'>
                <InputGroup w='80%' alignSelf='flex-end' m={2}>
                    <Input onChange={handleChangeSearch} />
                    <InputRightElement children={<Search2Icon />} />
                </InputGroup>
                {showProcessors.length ? (
                    <InfiniteScroll
                        dataLength={showProcessors.length}
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
                                data={showProcessors}
                                headers={['brand', 'model', 'cores', 'stores']}
                            />
                        }
                    </InfiniteScroll>
                ) : (
                    <h1>no hay resultados</h1>
                )}
            </VStack>
        </HStack>
        </Box>
    );
};
export default ContentProcessor;
