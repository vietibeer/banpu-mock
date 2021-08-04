import React, { PureComponent } from 'react'
import { history } from 'umi'
import { connect } from 'umi'
import { Card, Checkbox } from 'antd'
import { t } from '@lingui/macro'
import { Page } from 'components'
import { stringify } from 'qs'
import List from '../user/components/List'
import FilterSearchPanel from '../user/components/FilterSearchPanel'
import styles from './index.less'
import { mock_task } from './mockData'
import { filter, pickBy } from "lodash";
import moment from 'moment'
@connect(({ user, loading }) => ({ user, loading }))
class Task extends PureComponent {
    constructor() {
        super()
        this.state = {
            data: mock_task
        };
    }

    handleRefresh = (newQuery) => {
        const { location } = this.props
        const { query, pathname } = location

        history.push({
            pathname,
            search: stringify(
                {
                    ...query,
                    ...newQuery,
                },
                { arrayFormat: 'repeat' }
            ),
        })
    }

    handleDeleteItems = () => {
        const { dispatch, user } = this.props
        const { list, pagination, selectedRowKeys } = user

        dispatch({
            type: 'user/multiDelete',
            payload: {
                ids: selectedRowKeys,
            },
        }).then(() => {
            this.handleRefresh({
                page:
                    list.length === selectedRowKeys.length && pagination.current > 1
                        ? pagination.current - 1
                        : pagination.current,
            })
        })
    }

    get modalProps() {
        const { dispatch, user, loading } = this.props
        const { currentItem, modalVisible, modalType } = user

        return {
            item: modalType === 'create' ? {} : currentItem,
            visible: modalVisible,
            destroyOnClose: true,
            maskClosable: false,
            confirmLoading: loading.effects[`user/${modalType}`],
            title: `${modalType === 'create' ? t`Create User` : t`Update User`}`,
            centered: true,
            onOk: (data) => {
                dispatch({
                    type: `user/${modalType}`,
                    payload: data,
                }).then(() => {
                    this.handleRefresh()
                })
            },
            onCancel() {
                dispatch({
                    type: 'user/hideModal',
                })
            },
        }
    }

    get listProps() {
        const { dispatch, user, loading } = this.props
        const { list, pagination, selectedRowKeys } = user
        return {
            dataSource: this.state.data,
            loading: loading.effects['user/query'],
            pagination,
            // title: (title) => <h4 style={{ marginLeft: 5 }}>Documents list</h4>,
            onChange: (page) => {
                this.handleRefresh({
                    page: page.current,
                    pageSize: page.pageSize,
                })
            },
            onDeleteItem: (id) => {
                dispatch({
                    type: 'user/delete',
                    payload: id,
                }).then(() => {
                    this.handleRefresh({
                        page:
                            list.length === 1 && pagination.current > 1
                                ? pagination.current - 1
                                : pagination.current,
                    })
                })
            },
            onEditItem(item) {
                dispatch({
                    type: 'user/showModal',
                    payload: {
                        modalType: 'update',
                        currentItem: item,
                    },
                })
            },
            rowSelection: {
                selectedRowKeys,
                onChange: (keys) => {
                    dispatch({
                        type: 'user/updateState',
                        payload: {
                            selectedRowKeys: keys,
                        },
                    })
                },
                columnTitle: () => <Checkbox>No.</Checkbox>,
                columnWidth: 64,
                renderCell: (checked, record, index, originNode) => (
                    <Checkbox>{index + 1}</Checkbox>
                ),
            },
        }
    }

    get filterProps() {
        const { location, dispatch } = this.props
        const { query } = location

        return {
            filter: {
                ...query,
            },
            onSearch: (filterSearch) => {
                filterSearch = pickBy(filterSearch, v => v?.length !== 0 && v)
                let { data } = mock_task;
                let spliceDateFilter = { ...filterSearch };
                if ('requestDateStart' in spliceDateFilter) delete spliceDateFilter['requestDateStart']
                if ('requestDateEnd' in spliceDateFilter) delete spliceDateFilter['requestDateEnd']
                if ('status' in spliceDateFilter) delete spliceDateFilter['status'];
                data = filter(mock_task, spliceDateFilter)

                // filter status 
                if ('status' in filterSearch) {
                    data = data.filter((m) => filterSearch['status'].includes(m.status));
                }
                //filter range date
                if ('requestDateStart' in filterSearch && 'requestDateEnd' in filterSearch) {
                    const start = new Date(moment(filterSearch['requestDateStart']).format('YYYY-MM-DD'))
                    const end = new Date(moment(filterSearch['requestDateEnd']).format('YYYY-MM-DD'))
                    data = filter(data, (o) => {
                        const date = new Date(o.requestDate);
                        return (date.getTime() >= start.getTime() && date.getTime() <= end.getTime());
                    })
                } else if ('requestDateStart' in filterSearch) {
                    data = filter(data, (o) => {
                        const start = new Date(moment(filterSearch['requestDateStart']).format('YYYY-MM-DD'))
                        return start.getTime() === new Date(o.requestDate).getTime()
                    })
                } else if ('requestDateEnd' in filterSearch) {
                    const start = new Date()
                    const end = new Date(moment(filterSearch['requestDateEnd']).format('YYYY-MM-DD'))
                    data = filter(data, (o) => {
                        const date = new Date(o.requestDate);
                        return (date.getTime() >= start.getTime() && date.getTime() <= end.getTime());
                    })
                }

                console.log(data);
                this.setState({ data })
            },
            onClear: () => {
                this.setState({ data: mock_task })
            }
        }
    }

    render() {
        return (
            <Page className={styles.mt10}>
                <FilterSearchPanel {...this.filterProps} />
                <Card
                    className={styles.customTable}
                    style={{ marginTop: '1rem' }}
                    size="small"
                    title={<h4 style={{ marginLeft: 5 }}>Documents list</h4>}
                    extra={<a href="#">More</a>}
                >
                    <List {...this.listProps} />
                </Card>
            </Page>
        )
    }
}

export default Task
