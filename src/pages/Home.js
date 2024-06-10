import React from 'react';
import Typography from '@mui/material/Typography';
import BetComponent from '../components/BetComponent';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeBet } from '../redux/features/BetSlice';
import { loadUser,logoutUser } from '../redux/features/AuthSlice';
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [betType, setBetType] = React.useState('');
  const [betAmount, setBetAmount] = React.useState();
  const user = useSelector((state) => state?.Auth?.user);
  const betTypes = ['7 UP', '7', '7 DOWN',]
  const betAmounts = [100, 200, 500,]


  const PlaceBet = () => {
    const data = {
      betType: betType,
      betAmount: betAmount
    }
    dispatch(placeBet(data))
      .then((result) => {
        if (placeBet.fulfilled.match(result , user.id)) {
          dispatch(loadUser())
          console.log(result)
        } else {
          console.log(result.payload);
          if(result.payload.code === 401){
            dispatch(logoutUser())
            navigate('/sign-in')
          }
        }
      });
  };



  React.useEffect(() => {
    console.log("WORKING")
    dispatch(loadUser()).then((result) => {
      if (loadUser.fulfilled.type ) {
        if(result.payload.code === 401){
          dispatch(logoutUser())
          navigate('/')}
      }
    }
    );
  }, [])


  return (
    <div>
      <Header />

      <Typography mt={5} component="h1" variant="h5">
        Place a bet
      </Typography>

      <Grid mt={5} pl={60} pr={60} display={'flex'} justifyContent={'space-around'}>

        <div>

          <BetComponent setBetType={setBetType} heading={"Bet Type"} types={betTypes} variant="contained" />


          <BetComponent setBetAmount={setBetAmount} mt={5} heading={"Bet Amount"} types={betAmounts} variant="contained" />

        </div>


      </Grid>
      <Box mt={5}>
        <Button onClick={PlaceBet} variant='contained'>Place Bet</Button>
      </Box>
    </div>

  );
}

export default Home;