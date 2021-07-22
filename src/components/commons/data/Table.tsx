import { FC } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { pick } from '../../../utils/sample-data';

interface UnleashTableProps {
    data: Object[];
    headers: string[];
}

//TODO: Add responsive, min width, scroll horizontal

const UnleashTable: FC<UnleashTableProps> = ({ data, headers }: UnleashTableProps) => {
    const redirectToStore = (url: string) => {
        window.open(url, '_blank');
    };

    if (data.length === 0) return <div>No hay resultados</div>;
    else {
        //const headers = Object.keys(data[0]);

        return (
            <Table variant='striped' margin={3}>
                <Thead>
                    <Tr>
                        {headers.map((item, index) => (
                            <Th key={index}>{item}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((object: { [key: string]: any }, index) => {
                        const _obj = pick(object, headers);
                        return (
                            <Tr key={index}>
                                {Object.values(_obj).map((value: any, index) => {
                                    return Array.isArray(value) ? (
                                        <Td minWidth='max-content' key={index}>
                                            {value.length > 0 ? (
                                                <Menu>
                                                    <MenuButton minWidth='max-content'>
                                                        S/. {value[0].price}
                                                        <ChevronDownIcon />
                                                    </MenuButton>
                                                    <MenuList>
                                                        {value.map((val, i) => {
                                                            return (
                                                                <MenuItem
                                                                    key={i}
                                                                    onClick={() => {
                                                                        redirectToStore(
                                                                            val.link_prod
                                                                        );
                                                                    }}
                                                                >
                                                                    S/. {val.price} - {val.name}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </MenuList>
                                                </Menu>
                                            ) : (
                                                <Text>------</Text>
                                            )}
                                        </Td>
                                    ) : (
                                        <Td minWidth='max-content' key={index}>
                                            {value}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        );
    }
};

export default UnleashTable;
