import React from 'react';
import Button from '@material-ui/core/Button';

const GreenButton = (props) => {
  return(
    <Button 
      variant="outlined" 
      style={{backgroundColor: '#FFFFFF', color: '#4caf50'}}
      onClick={props.showMenu}
    >Select Athlete</Button>
  )
}

export default GreenButton;