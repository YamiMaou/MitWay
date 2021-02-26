import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { styles } from './style';
import { AddCircleOutlineRounded, AddIcCallOutlined, CardTravelOutlined, LocalShippingOutlined, PowerOffRounded } from '@material-ui/icons';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: 'transparent', 
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    background: '#132e79',
    color: "white",
    [`& :hover`]: {
      backgroundColor: "#132e79",
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#132e79',
    color: 'white'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '#132e79',
    color: 'white'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      { props.auth == null ? (' ') : (
        <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="secoundary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{color: '#333'}}>
            
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"#fff"}} /> : <ChevronLeftIcon style={{color:"#fff"}} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link style={styles.link} to="/" >
          <ListItem button key={"Home"}>
              <ListItemIcon><HomeIcon style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Home"} />
            </ListItem>
          </Link>

          <ListItem button key={"Cadastrar Carga"}>
              <ListItemIcon><AddCircleOutlineRounded style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Cadastrar Carga"} />
          </ListItem>

          <Link style={styles.link} to="/novo" >
          <ListItem button key={"Catastro"}>
              <ListItemIcon><PersonIcon style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Cadastro"} />
            </ListItem>
          </Link>

          <Link style={styles.link} to="/motoristas" >
          <ListItem button key={"Motoristas"}>
              <ListItemIcon><LocalShippingOutlined style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Motoristas"} />
            </ListItem>
          </Link>
          <Link style={styles.link} to="/empresas" >
          <ListItem button key={"Empresas"}>
              <ListItemIcon><CardTravelOutlined style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Empresas"} />
            </ListItem>
          </Link>

          <ListItem button key={"Sair"} onClick={() => {
              //console.log(props.auth)
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              //props.setAuth(undefined);
              //setAnchorEl(null);
              window.location.href="/";
          }}>
              <ListItemIcon><PowerOffRounded style={{color:"#fff"}} /></ListItemIcon>
              <ListItemText style={{color:"#fff"}} primary={"Sair"} />
          </ListItem>
          
        </List>
        { /*<Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List> */}
      </Drawer>
      </div>
      )}
      <main className={classes.content}>
        {(props.component)}
      </main>
    </div>
  );
}