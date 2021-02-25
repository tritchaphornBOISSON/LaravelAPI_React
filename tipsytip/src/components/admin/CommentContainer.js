import React from 'react';

const CommentContainer = ({children,title}) => {
    return(
        <div className="container">
    <div class="card">  
  <div class="card-header">
    {title}
  </div>
  <div class="card-body">
  {children} 
  </div>
</div>        
</div>
    );
}   
export default CommentContainer