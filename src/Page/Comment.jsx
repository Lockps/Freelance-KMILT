import React, { useEffect } from 'react'
import './Comment.css'

const Comment = ({comments}) => {
    
    useEffect(()=>{
        console.log(comments[0]);
        
    })
    
  return (
    <div className='Comment-Container'>{}</div>
  )
}

export default Comment