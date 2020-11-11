import { Container } from "@material-ui/core";
import DataTable from "./components/dataTable";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Titillium Web",
    fontSize: 16,
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container>
          <DataTable />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
