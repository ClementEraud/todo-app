import * as React from 'react';
import Box from '@mui/material/Box';
import Loader from 'react-loader-spinner';

export const CustomLoader = () => (
	<Box
		sx={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		}}>
		<Loader
			type="BallTriangle"
			color="#00BFFF"
			height={100}
			width={100}
			timeout={3000} //3 secs
		/>
	</Box>
);
