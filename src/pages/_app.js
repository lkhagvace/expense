import { Record } from "@/context/Visible";
import "@/styles/globals.css";
import { Category } from "@/context/Category";

export default function App({ Component, pageProps }) {
  return (
    <Record>
      <Category>
        <Component {...pageProps} />
      </Category>
    </Record>
  );
}
