import { IntlProvider } from "react-intl";
import { EmployeesData } from "./components/Employees/Employees";
import "./styles/App.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App() {
  return (
    <div className="App">
      <IntlProvider locale="en" defaultLocale="en">
        <EmployeesData />
      </IntlProvider>
    </div>
  );
}
