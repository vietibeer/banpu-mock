import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm, Card, Checkbox } from 'antd'
import { t } from '@lingui/macro'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import FilterSearchPanel from './components/FilterSearchPanel'
import styles from './index.less'
@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {
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
    console.log(list)
    return {
      dataSource: list,
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
      onFilterChange: (value) => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { user } = this.props
    const { selectedRowKeys } = user

    return (
      <Page inner>
        {/* <Filter {...this.filterProps} /> */}
        <FilterSearchPanel {...this.filterProps} />
        {/* {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )} */}
        <Card
          className={styles.customTable}
          style={{ marginTop: '1rem' }}
          size="small"
          title={<h4 style={{ marginLeft: 5 }}>Documents list</h4>}
          extra={<a href="#">More</a>}
        >
          <List {...this.listProps} />
        </Card>
        {/* <Modal {...this.modalProps} /> */}
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
