import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import { Toaster } from "react-hot-toast";
import { PageWrapper } from "@/components/Styling/Home.styled";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Toaster
        toastOptions={{
          success: {
            duration: 5000,
            iconTheme: {
              primary: "var(--tile)",
              secondary: "var(--off-white)", // Hintergrund des Icons
            },
            style: {
              background: "var(--off-white)",
              borderRadius: "var(--brick-border-radius) 0.2rem 0.2rem 0.2rem",
              border: "solid 2px var(--cell-triple-letter)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--error)",
              secondary: "var(--off-white)",
            },
            style: {
              background: "var(--off-white)",
              borderRadius: "var(--brick-border-radius) 0.2rem 0.2rem 0.2rem",
              border: "solid 2px var(--cell-triple-word)",
            },
          },
        }}
      />
      <SWRConfig value={{ fetcher }}>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </SWRConfig>
    </>
  );
}
