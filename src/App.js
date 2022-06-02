import './App.css';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './styles/globalStyles';
import Routes from './routes';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
