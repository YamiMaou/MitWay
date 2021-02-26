import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { postResetPassword, postAuth, JWT_Decode } from '../../providers/api'
import {setDialog as authDialog, setAuth} from '../../actions/authAction'
import {setLoading, setSnackbar } from '../../actions/appActions'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';

import logo from '../../../assets/logo.png'

import InputMask from 'react-input-mask';
import { IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { Snackbar } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  dots: {
      width: 16, 
      height: 16, background: 'white', 
      borderRadius:  '50%', 
     // border: '1px solid #ccc',
      margin: 5,
  },
  TextField:{
    [`& fieldset`]: {
      border: "1px solid #132e79",
      borderLeft: "5px solid #132e79",
      borderRadius: 0,
    },
  },
  root: {
    maxWidth: window.innerWidth > 720 ? 350 : '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  media: {
    height: 140,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenInvoiceDialog(props) {
  const [loginError, setLoginerror] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [resetpwd, setResetpwd] = React.useState(false);
  const [dados, setDados] = React.useState({});

  const classes = useStyles();

  const handleClose = () => {
    props.authDialog(false);
  };

  const { aDialog } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  function onChange(e) {
    let dt = dados;
    dt[e.target.id] = e.target.value
    setDados(dt);
  }

  async function onSubmitReset(e) {
    e.preventDefault();
    setloading(true);
    let data = await postResetPassword(dados);
    if(data !== undefined) {
      if(data.data.success){
        setLoginerror(false);
        setloading(false);
        window.location.href="/";
      }else{
        setLoginerror(true)
        setloading(false);
      }
      props.setSnackbar({open: true, message: data.data.message})
    }
  }
  const closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    props.setSnackbar({ open: false, message: "" });
  };
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setloading(true);
    let data = await postAuth(dados);
    if(data !== undefined) {
      if(data.data.success){
        localStorage.setItem("user", JSON.stringify(data.data.data.user));
        localStorage.setItem("token", data.data.token);
        props.setAuth(data.data.data.user);
        setLoginerror(false);
        setloading(false);
        window.location.href="/";
      }else{
        setLoginerror(true)
        setloading(false);
      }
    }
  }
  //
  return (
    <div id="rootLogin" style={{
      flex: 1,
      top: 0,
      display: 'flex',
      flexDirection: 'row',
    }}>
      <Snackbar
          anchorOrigin={{ vertical:'top', horizontal: 'center' }}
          open={props.snackBar.open ?? false}
          autoHideDuration={3000}
          onClose={closeSnack}
          TransitionComponent={TransitionDown}
          message={props.snackBar.message ?? ""}
          key="snb"
        />
      <div style={{
        flexBasis: '42%',
        background: '#132e79',
        height: (window.innerHeight/100*100)
      }}>
      <div style={{ marginRight: 35, marginTop: 65, display: window.innerWidth > 720 ? 'flex' : 'none', justifyContent:'flex-end', flexDirection: 'row'}}>
        <span className={classes.dots} style={{background: '#0065b6' ,width: 64, borderRadius: 30}}></span>
        <span className={classes.dots}></span>
        <span className={classes.dots}></span>
        <span className={classes.dots}></span>
      </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: 25,
      }}>
        {resetpwd ? (
          <form id="loginform" onSubmit={onSubmitReset}>
          <div style={{
            marginBottom: 15
          }}>
            <Typography variant="h4" style={{width: 320}}>
              <b>Recuperação de senha</b>
            </Typography>
            <Typography variant="body1" style={{color: '#ccc', width: 320}}>
              Digite algumas informações básicas sobre você. 
            </Typography>
          </div>
          <div className={classes.root} style={{marginLeft: 15}}>
              <div>
                <div>
                {/*<InputMask id="username" label="Usuário" mask="999.999.999-99" maskChar=" " onChange={onChange}>
                  {(inputProps) =>
                    <TextField
                    error={loginError === true ? true : false}
                    helperText={ loginError ? "Usuário ou senha invalidos." : ""}
                    fullWidth id="username" label="Usuário" variant="outlined" onChange={onChange} />
                  }
                </InputMask> */}
                <TextField
                  className={classes.TextField}
                  error={loginError === true ? true : false}
                  helperText={ loginError ? "Seus dados não correspondem." : ""}
                  type="text"
                  fullWidth id="email" type="text" label="E-Mail" variant="outlined" 
                  onChange={onChange}
                  onBlur={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon color="#cccccc" />
                      </InputAdornment>
                    ),
                  }}
                   />
                </div><br />
                <div>
                <TextField
                  className={classes.TextField}
                  error={loginError === true ? true : false}
                  //helperText={ loginError ? "E-mail ou senha inválidos." : ""}
                  type="text"
                  fullWidth id="cpf_cnpj" type="text" label="CPF/CNPJ" variant="outlined" 
                  onChange={onChange}
                  onBlur={onChange} 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon color="#cccccc" />
                      </InputAdornment>
                    ),
                  }}/>
                </div>
              </div>
            <div style={{
              justifyContent: 'start'
            }}>
              <div style={{marginTop: 15,marginBottom: 15}}>
                <a href="#" onClick={() => {
                  setResetpwd(false);
                }
                }>Login</a>
              </div>
              
              <br /> 
              {!loading ? (
                window.innerWidth > 720 ?  
                  <Button variant="contained" size="large" color="primary" disableElevation type="submit" form="loginform"
                  style={{
                    background: 'linear-gradient(45deg, 132e79 30%, #025ea2 90%)',
                  }}>
                    Recuperar 
                  </Button> : 
                  <IconButton style={{
                    display: 'flex',
                    margin: 'auto',
                    background: '#132e79',
                    color: "white",
                    [`& :hover`]: {
                      backgroundColor: "#132e79",
                    },
                      }} size="large" variant="contained" color="primary" type="submit" form="loginform">
                    <ArrowForwardRoundedIcon />
                  </IconButton>
              ) : (
              <CircularProgress style={{display: 'flex',margin: 'auto'}} />
              )}
              
            </div>
            
          </div>
        </form>
        ) : (
      <form id="loginform" onSubmit={onSubmit}>
        <div style={{
          marginBottom: 15
        }}>
          <Typography variant="h4" style={{width: 320}}>
            <b>Seja bem vindo(a) a nossa plataforma</b>
          </Typography>
          <Typography variant="body1" style={{color: '#ccc', width: 320}}>
            Construction starts as soon asenough bricks are funded<br /> for the smallest piece of work
          </Typography>
        </div>
        <div className={classes.root} style={{marginLeft: 15}}>
        <Paper square style={{width: window.innerWidth > 720 ? 320 : '100%', marginBottom: 10}}>
          <Tabs
            value={value}
            indicatorColor="primary"
            //textColor="primary"
            onChange={handleChange}
            aria-label="Login"
          >
              <Tab style={{width: '50%', background: value == 0 ?'#132e79': '#ccc', color: value == 1 ?'#132e79': 'white'}} label="Empresa" />
              <Tab style={{width: '50%', background: value == 1 ?'#132e79': '#ccc', color: value == 0 ?'#132e79': 'white'}} label="Profissional" />
          </Tabs>
          </Paper>
            <div>
              <div>
              {/*<InputMask id="username" label="Usuário" mask="999.999.999-99" maskChar=" " onChange={onChange}>
                {(inputProps) =>
                  <TextField
                  error={loginError === true ? true : false}
                  helperText={ loginError ? "Usuário ou senha invalidos." : ""}
                  fullWidth id="username" label="Usuário" variant="outlined" onChange={onChange} />
                }
              </InputMask> */}
              <TextField
                className={classes.TextField}
                error={loginError === true ? true : false}
                helperText={ loginError ? "E-mail ou senha inválidos." : ""}
                type="text"
                fullWidth id="email" type="text" label="E-Mail" variant="outlined" 
                onChange={onChange}
                onBlur={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon color="#cccccc" />
                    </InputAdornment>
                  ),
                }}
                 />
              </div><br />
              <div>
              <TextField
                className={classes.TextField}
                error={loginError === true ? true : false}
                //helperText={ loginError ? "E-mail ou senha inválidos." : ""}
                type="text"
                fullWidth id="password" type="password" label="Senha" variant="outlined" 
                onChange={onChange}
                onBlur={onChange} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="#cccccc" />
                    </InputAdornment>
                  ),
                }}/>
              </div>
            </div>
          <div style={{
            justifyContent: 'start'
          }}>
            <div style={{marginTop: 15,marginBottom: 15}}>
              <a href="#" onClick={() => {
                setResetpwd(true);
              }
              }>Esqueceu a senha?</a>
            </div>
            
            <br /> 
            {!loading ? (
              window.innerWidth > 720 ?  
                <Button variant="contained" size="large" color="primary" disableElevation type="submit" form="loginform"
                style={{
                  background: 'linear-gradient(45deg, 132e79 30%, #025ea2 90%)',
                }}>
                  Entrar 
                </Button> : 
                <IconButton style={{
                  display: 'flex',
                  margin: 'auto',
                  background: '#132e79',
                  color: "white",
                  [`& :hover`]: {
                    backgroundColor: "#132e79",
                  },
                    }} size="large" variant="contained" color="primary" type="submit" form="loginform">
                  <ArrowForwardRoundedIcon />
                </IconButton>
            ) : (
            <CircularProgress style={{display: 'flex',margin: 'auto'}} />
            )}
            
          </div>
          
        </div>
      </form>
      )}
      </div>
    </div>
  );
}
const mapStateToProps = store => ({
  aDialog: store.authReducer.authDialog,
  data: store.authReducer.data,
  snackBar: store.appReducer.snackbar,
  loading: store.appReducer.loading
});
const mapDispatchToProps = dispatch =>
bindActionCreators({ setLoading, setSnackbar, authDialog, setAuth,JWT_Decode }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenInvoiceDialog)
