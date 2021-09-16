import React from 'react';
import Button from '@material-ui/core/Button';

const RedButton = (props) => {
  return(
    <Button 
      variant="outlined" 
      style={{backgroundColor: '#FFFFFF', color: '#f44336'}}
      onClick={props.showMenu}
    >Select Athlete</Button>
  )
}

export default RedButton;