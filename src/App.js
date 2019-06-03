import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/full-table';
import Theme from './components/useTheme';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colVals: [],
      displayed: [
        'IP',
        'directoryblockheight--heights',
        'leaderheight--heights',
        'entryblockheight--heights',
        'entryheight--heights',
        'NetworkNumber--network-info',
        'NetworkName--network-info',
        'NetworkID--network-info',
        'leaderheight--current-minute',
        'directoryblockheight--current-minute',
        'minute--current-minute',
        'currentblockstarttime--current-minute',
        'currentminutestarttime--current-minute',
        'currenttime--current-minute',
        'directoryblockinseconds--current-minute',
        'stalldetected--current-minute',
        'faulttimeout--current-minute',
        'roundtimeout--current-minute'
      ]
    };
    this.Main = this.Main.bind(this);
  }

  Main() {
    const { displayed, colVals } = this.state;
    const { theme, toggleTheme } = Theme();

    return (
      <div style={{
          background: theme === 'dark' ? '#202020' : '#fff',
          color: theme === 'dark' ? '#939598' : '#939598',
          height: '100vh'
        }}
      >
        {theme === 'dark' ? (
          <button type='button' onClick={toggleTheme} style={{ margin: '1em 1em -1em' }}>
            <i className='fas fa-moon' style={{color: 'white', fontSize: '1.5rem'}}></i>
          </button>
        ) : (
          <button type='button' onClick={toggleTheme} style={{ margin: '1em 1em -1em' }}>
            <i class='fas fa-sun' style={{color: '#28495f', fontSize: '1.5rem'}}></i>
          </button>
        )}

        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Information Display</h1>
        </header>
        <div className='row'>
          <Table rowList={colVals} displayed={displayed} />
        </div>
      </div>
    );
  }

  render() {
    return <this.Main />;
  }
}
export default App;
