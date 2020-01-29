import * as React from "react";
import WeatherList from "../weather-list";

export default class Weather extends React.Component<any> {

  render() {

    const {data, onVisible} = this.props;

    return (
      <>
        <div className="item-list">
          <div className="container">
            <div className="items">
              <div className="items-body">
                <div className="items-body-content">
                <span>
                  <WeatherList
                    items={data}
                    onVisible={onVisible}
                  />
                </span>
                  <i className="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

