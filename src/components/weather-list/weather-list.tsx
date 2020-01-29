import * as React from "react";
import {Link} from "react-router-dom";

export default class WeatherList extends React.Component<any> {

  render() {

    const {items, onVisible} = this.props;
    const {name} = items;

    return (
      <li>
        <Link to='/city' onClick={onVisible}>
          {...name}
        </Link>
      </li>
    )
  }
};
