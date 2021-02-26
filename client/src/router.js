import React from "react";
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Platform } from "react-native";
import store from '../store'
import { Switch, Router, Route, Link } from "../react-router";

import Sidebar from './components/Layout/Sidebar'
import MiniDrawer from './components/Layout/Sidebar/minidrawer'
//import './index.css';

import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/Login/recovery';

import Drivers from './pages/Motoristas';
import EditDrivers from './pages/Motoristas/edit';

import Clients from './pages/Empresas';
import CreateClients from './pages/Empresas/create/cadastro';
import EditClients from './pages/Empresas/edit';

import LauncherDialog from './components/Loading/LauncherLoading'
import Header from './components/Layout/Header'
import {themeStyle} from './components/Layout/Header/style'
import Footer from './components/Layout/Footer'
import BottonNav from './components/Layout/BottonNav'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Box, Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Redirect } from "react-router-dom";

import { setAuth } from './actions/authAction';
import { setSnackbar } from './actions/appActions';
// Theme
const YamiTheme = createMuiTheme(themeStyle)
  

const AppRouter = (props) => {
  const closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    props.setSnackbar({ open: false, message: "" });
  };
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const authData = JSON.parse(localStorage.getItem("user"));
  const isAuth = authData !== null ? true : false;
  return props.products !== undefined ? (<LauncherDialog />) : (
  <ThemeProvider theme={YamiTheme}>
    <Box>
    <Snackbar
          anchorOrigin={{ vertical:'top', horizontal: 'center' }}
          open={props.snackbar.open}
          autoHideDuration={3000}
          onClose={closeSnack}
          TransitionComponent={TransitionDown}
          message={props.snackbar.message}
          key="snb"
        />

        <Router>
          <Layout>
            <Switch>
              <Route path="/login" exact={true} component={Login} />
              <Route path="/reset/:token" exact={true} component={ResetPassword} />
              <Route path="/" exact={true} render={() => (isAuth ?  <Home /> : <Redirect push to="/login" />)} />
              <Route path="/motoristas" exact={true} render={() => (isAuth ?  <Drivers /> : <Redirect push to="/login" />)} />
              <Route path="/motoristas/:id" exact={true} render={() => (isAuth ?  <EditDrivers /> : <Redirect push to="/login" />)} />
              
              <Route path="/empresas" exact={true} render={() => (isAuth ?  <Clients /> : <Redirect push to="/login" />)} />
              <Route path="/novo" exact={true} render={() => (isAuth ?  <CreateClients /> : <Redirect push to="/login" />)} />
              <Route path="/empresas/:id" exact={true} render={() => (isAuth ?  <EditClients /> : <Redirect push to="/login" />)} />
              <Route path="*">
                <Box>
                  <View> Pagina não encontrada.</View>
                </Box>
              </Route>
            </Switch>
          </Layout>
          { /*window.innerWidth < 767 &&
            <BottonNav />}
          {window.innerWidth >= 767 &&
          <Sidebar /> */}
        </ Router>
        <Footer />
      </Box>
  </ThemeProvider>)
//)};
}

const Layout = (props) => {
  const authData = JSON.parse(localStorage.getItem("user"));
  
  return ( 
  <MiniDrawer auth={authData} component={props.children} />
  )
} 

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
const mapStateToProps = store => ({
  auth: store.authReducer.data,
  snackbar: store.appReducer.snackbar
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setAuth, setSnackbar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
