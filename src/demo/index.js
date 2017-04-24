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


/*----------------------------------------------------------------
 IMPORTED COMPONENTS
 ---------------------------------------------------------------*/
import GiphyFrame from '../../components/onederful-ui/giphy/giphy-frame'
import WatsonVisualRecognition from '../../components/onederful-ui/watson-visual-recognition/watson-tags'

/*-------------------------------------------------
 This function doesn't change
 It makes a RESTful call to onederful and returns a promise
 -------------------------------------------------*/
function callOnederful(query) {
  const ONEDERFUL_API = 'https://api.onederful.co/graphql';
  const OPEN_BETA_KEY = 'DsvIiZ1oBO9OwjU0Kn1sAukaVNwpRjT29zWV6T53';
  const axiosInstance = axios.create({headers: {'x-api-key': OPEN_BETA_KEY}});
  return axiosInstance.post(ONEDERFUL_API, {query})
}


class ExamplePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      q: 'bears',
      limit: 3,
      giphyList: []
    }
  }

  componentDidMount() {
    document.title = title;
  }

  getGiphyWatson() {
    const {q, limit} = this.state;
    const query =
      `
query GIPHY {
  giphy_search_api
  #This is where you change inputs
  (
    q: "${q}",
    limit: "${limit}"
  )
  #Below is the exact json shape of the response
  {
    data {
      embed_url
      rating
      bitly_url
      bitly_gif_url
      images {
        downsized_still {
          url
        }
        stillImage {
          url
        }
      }
      watsonVisualRecognition {
        images {
          classifiers {
            classes {
              class
              score
            }
          }
        }
      }
    }
  }
}
`;

    /*-------------------------------------------------
     Example Call:
     -------------------------------------------------*/
    callOnederful(query)
      .then(({data})=> {
        console.log(data)
        this.setState({giphyList: data.data.giphy_search_api.data})
      })
      .catch(e=>console.log('handle error', e))

  }


  render() {
    return (
      <div className={s.container}>
        <input value={this.state.q} onChange={(e)=>{this.setState({q:e.target.value})}}/>
        <button onClick={()=>{this.getGiphyWatson()}}>Get Giphy's that have watson in it</button>
        {this.state.giphyList.map(giphy=> {
          return (
            <div className = {s.content}>
              <GiphyFrame {...giphy}/>
              <WatsonVisualRecognition {...giphy.watsonVisualRecognition}/>
            </div>
          )
        })}


      </div>
    );
  }

}

export default ExamplePage;
