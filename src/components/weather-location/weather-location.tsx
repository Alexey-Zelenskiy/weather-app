import * as React from "react";
import {Link} from "react-router-dom";
import {Map, YMaps} from 'react-yandex-maps';
import {FaMap} from "react-icons/all";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

interface IPropState {
  showMap: boolean,
  width: number
}

export default class WeatherLocation extends React.Component<any, IPropState> {
  
  state: IPropState = {
    showMap: false,
    width: 465
  };

  onShowMap = (showMap) => {
    this.setState(({showMap: !showMap}))
  };

  render() {

    const {showMap, width} = this.state;
    const {data, current, onVisible} = this.props;
    const {name, country, localtime, lat, lon} = data;
    const {temperature, weather_icons, weather_descriptions, wind_speed, pressure} = current;

    return (
      <div>
        <article className="widget">
          <div className="weatherIcon">
            <img className='img' alt='' src={weather_icons}/>
            <div onClick={() => this.onShowMap(showMap)}>
              <FaMap onClick={() => this.onShowMap(showMap)}/>
            </div>
          </div>
          <div className="weatherInfo">
            <div className="temperature"><span>{temperature}&deg;</span></div>
            <div className="description">
              <div className="weatherCondition">{weather_descriptions}</div>
              <div className="place">{name}, {country}</div>
            </div>
          </div>
          <div className="date">{localtime}</div>
        </article>
        <Link to='/'>
          <div className="outer" onClick={onVisible}>
            <div className="inner">
              <label>Назад</label>
              <br/>
            </div>
          </div>
        </Link>
        <Modal isOpen={showMap} toggle={this.onShowMap}>
          <ModalHeader toggle={this.onShowMap}>{name}</ModalHeader>
          <ModalBody>
            <YMaps>
              <div>
                <Map defaultState={{center: [lat, lon], zoom: 12}} width={width}>
                </Map>
              </div>
            </YMaps>
          </ModalBody>
          <ModalFooter>
            <button color="secondary" onClick={() => this.onShowMap(showMap)}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
};
