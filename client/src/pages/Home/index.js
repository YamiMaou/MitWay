import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//
import Card from '@material-ui/core/Card';
// MAPS LAYOUT
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
//
import { Map, GoogleApiWrapper, Marker, Callout, InfoWindow } from 'google-maps-react';
//
import { DEFAULT_LOCALE_TEXT } from '../../providers/langs/datagrid'

import { setSnackbar } from '../../actions/appActions'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function BasicButtonGroup(props) {
    const classes = useStyles();
    if (props.orientation == undefined || props.orientation == "horizontal") {
        return (
            <div className={classes.root}>
                <ButtonGroup style={{ ...props.style, borderRadius: 40, border: "1px solid rgba(2, 94, 162, 0.5)" }} color="primary" aria-label="outlined primary button group" orientation="horizontal">
                    <Button startIcon={<Icon name="circle" size={18} color="green" />} style={{ borderRadius: "50px 0px 0px 50px", border: "none" }} onClick={() => { props.onClick }}>Inicio da Rota</Button>
                    <Button startIcon={<Icon name="circle" size={18} color="yellow" />} style={{ border: "none" }} onClick={() => { props.onClick }}>Meio da Rota</Button>
                    <Button startIcon={<Icon name="circle" size={18} color="red" />} style={{ border: "none" }} onClick={() => { props.onClick }}>Fim da Rota</Button>
                    <Button startIcon={<Icon name="star" size={18} color="#618bff" />} style={{ border: "none" }} onClick={() => { props.onClick }}>Eventos</Button>
                    <IconButton style={{ backgroundColor: "#025ea2", borderRadius: 100 }} onClick={() => { props.onClick }}><Icon name="arrow-right" size={18} color="#fff" /></IconButton>
                </ButtonGroup>
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="primary button group" orientation="vertical">
                    <Button style={{ ...props.style }} onClick={() => { props.onClick }}>
                        <Icon name="star" size={26} color="#618bff" />
                    </Button>
                    <Button style={{ ...props.style }} onClick={() => { props.onClick }}>
                        <Icon name="circle" size={26} color="red" />
                    </Button>
                    <Button style={{ ...props.style }} onClick={() => { props.onClick }}>
                        <Icon name="circle" size={26} color="yellow" />
                    </Button>
                    <Button style={{ ...props.style }} onClick={() => { props.onClick }}>
                        <Icon name="circle" size={26} color="green" />
                    </Button>



                </ButtonGroup>
            </div>
        );
    }

}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            item: undefined,
            dispkayMarkers: this.displayMarkers,
            stores: [
                { lat: -23.668340, lng: -46.791490, name: 'Adolfo' },
                { lat: -23.671700, lng: -46.773200, name: 'Henrrique' },
                { lat: -23.671700, lng: -46.775800, name: 'Eduardo' },
            ]
        }
    }

    componentDidMount() {
        
    }
    dialogHandler(item) {
        this.props.setDialog(true)
        this.setState({ ...this.state, item });
    }
    displayMarkers = () => {
        let iconMarker = new window.google.maps.MarkerImage(
            "https://icon-library.com/images/gps-marker-icon/gps-marker-icon-7.jpg",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32));
        return this.state.stores.map((store, index) => {
            const infowindow = new google.maps.InfoWindow({
                content: "Motorista " + index,
            });
            return <Marker
                key={index}
                id={index}
                title={`${store.name}`}
                description={`Parado`}
                //icon={iconMarker}
                onClick={this.onMarkerClick}
                calloutAnchor={{
                    x: 2.9,
                    y: 0.8,
                }}
                position={{
                    lat: store.lat,
                    lng: store.lng
                }}
            >
                <InfoWindow>
                    <div>
                        <span>${store.name}</span>
                        <small>{`Motorista`}</small>
                    </div>
                </InfoWindow>
            </Marker>
        })
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

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
        let bounds = new this.props.google.maps.LatLngBounds();
        for (let i = 0; i < this.state.stores.length; i++) {
            bounds.extend(this.state.stores[i]);
        }
        const rows: RowsProp = [
            { 
                id: 1, carga: '025253615-0214', cliente: 'Antunes nunes', contratado: 'Adolfo', active: 1,
                coleta: '11.02.2021 às 10:05', entrega:  '11.02.2021 às 13:23',
                endereco: 'R. Serafim Ponte Grande, JD Amália, São Paulo - SP'
             },
             { 
                id: 2, carga: '025233615-0213', cliente: 'Antunes nunes', contratado: 'Eduardo', active: 1,
                coleta: '11.02.2021 às 10:05', entrega:  '11.02.2021 às 13:23',
                endereco: 'R. Florenza, Villa Fazzeone, São Paulo - SP'
             },
             { 
                id: 3, carga: '025288695-0804', cliente: 'Antunes nunes', contratado: 'Henrrique', active: 1,
                coleta: '11.02.2021 às 10:05', entrega:  '11.02.2021 às 13:23',
                endereco: 'Av. Comendador Santana, Capão Redondo, São Paulo - SP'
             },
          ];
        const columns: ColDef[] = [
            { field: 'carga', headerName: 'Carga', flex: 0.3,},
            { field: 'cliente', headerName: 'Cliente',flex: 0.5 },
            { field: 'contratado', headerName: 'Contratado', flex: 1 },
            {
                field: 'active',
                headerName: 'Situação',
                flex: 0.5,
                valueFormatter: (params: ValueFormatterParams) => {
                    return params.value === 1 ? "Em Andamento" : params.value === 2 ?"Em Atraso" : "Concluído"
                }
            },
            { field: 'coleta', headerName: 'Hora de Coleta', flex: 1 },
            { field: 'entrega', headerName: 'Hora de Entrega', flex: 1 },
            { field: 'endereco', headerName: 'End. de Entrega', flex: 1 },
            {
                field: 'id',
                headerName: ' ',
                flex: 0.5,
                renderCell: (params: ValueFormatterParams) => (
                    <div>
                    <IconButton
                        style={{backgroundColor: '#025ea2', padding:5}}
                        variant="contained"
                        color="#fff"
                        size="small"
                        >
                        <Icon name="comments" size={18} color="#fff" />
                    </IconButton>
                    <IconButton
                        style={{backgroundColor: '#025ea2', marginLeft: 16, width:30, heigth: 30}}
                        variant="contained"
                        color="#fff"
                        size="small"
                        onClick={async ()=> {
                            //this.setState({...this.state, blockDialog: {open: true, id: params.value}})
                        }}
                    >
                        <Icon name="map-marker" size={18} color="#fff" />
                    </IconButton>
                    </div>
                  ),
            },
        ];
        return (
            <Fragment>
                <View style={{ height: 360 }}>
                    <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 15,
                        zIndex: 9999,
                    }}>
                        {window.innerWidth > 720 &&
                            <BasicButtonGroup style={{ backgroundColor: '#fff' }} />
                        }
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 50,
                        left: 15,
                        zIndex: 9999,
                    }}>
                        <BasicButtonGroup orientation={'vertical'} style={{ backgroundColor: '#fff', borderRadius: 5, border: '1px solid #f1f1f1', padding: 10, margin: 5 }} />
                    </div>
                    <Map
                        fullscreenControl={false}
                        mapTypeControl={false}
                        zoomControl={false}
                        streetViewControl={false}
                        google={this.props.google}
                        zoom={15}
                        //bounds={bounds}
                        style={{ height: 350 }}
                        onLayout={() => { this.mark.showCallout(); }}
                        initialCenter={{ lat: -23.67002, lng: -46.782345 }}
                    >
                        {this.displayMarkers()}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <h1>{this.state.selectedPlace.title ?? ""}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </View>
                <View>
                    <Card>
                    <div style={{ height: 350, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns}
                                disableClickEventBubbling
                                disableColumnMenu={true}
                                
                                localeText={DEFAULT_LOCALE_TEXT}
                                
                            />
                        </div>
                    </Card>
                </View>
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
