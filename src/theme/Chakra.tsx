import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { ReactNode } from "react";
import unleashTheme from ".";

interface ChakraProps {
  cookies?: string;
  children: ReactNode;
}


export const Chakra = ({ children, cookies }: ChakraProps) => {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <ChakraProvider
      colorModeManager={colorModeManager}
      theme={unleashTheme}
    >
      {children}
    </ChakraProvider>
  );
};

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>;

export function getServerSideProps({
  req,
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
