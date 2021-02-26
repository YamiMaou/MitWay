import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import LForms from '../../../components/Forms';
//
import { setSnackbar } from '../../../actions/appActions'
import { putApiClients, getAddressByCepla, getApiClients } from '../../../providers/api'
import { validaEmail, validaCpf, stringToaddDate, isFutureData, validaCNPJ } from '../../../providers/commonMethods'

import { InputCep, InputCpf, InputPhone } from '../../../providers/masks'
import { Redirect } from 'react-router-dom';
import { withSnackbar  } from 'notistack';
class EditClients extends Component {
    state = {
        client: undefined,
        loading: false
    }
    async componentDidMount() {
        let client = await getApiClients({}, this.props.match.params.id);
        this.setState({ ...this.state, client });

    }

    render() {
        const closeSnack = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.props.setSnackbar({ open: false, message: "" });
        };
        const request = async (state, data) => {
            this.setState({ ...this.state, loading: true });
            this.props.setSnackbar({ open: true, message: "Validando Dados, Aguarde ...", });
            data = Object.assign({},state.addresses,data);
            data = Object.assign({},state.contacts,data);
            data = Object.assign({},state,data);
            delete data.addresses;
            delete data.contacts;
            let response = await putApiClients(this.props.match.params.id, data);
            if (response.data.success) {
                this.props.setSnackbar({ open: true, message: response.data.message });
                this.setState({ ...this.state, loading: false });
                this.props.history.goBack();
            } else {
                let errors = response.data ?? undefined;
                let messages = '';
                console.log(errors)
                if(errors !== undefined && errors.data !== undefined && errors.data.response !== undefined  && errors.data.response.data.errors !== undefined){
                    Object.keys(errors.response.data.errors).map(err => {
                        console.log(err);
                        let field = err == "file" ? "Anexo" : err
                        messages += `O campo ${field.toUpperCase()} ${errors.response.data.errors[err][0]} \n`;
                    })
                } else{
                    messages = 'Houve um problema em sua requisição!'
                }
                this.setState({ ...this.state, loading: false });
                this.props.setSnackbar({ open: true, messages});
            }

        }
        const validateFields = (fields, values) => {
            let campo = undefined;
            fields.reverse().map((v, k) => {
                v.fields.reverse().map((v1, k1) => {
                    if (values[v1.column] !== undefined) {
                        let value = values[v1.column];
                        if (v1.validate !== undefined) {
                            if (v1.validate.number !== undefined) {
                                if (/^[-]?\d+$/.test(value) == false)
                                    campo = { id: v1.column, message: `O Campo ${v1.label} é somente números ` }
                            }

                            if (v1.validate.max !== undefined) {
                                if (value.length > v1.validate.max)
                                    campo = { id: v1.column, message: `O Campo ${v1.label}, tamanho máximo de ${v1.validate.max} caracteres exêdido` };
                            }

                            if (v1.validate.min !== undefined) {
                                if (value.length < v1.validate.min)
                                    campo = { id: v1.column, message: `O Campo ${v1.label}, tamanho minimo de ${v1.validate.min} caracteres.` };
                            }

                            if (v1.validate.required !== undefined) {
                                if (value.length == 0)
                                    campo = { id: v1.column, message: `O Campo ${v1.label} é obrigatório` };
                            }
                        }
                        if(value == "Selecione"){
                            campo = {id: v1.column, message: `O Campo ${v1.label} é inválido ` }
                        }

                        if (v1.validateHandler !== undefined) {
                            if (v1.validateHandler(value) == false)
                                campo = { id: v1.column, message: `O Campo ${v1.label} não possui é inválido ` }
                        }
                    }
                })
            })
            campo !== undefined ? this.props.setSnackbar({ open: true, message: campo.message}) : '';

            return campo === undefined ? true : false
        }
        const flexBasis = '22%';
        const forms = !this.state.client ? [] : [
            {
                title: 'Dados Básicos',
                fields: [
                    { column: 'cnpj_cpf', label: 'CPF/CNPJ', value: this.state.client['cnpj_cpf'], type: 'text', mask: "cpf_cnpj", validate: {min: 11, number: true, required: true},validateHandler: validaCNPJ, flexBasis: '12%', helperText: "o valor digitado é inválido" },
                    { column: 'company_name', label: 'Razão Social', type: 'text', validate: {max: 50, required: true}, value: this.state.client['company_name'], flexBasis },
                    { column: 'fantasy_name', label: 'Nome Fantasia', type: 'text', validate: {max: 50, required: true}, value: this.state.client['fantasy_name'], flexBasis },
                    { column: 'email', label: 'E-mail', type: 'email', validate: { max: 100 }, validateHandler: validaEmail, value: this.state.client['email'], flexBasis},
                    { column: 'phone', label: 'Telefone', type: 'text', mask: "(99)9 9999-9999", validate: { max: 15, required: true }, value: this.state.client['phone'], flexBasis},
                    { column: 'mob_phone', label: 'Celular', type: 'text', mask: "(99)9 9999-9999", validate: { max: 15, required: true }, value: this.state.client['mob_phone'], flexBasis},
                    { column: 'file_cnh', label: 'Anexar CNH', file: this.state.client['file_cnh'] ? this.state.client['files_cnh'].name : '', type: 'file', flexBasis:'15%', style:{maxWidth: '180'} },
                ]
            },
            {
                id: 'addr',
                title: 'Endereço',
                fields: [
                    { column: 'zipcode', label: 'CEP', type: 'text', mask: "99999-999", validate: { max: 9, required: true }, flexBasis: '9%', value: this.state.client['addresses'].zipcode },
                    { column: 'street', label: 'Endereço', validate: { max: 100, required: true }, type: 'text', flexBasis, value: this.state.client['addresses'].street },
                    { column: 'number', label: 'Número', type: 'number', validate: { number: true, required: true }, value: this.state.client['addresses'].number, flexBasis: '9%'},
                    { column: 'additional', label: 'Complemento', type: 'text', flexBasis:'10%', value: this.state.client['addresses'].additional },
                    {
                        column: 'uf', label: 'Estado', type: 'select',
                        values: ["Acre", "Alagoas", "Amazonas", "Amapá", "Bahia", "Ceará", "Brasília", "Espírito Santo", "Goiás", "Maranhão", "Minas Gerais", "Mato Grosso do Sul", "Mato Grosso", "Pará", "Paraíba", "Pernambuco", "Piauí", "Paraná", "Rio de Janeiro", "Rio Grande do Norte", "Rondônia", "Roraima", "Rio Grande do Sul", "Santa Catarina", "Sergipe", "São Paulo", "Tocantins"],
                        value:this.state.client['addresses'].uf, flexBasis, flexGrow: 2, style: { minWidth: "192px" }
                    },
                    { column: 'city', label: 'Cidade', type: 'text', validate: { max: 100, required: true }, flexBasis, value:this.state.client['addresses'].city },
                ]
            },
        ]

