import React from 'react'
import s from './styles.css';

const WatsonTag = ({name, score}) => {
  return (<div className = {s.tag}>
    <h5>{name}</h5>
    <h6>{score}</h6>
  </div>)
}

const WatsonTags = ({images = []}) => {
  const classifiers = images && images.map(i=>{
      return i.classifiers.map(c=>{
        return c.classes.map(tag=>{
          return <WatsonTag name = {tag.class} score = {tag.score}/>
        })
      })
    })
  return <div className = {s.tagContainer}>
    {classifiers}
  </div>
}

export default WatsonTags
