import * as React from "react";
import Weather from "../weather";
import {Route, Switch} from "react-router-dom";
import WeatherLocation from "../weather-location";
import Spinner from "../spinner";
import Error from "../error";

interface IPropState {
  data?: any,
  current?: any,
  url?: string,
  error: boolean,
  loading: boolean,
  searchVisible: boolean
}


class App extends React.Component<any> {

  state: IPropState = {
    data: [],
    current: [],
    url: '',
    error: false,
    loading: false,
    searchVisible: true
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: true
    })
  }

  getLocation = () => {
    const access_key = 'e65fcbdb6b7edea6d370e4fd261bf357';
    fetch(`http://api.weatherstack.com/current?access_key=${access_key}&query=${this.state.url}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.location,
          current: res.current,
          loading: false
        });
      });
    console.log('Страна', this.state.data);
    console.log('Погода', this.state.current)
  };

  onValueChange = (e: { target: { value: any; }; }) => {
    this.setState({
      url: e.target.value
    })
  };

  onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.getLocation();
    this.setState({
      url:'',
      loading: true
    })
  };

  onVisible = (searchVisible) => {
    this.setState(({searchVisible: !searchVisible}))
  };

  render() {

    const {data, current, error, loading, url, searchVisible} = this.state;
    const searchPanel = (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Введите названеи локации"
            onChange={this.onValueChange}
            value={url}
            className="form-control search-btn "/>
          <div className="search"></div>
        </form>
      </div>
    );

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <Error/>
    }

    return (
      <>
        {searchVisible ? searchPanel : null}
        <Switch>
          <Route path='/' exact component={() => <Weather
            data={data}
            onVisible={()=>this.onVisible(searchVisible)}
          />}/>
          <Route path='/city'  component={() => <WeatherLocation
            data={data}
            current={current}
            onVisible={()=>this.onVisible(searchVisible)}
          />}/>
        </Switch>
      </>
    )
  }
}

export default App;
