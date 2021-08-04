import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar, Typography, Space, Button } from 'antd'
import { DropOption } from 'components'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { Link } from 'umi'
import styles from './List.less'
import { capitalize, lowerCase } from 'lodash'
import moment from 'moment'
import {
  UserOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons'

const { confirm } = Modal

class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>Doc No.</Trans>,
        dataIndex: 'doc',
        key: 'doc',
        width: '10%',
        sorter: (a, b) => a.doc - b.doc,
        // fixed: 'left',
        render: (text) => {
          const nos = text.split(',')
          return nos.map((n, i) => (
            <div key={i}>
              {n} {nos.length - 1 !== i ? ',' : ''}
            </div>
          ))
        },
      },
      {
        title: <Trans>Requester</Trans>,
        dataIndex: 'requester',
        key: 'requester',
        width: '13%',
        sorter: (a, b) => a.requester - b.requester,
        render: (text, record) => (
          <Space>
            <Avatar src={record.avatar} />
            <Typography>{text}</Typography>
          </Space>
        ),
      },
      {
        title: <Trans>Company</Trans>,
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: <Trans>Counterpart</Trans>,
        dataIndex: 'counterpart',
        // width: '6%',
        key: 'counterpart',
      },
      {
        title: <Trans>Type of agreement</Trans>,
        dataIndex: 'typeOfAgreement',
        // width: '6%',
        key: 'typeOfAgreement',
      },
      {
        title: <Trans>Request date</Trans>,
        dataIndex: 'requestDate',
        key: 'requestDate',
        // width: '7%',
        sorter: (a, b) => a.requestDate - b.requestDate,
        render: (text, record) => (
          <>
            <Typography>{moment(text).format('DD/MM/YYYY')}</Typography>
            <div>
              <UserOutlined /> {record.userRequest}
            </div>
          </>
        ),
      },
      {
        title: <Trans>Steps</Trans>,
        dataIndex: 'steps',
        key: 'steps',
        render: (text, record) => (
          <>
            <Typography>{text}</Typography>
            <div>{record.titleSteps}</div>
          </>
        ),
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status - b.status,
        render: (text, record) => (
          <>
            <div style={{ position: 'relative' }}>
              <div className={`status-dot ${text}`}></div>
              <span className={'status-text'}>
                {capitalize(lowerCase(text))}
              </span>
            </div>
            <UserOutlined /> {record.userRequest}
          </>
        ),
      },
      {
        title: <Trans>Action</Trans>,
        key: 'action',
        fixed: 'right',
        // width: '8%',
        render: (text, record) => {
          return (
            <Space>
              <Button icon={<EyeOutlined />} />
              <Button icon={<DeleteOutlined />} />
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                twotonecolor="#1890ff"
              />
            </Space>
          )
        },
      },
    ]
    // const columns = [
    //   {
    //     title: <Trans>Avatar</Trans>,
    //     dataIndex: 'avatar',
    //     key: 'avatar',
    //     width: '7%',
    //     fixed: 'left',
    //     render: (text) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    //   },
    //   {
    //     title: <Trans>Name</Trans>,
    //     dataIndex: 'name',
    //     key: 'name',
    //     render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    //   },
    //   {
    //     title: <Trans>NickName</Trans>,
    //     dataIndex: 'nickName',
    //     key: 'nickName',
    //   },
    //   {
    //     title: <Trans>Age</Trans>,
    //     dataIndex: 'age',
    //     width: '6%',
    //     key: 'age',
    //   },
    //   {
    //     title: <Trans>Gender</Trans>,
    //     dataIndex: 'isMale',
    //     key: 'isMale',
    //     width: '7%',
    //     render: (text) => <span>{text ? 'Male' : 'Female'}</span>,
    //   },
    //   {
    //     title: <Trans>Phone</Trans>,
    //     dataIndex: 'phone',
    //     key: 'phone',
    //   },
    //   {
    //     title: <Trans>Email</Trans>,
    //     dataIndex: 'email',
    //     key: 'email',
    //   },
    //   {
    //     title: <Trans>Address</Trans>,
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    //   {
    //     title: <Trans>CreateTime</Trans>,
    //     dataIndex: 'createTime',
    //     key: 'createTime',
    //   },
    //   {
    //     title: <Trans>Operation</Trans>,
    //     key: 'operation',
    //     fixed: 'right',
    //     width: '8%',
    //     render: (text, record) => {
    //       return (
    //         <DropOption
    //           onMenuClick={(e) => this.handleMenuClick(record, e)}
    //           menuOptions={[
    //             { key: '1', name: t`Update` },
    //             { key: '2', name: t`Delete` },
    //           ]}
    //         />
    //       )
    //     },
    //   },
    // ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total, range) =>
            `Show ${range[0]} to ${range[1]} of ${total} entries`,
          showQuickJumper: false,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={(record) => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
