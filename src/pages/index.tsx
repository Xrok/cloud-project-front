import { Box, Image, Wrap, WrapItem, Text, theme } from "@chakra-ui/react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { Category } from "../interfaces/Category";
import cpuImg from "../../public/images/cpu1.svg";
import monitorImg from "../../public/images/monitor1.svg";
import gpuImg from "../../public/images/gpu1.svg";


const categories = [
  { name: "Procesadores", img: cpuImg, cat: Category.processor },
  { name: "Monitores", img: monitorImg, cat: Category.monitor },
  { name: "Tarjetas Graficas", img: gpuImg, cat: Category.gpu },
];

const IndexPage = () => (
  <Layout>
      <Wrap justify="center" align="center">
        {categories.map((cat) => {
          return (
            <WrapItem key={cat.name}>
              <Link href={"./" + cat.cat} >
                <Box
                  _hover={{ background: theme.colors.black, cursor: 'pointer' }}
                  bg="greenUnleash.500"
                  borderRadius="lg"
                  borderWidth="1px"
                  w={["120px", "200px"]}
                  margin={3}
                >
                  <Box
                    borderTopRadius="lg"
                    p={3}
                    h={["50px", "80px"]}
                    display="table"
                    w="100%"
                  >
                    <Box display="table-cell" verticalAlign="middle">
                      <Text
                        fontSize={["0.8em", "1.2em"]}
                        color="white"
                        letterSpacing={[1, 2]}
                        fontWeight="300"
                        fontFamily="Alatsi"
                        align="center"
                      >
                        {cat.name}
                      </Text>
                    </Box>
                  </Box>
                  <Image
                    bg="white"
                    p={4}
                    boxSize={["120px", "200px"]}
                    src={cat.img}
                    borderBottomRadius="lg"
                  ></Image>
                </Box>
              </Link>
            </WrapItem>
          );
        })}
      </Wrap>
    </Layout>
);

export default IndexPage;
