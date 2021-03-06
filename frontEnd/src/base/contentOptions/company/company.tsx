import React from 'react';
import './company.css';
import 'antd/dist/antd.css';
import { paths } from '../../../swaggerCode/swaggerCode';
import axios from 'axios'
import { notification } from 'antd';
import AddEntity from "../dataEntities/addEntity/addEntity"
import DataEntity from "../dataEntities/dataEntity/dataEntity"
import FilterEntity from "../dataEntities/filterEntity/filterEntity"
import PaginationEntity from "../dataEntities/paginationEntity/paginationEntity"

type getCompanies = paths["/api/Company"]["get"]["responses"]["200"]["content"]["application/json"]
type deleteCompany = paths["/api/Company/{id}"]["delete"]["parameters"]["path"]
type updateCompany = paths["/api/Company"]["put"]["requestBody"]["content"]["text/json"]
type addCompany = paths["/api/Company"]["post"]["requestBody"]["content"]["text/json"]


/**
 * Класс компонента компаний
 */
export class Company extends React.Component<{}, {}> {



    state = {
        dataType: "company",
        requestUrl: "https://hse-cms.herokuapp.com",
        requestPath: "/api/Company",
        NameStartsWith: "",

        SortingColumn: "Name",
        SortingColumnOptions: ["Name"],

        SortDirection: "Ascending",
        SortDirectionOptions: ["Ascending", "Descending"],

        QuickSearch: "",
        PageLimit: 10,
        PageNumber: 1,

        SearchBy: "All",

        optionName: ["SearchBy"],
        optionList: [["Name", "All"]],
        text: ["Искать по"],

        count: 0,
        items: [
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
            {
                id: "",
                name: ""
            },
        ],
        loading: false
    }

    isNull = (val: string): boolean => {
        return val === "";
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
                        'Компания с id:' + val + " была удалена",
                });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для удаления компании"
                        });
                        break;
                    }
                    case 404: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Компания с id:" + val + " не найдена"
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

    create = (val: addCompany) => {
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
                        'Компания с id:' + val.company.id + " была успешно создана",
                });
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: {
                        notification.error({
                            message: 'Ошибка ' + err.response.status,
                            description:
                                "Недостаточно прав для создания компании"
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

    updateData = (val: updateCompany) => {
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
                                "Недостаточно прав для изменения данных компании",
                        });
                        break;
                    }
                    case 404: {
                        notification.error({
                            message: "Ошибка" + err.response.status,
                            description:
                                'Компания с id:' + val.id + " не найдена",
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
        request += this.isNull(this.state.NameStartsWith) ? "" : "&NameStartsWith=" + this.state.NameStartsWith;
        request += this.isNull(this.state.SortingColumn) ? "" : "&SortingColumn=" + this.state.SortingColumn;
        request += this.isNull(this.state.SortDirection) ? "" : "&SortDirection=" + this.state.SortDirection;
        request += this.isNull(this.state.QuickSearch) ? "" : "&QuickSearch=" + this.state.QuickSearch;
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
                    option={[this.state.SearchBy]}
                    optionName={this.state.optionName}
                    optionList={this.state.optionList}
                    text={this.state.text}
                />
                <AddEntity
                    dataType={this.state.dataType}
                    createCallback={this.create}
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
