import { IntlProvider } from "react-intl";
import { DropBox } from "./components/DropBox/DropBox";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <IntlProvider locale="en" defaultLocale="en">
        <DropBox />
      </IntlProvider>
    </div>
  );
}
