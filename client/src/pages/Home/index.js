import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
//

import { setSnackbar } from '../../actions/appActions'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        item: undefined,
          stores: [
            { latitude: -26.9853947, longitude: -52.603549, local: "Cordilheira Alta" },
            { latitude: -26.9605363, longitude: -52.5335505, local: "Xaxim" },]
        }
      }

    async componentDidMount() {
    }

    dialogHandler(item) {
        this.props.setDialog(true)
        this.setState({ ...this.state, item });
    }

    render() {
        const authData = JSON.parse(localStorage.getItem("user"));
        const styles = {
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: 10,
            paddingTop: 0
        }
        const classes = {
            root: {
                maxWidth: 345,
              },
              media: {
                height: 140,
              },
        }
        return (
            <Fragment>
              <Card className={classes.root}>
                    <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Bem Vindo <b>{authData.name}</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Você foi Autenticado com sucesso.
                    </Typography>
                    <div style={{width: 550}}>
                    <Map
                        google={this.props.google}
                        zoom={7}
                        initialCenter={{ lat: -27.0922364, lng: -52.6166878 }}
                    >
                    </Map>
                    </div>
                    </CardContent>
                    <CardActionArea>
                    </CardActionArea>
                <CardActions>
                    
                </CardActions>
                </Card>
            </Fragment>
        )
    }
}
const mapStateToProps = store => ({
    session: store.authReducer.data,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ setSnackbar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
    GoogleApiWrapper(
        (props) => ({
          apiKey: 'AIzaSyCm1SEG70f9yrAfpSWN6LYFUg1vOBD0oUQ',
        }
      ))(Home)
)
