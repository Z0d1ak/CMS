import React from 'react';
import './employee.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import {notification } from 'antd';
import AddEntity from "../dataEntities/addEntity/addEntity"
import DataEntity from "../dataEntities/dataEntity/dataEntity"
import FilterEntity from "../dataEntities/filterEntity/filterEntity"
import PaginationEntity from "../dataEntities/paginationEntity/paginationEntity"

type getUser = paths["/api/User"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteUser = paths["/api/User/{id}"]["delete"]["parameters"]["path"]
type updateUser = paths["/api/User"]["put"]["requestBody"]["content"]["text/json"]
type addUser = paths["/api/User"]["post"]["requestBody"]["content"]["text/json"]


/**
 * Класс компонента компаний
 */
export class Company extends React.Component<{}, {}> {



    state = {
        dataType: "employee",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/User",
        NameStartsWith: "",
        EmailStartsWith: "",
        FirstNameStartsWith: "",
        LastNameStartsWith: "",

        SortingColumn: "FirstName",
        SortingColumnOptions: ["FirstName", "LastName", "Email"],

        SortDirection: "Ascending",
        SortDirectionOptions: ["Ascending", "Descending"],

        Roles: "All",
        RolesOptions: ["SuperAdmin", "CompanyAdmin", "ChiefRedactor", "Redactor", "Author", "Corrector"],

        QuickSearch: "",
        PageLimit: 10,
        PageNumber: 1,

        SearchBy: "All",

        optionName: ["SearchBy", "Roles"],
        optionList: [["FirstName", "LastName", "Email", "All"], ["SuperAdmin", "CompanyAdmin", "ChiefRedactor", "Redactor", "Author", "Corrector", "All"]],
        text: ["Искать по", "Входит в "],

        count: 0,
        items: [
            {
                id: "",
                email: "",
                firstName: "1",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "2",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "3",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
            {
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                roles: []
            },
        ],
        loading: false
    }




    isNull = (val: string): boolean => {
        return val === "" || val === "All" || val === null;
    }

    changeValue = (val: any, type: string, callback?: () => void) => {
        if (callback !== undefined)
            this.setState({ [type]: val }, callback)
        else this.setState({ [type]: val })
    }

    delete = (val: string) => {
        axios.delete(
            this.state.requestUrl + this.state.requestPath + "/" + val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
            .then(res => {
                this.update();
                notification.success({
                    message: 'Удаление прошло успешно',
                    description:
                        'Сотрудник с id:' + val + " был удален",
                });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для удаления сотрудника"
                        });
                        break;
                    }
                    case 404: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Пользователь с id:" + val + " не найден"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
            })
    }

    create = (val: addUser) => {
        axios.post(this.state.requestUrl + this.state.requestPath, val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {

                this.update();
                notification.success({
                    message: 'Создание прошло успешно',
                    description:
                        'Сотрудник с id:' + val.id + " был успешно создан",
                });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для создания сотрудника"
                        });
                        break;
                    }
                    case 409: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
            })
    }

    updateData = (val: updateUser) => {

        if (!val.password) {
            val.password = null;
        }
        else if (val.password.length < 8) {
            notification.error({
                message: "Пароль слишком короткий",
                description: "Длина пароля должны быть не менее 8 символов."
            });
            return;
        }

        axios.put(this.state.requestUrl + this.state.requestPath, val,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            })
            .then(res => {
                notification.success({
                    message: 'Данные успешно обновлены',
                    description:
                        'Данные сотрудника с id:' + val.id + " были успешно обновлены",
                });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Ошибка авторизации"
                        });
                        break;
                    }
                    case 403: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                "Недостаточно прав для изменения данных сотрудника",
                        });
                        break;
                    }
                    case 404: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                'Сотрудника с id:' + val.id + " не найден",
                        });
                        break;
                    }
                    case 409: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Конфликт данных, убедитесь что данные корректны и не дублируют существующие"
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
            })

    }


    update() {
        this.setState({ loading: true });
        let request: string = "?";
        request += "&PageLimit=" + this.state.PageLimit;
        request += "&PageNumber=" + this.state.PageNumber;
        request += this.isNull(this.state.NameStartsWith) ? "" : "&EmailStartsWith=" + this.state.NameStartsWith;
        request += this.isNull(this.state.NameStartsWith) ? "" : "&LastNameStartsWith=" + this.state.NameStartsWith;
        request += this.isNull(this.state.NameStartsWith) ? "" : "&FirstNameStartsWith=" + this.state.NameStartsWith;
        request += this.isNull(this.state.SortingColumn) ? "" : "&SortingColumn=" + this.state.SortingColumn;
        request += this.isNull(this.state.SortDirection) ? "" : "&SortDirection=" + this.state.SortDirection;
        request += this.isNull(this.state.QuickSearch) ? "" : "&QuickSearch=" + this.state.QuickSearch;
        request += this.isNull(this.state.Roles) ? "" : "&Role=" + this.state.Roles;
        axios.get(
            this.state.requestUrl + this.state.requestPath + request,
            {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("AuthUserSecurityToken")
                }
            }
        )
            .then(res => {

                this.setState({ count: res.data.count })
                this.setState({ items: res.data.items })
                this.setState({ loading: false });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Ошибка авторизации"
                        });
                        break;
                    }
                    case 403: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                "Недостаточно прав для получения данных",
                        });
                        break;
                    }
                    default: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Неопознанная ошибка"
                        });
                        break;
                    }
                }
            })
    }




    setCountItems = (val: number) => {
        this.setState({ count: val })
    }

    onPageChange = (page: number, pageSize?: number | undefined) => {
        if (page === 0) {
            this.setState({ PageNumber: 1 }, () => this.update());
        }
        else {
            this.setState({ PageNumber: page }, () => this.update());
        }
    }

    onMaxItemsChange = (current: number, size: number) => {

        if (current === 0) {
 
            this.setState({ PageLimit: size, PageNumber: 1 }, () => this.update());
        }
        else {
    
            this.setState({ PageLimit: size, PageNumber: current }, () => this.update());
        }

    }


    render() {
        return (
            <div>
                <FilterEntity
                    dataType={this.state.dataType}
                    updateCallback={this.update}
                    changeValueCallback={this.changeValue}
                    SortDirection={this.state.SortDirection}
                    SortDirectionOptions={this.state.SortDirectionOptions}
                    SortingColumn={this.state.SortingColumn}
                    SortingColumnOptions={this.state.SortingColumnOptions}
                    option={[this.state.SearchBy, this.state.Roles]}
                    optionName={this.state.optionName}
                    optionList={this.state.optionList}
                    text={this.state.text}
                />
                <AddEntity
                    createCallback={this.create}
                    dataType={this.state.dataType}
                />
                <DataEntity
                    dataType={this.state.dataType}
                    loading={this.state.loading}
                    updateDataCallback={this.updateData}
                    deleteCallback={this.delete}
                    updateCallback={this.update}
                    changeValueCallback={this.changeValue}
                    items={this.state.items} />
                <PaginationEntity
                    countItems={this.state.count}
                    onPageChange={this.onPageChange}
                    onMaxItemsChange={this.onMaxItemsChange} />
            </div>

        );
    }

    componentDidMount() {
        this.update();
    }

}




export default Company;
