import { Record } from "@/context/Visible";
import "@/styles/globals.css";
import { User } from "@/context/User";
import { VisibleCategory } from "@/context/VisibleCategory";
import { Token } from "./signin";

export default function App({ Component, pageProps }) {
  return (
    <Token>
      <User>
        <Record>
          <VisibleCategory>
            <Component {...pageProps} />
          </VisibleCategory>
        </Record>
      </User>
    </Token>
  );
}
