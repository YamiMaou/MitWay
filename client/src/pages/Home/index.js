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
            { latitude: -23.668340, longitude: -46.791490, local: "Cordilheira Alta" },
            { latitude: -23.671700, longitude: -46.773200, local: "Xaxim" },]
        }
      }

    async componentDidMount() {
    }

    dialogHandler(item) {
        this.props.setDialog(true)
        this.setState({ ...this.state, item });
    }
    displayMarkers = () => {
        let iconMarker = new window.google.maps.MarkerImage(
            "https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32));
        return this.state.stores.map((store, index) => {
          return <Marker 
                    key={index} 
                    id={index} 
                    //icon={iconMarker}
                    position={{
                        lat: store.latitude,
                        lng: store.longitude
                    }}
                />
        })
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
                        zoom={15}
                        initialCenter={{ lat: -23.663334, lng: -46.766396 }}
                    >
                        {this.displayMarkers()}
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
