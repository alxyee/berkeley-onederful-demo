/**
 * Created by alexyee on 4/23/17.
 */
import React from 'react'
import s from './styles.css';

const GiphyFrame = ({embed_url}) => {
  return <iframe
    src={embed_url}
    frameBorder="0"
    className={s.frame}
    allowFullScreen
  >
  </iframe>
}

export default GiphyFrame
