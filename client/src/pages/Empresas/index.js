import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//
import AppBar from '@material-ui/core/AppBar';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';

//
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//
import Typography from '@material-ui/core/Typography';
import LDataGrid from '../../components/List/datagrid';
//
import { setSnackbar } from '../../actions/appActions'
import { getApiClients, deleteApiDrivers } from '../../providers/api'

import {InputCpf, stringCpf} from '../../providers/masks'
import { IconButton, Toolbar } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { DataGrid, RowsProp, ColDef, CheckCircleIcon } from '@material-ui/data-grid';

function BlockDialog(props) {
    const [open, setOpen] = React.useState(props.open);
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const send = async () => {
        await deleteApiDrivers( props.id);
        props.handle(props.active)
        props.handleClose();
    }
    return (
      <div>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Exclusão de Empresa</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Confirma a exclusão do registro selecionado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              NÃO
            </Button>
            <Button onClick={send} color="primary">
              SIM
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

class Clients extends Component {
    state = {
        clients: [],
        pageRequest: {},
        blockDialog: {open: false, id: undefined,active: 0, handle: undefined},
       
    }
    
    async componentDidMount() {
    }

    render() {
        const rows : RowsProp = this.state.clients.data ?? [];
        const columns: ColDef[] = [
            { field: 'cnpj_cpf', headerName: 'CNPJ', flex: 0.7,
                valueFormatter: (params: ValueFormatterParams) => {
                    return stringCpf(params.value);
                }
            },
            { field: 'fantasy_name', headerName: 'Nome Fantasia',flex: 2 },
            { field: 'company_name', headerName: 'Razão Social', flex: 1 },
            {
                field: 'id',
                headerName: 'Ações',
                flex: 1,
                renderCell: (params: ValueFormatterParams, row: RowIdGetter) => (
                        
                    <div>
                    <Link to={`/empresas/${params.value}`} style={{textDecoration: 'none'}} >
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={async (e)=> {
                            console.log(params)
                            const handle = (status) => {
                                let row = params.row;
                                delete params.row;
                                params.row = row;
                            }
                            this.setState({...this.state, blockDialog: {open: true, id: params.value, handle }})
                        }}
                        style={{ marginLeft: 16 }}
                      >
                        <Delete fontSize="small"/>
                      </Button>
                    </div>
                  ),
            },
        ];
        const flexBasis = '25%';
        const filter = [
            
            { column: 'cnpj_cpf', label: 'CPF/CNPJ', type: 'text', 
            flexBasis },
            { column: 'company_name', label: 'Nome', type: 'text', flexBasis },
            { column: 'fantasy_name', label: 'Nome', type: 'text', flexBasis },
        ]

        return (
            <Fragment>
                <AppBar position="static" style={{ padding: 10, marginTop: 10, marginBottom: 10}}>
                    <Toolbar>
                        <Typography variant="h6" style={{flexGrow: 1}}>
                            <HomeIcon />  <span>Empresas</span>
                        </Typography>
                    </Toolbar>
                    
                </AppBar>
                    <LDataGrid rows={rows} columns={columns} filterInputs={filter} 
                    pageRequest={
                        (params) => {
                            if(params.active !== undefined){
                                params.active = params.active == "Ativo" ? 1: 0;
                            }
                            this.setState({...this.state, pageRequest: params})
                            return getApiClients(params)
                    }} />
                        <BlockDialog 
                            open={this.state.blockDialog.open} 
                            id={this.state.blockDialog.id}
                            handle={this.state.blockDialog.handle}
                            active={this.state.blockDialog.active}
                            handleClose={() => {
                                this.setState({...this.state, blockDialog: { open : false, id: undefined }})
                            }}
                        />
            </Fragment>
        )
    }
}
const mapStateToProps = store => ({
    session: store.authReducer.data,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ setSnackbar, getApiClients}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Clients)