        return (
            <Fragment>
                <AppBar position="static" style={{ padding: 10, marginTop: 10, marginBottom: 10 }}>
                    <Typography variant="h6">
                        <HomeIcon />  <span>Editar / Empresa</span>
                    </Typography>
                </AppBar>
                {
                    <LForms forms={forms}
                        request={(data) => {request(this.state.client,data)}}
                        validate={(values) => { return validateFields(forms, values) }}
                        loading={this.state.loading}
                    />
                }
                { this.state.client === "maou" &&
                    <Paper style={{ marginTop: 10, marginBottom: 10, padding: 15, height: window.innerWidth < 768 ? 210 : 90 }}>
                        <div style={{ float: 'left', maxWidth: 350 }}>
                            <Typography variant="subtitle1" style={{ padding: 10 }}>
                                Data de cadastro:  <b>{stringToaddDate(this.state.client.created_at, 'DD/MM/YYYY', { qtd: 1, period: 'days' })}</b>&nbsp;
                            </Typography>
                            <Typography variant="subtitle1" style={{ padding: 10 }}>
                                Última alteração:  <b>{stringToaddDate(this.state.client.updated_at, 'DD/MM/YYYY', { qtd: 1, period: 'days' })}</b>
                            </Typography>
                        </div>
                        <div style={{ float: 'left', maxWidth: 350 }}>
                            <Typography variant="subtitle1" style={{ padding: 10 }}>
                                Id:  <b>{this.state.client.id}</b>
                            </Typography>
                            <Typography variant="subtitle1" style={{ padding: 10 }}>
                                Usuário:  <b>{this.state.client.user.name}</b>
                            </Typography>
                        </div>
                    </Paper>
                }
            </Fragment>
        )
    }
}
const mapStateToProps = store => ({
    session: store.authReducer.data,
    snackbar: store.appReducer.snackbar
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ setSnackbar }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditClients))
