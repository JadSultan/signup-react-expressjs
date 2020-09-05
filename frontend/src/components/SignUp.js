import React , {useState}from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SignUpIcon from "./SignUpIcon.png";
import { FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 15,
      padding: 10,
      background: '#ccc',
      width: '40ch',
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = event => setUser(event.target.value)
  const handleEmailChange = event => setEmail(event.target.value)
  const handlePasswordChange = event => setPassword(event.target.value)

  const signUp = event => {
    console.log("Username: " + username +  " Email: " + email + " Pass: " + password)
    event.preventDefault();

    let data = {
      username: username,
      email: email,
      password: password,
    }

    let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json'
      },
    }

    fetch('http://localhost:8080/api/users/', fetchData)
    .then(response => response.json())
    .then(data => {
      if (data.message === "Duplicate"){ 
        alert('Already have an Account') 
        console.log('Already have an Account:', data.message)
      }else{
        console.log('Sucess:', data.message)
        sendMyMail()
      };
    })
    .catch((error) => {
      alert('Error:'+ error);
    });

  }

  const sendMyMail = () => {

    let data = {
      to: email,
      subject: "Thank you for your subscription",
      text: "I would like like to Welcome you " + username +  " to our Platform (Test From REACT)",
    }

    let fetchData = { 
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    fetch('http://localhost:5000/v1/text-mail/', fetchData)
    .then(function() {
    console.log("Email Sent Successfully")
    });
  }

  return (
      <form onSubmit={signUp}>
        <div className={classes.root} noValidate autoComplete="off" align="center">
        <img src={SignUpIcon} height={200} width={250}/><br/>
          <TextField
            required
            name="username"
            label="Username"
            variant="filled"
            onChange={handleUserChange}
          /><br/>

          <TextField 
            required
            name="email"          
            label="Email" 
            type="email"
            variant="filled"
            onChange={handleEmailChange}
          /><br/>

          <TextField
            required
            name="password"          
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={handlePasswordChange}
            inputProps={{ minLength: 8 }}

          /><br/>
          <Button type="submit" variant="contained" color="primary">Sign Up</Button><br/>

        </div>
      </form>
    

  );
}