import {
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    Box,
    Button,
    StackDivider,
    HStack,
    Spacer,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { Chakra } from '../../theme/Chakra';
import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm';
import { Layout } from '../../components/Layout';
import { Category } from '../../interfaces/Category';
import ContentProcessor from '../../components/ContentProcessor';
import ContentGpu from '../../components/ContentGpu';
import ContentMonitor from '../../components/ContentMonitor';

const AdminPage = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState(Category.processor);
    const [content, setContent] = useState(<ContentProcessor></ContentProcessor>);

    useEffect(() => {
        checkUser();
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem('user');
        setIsAuth(false);
    };

    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuth(true);
        }
        setIsLoading(false);
    };

    const handleChangeCategory = (cat: Category) => {
        setCategory(cat);
        switch (cat) {
            case 'processor':
                setContent(<ContentProcessor></ContentProcessor>);
                return;
            case 'gpu':
                setContent(<ContentGpu></ContentGpu>);
                return;
            case 'monitor':
                setContent(<ContentMonitor></ContentMonitor>);
                return;
        }
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }

    if (!isAuth) {
        return (
            <Chakra>
                <Layout>
                    <LoginForm setIsLoading={setIsLoading} setIsAuth={setIsAuth} />
                </Layout>
            </Chakra>
        );
    }
    return (
        <Chakra>
            <Layout
            // menu={
            //   <>
            //     <Spacer />
            //     <Button alignSelf='end' onClick={handleLogOut}>
            //       Log Out
            //     </Button>
            //   </>
            // }
            >
                <HStack h='80vh'>
                    <VStack
                        spacing={0}
                        width='150px'
                        align='start'
                        h='100%'
                        divider={<StackDivider borderColor='gray.200' />}
                    >
                        {Object.keys(Category).map((key) => {
                            const variant = key == category ? 'solid' : 'ghost';
                            return (
                                <Button
                                    size='lg'
                                    variant={variant}
                                    width='150px'
                                    colorScheme='green'
                                    onClick={() => handleChangeCategory(Category[key as Category])}
                                >
                                    {key}
                                </Button>
                            );
                        })}
                    </VStack>
                    {content}
                </HStack>
            </Layout>
        </Chakra>
    );
};

export default AdminPage;
