/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import s from './styles.css';
import {title, html} from './index.md';
import axios from 'axios';

import history from '../history';


/*----------------------------------------------------------------
 IMPORTED COMPONENTS
 ---------------------------------------------------------------*/


/*----------------------------------------------------------------
 ONEDERFUL CALL
 ---------------------------------------------------------------*/
//This function doesn't change
//It makes a RESTful call to onederful and returns a promise
/*-------------------------------------------------*/
function callOnederful(query) {
  const ONEDERFUL_API = 'https://api.onederful.co/graphql';
  const OPEN_BETA_KEY = 'DsvIiZ1oBO9OwjU0Kn1sAukaVNwpRjT29zWV6T53';
  const axiosInstance = axios.create({headers: {'x-api-key': OPEN_BETA_KEY}});
  return axiosInstance.post(ONEDERFUL_API, {query})
}
/*-------------------------------------------------*/


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    document.title = title;
  }

  goToExample(){
    history.push('/example')
  }

  goToSneakPeakDemo(){
    history.push('/demo')
  }

  render() {
    return (
      <div className={s.container}>
        <div dangerouslySetInnerHTML={{__html: html}}/>
        <button onClick = {()=>{this.goToExample()}}>Check Out Yelp Example</button>
        <button onClick = {()=>{this.goToSneakPeakDemo()}}>Check Out Demo</button>
      </div>
    );
  }

}

export default HomePage;
