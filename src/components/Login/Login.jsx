import {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Login = () => {
	const [loginData,setLoginData] = useState({})

	const handleSendData = async() => {
		try {
			await axios.post(
				'http://localhost:8080/login', {
					username: loginData.username,
					password: loginData.password,
				}
			)
		}
		catch (err) {
			console.error(err)
		}
	};

	return (
		<Box sx={{ textAlign: "center", margin: "120px" }}>
			<Paper  sx={{padding:'35px'}}>
				<Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
					<Typography paddingBottom="40px" variant="h1">Login</Typography>
				<TextField fullWidth placeholder='Username' value={loginData.username} onChange={(e) => setLoginData({...loginData,username:e.target.value})}/>
				<TextField fullWidth placeholder='Password' type='password' value={loginData.password} onChange={(e) => setLoginData({...loginData,password:e.target.value})}/>
				<Button fullWidth sx={{padding:'8px 0'}} color='warning' onClick={() => handleSendData()} variant='contained'>Sign in</Button>
				</Box>
			</Paper>
		</Box>
	);
};
