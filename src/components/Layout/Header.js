import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Avatar, Popover, Badge, List, Button, Space, Select  } from 'antd'
import { Ellipsis } from 'components'
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  DownloadOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Trans } from "@lingui/macro"
import { getLocale, setLocale } from 'utils'
import moment from 'moment'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'


const { SubMenu } = Menu
const { Option } = Select

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      fixed,
      avatar,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu} className={styles.rightContent}>
        <SubMenu
          style={{with: '100%', padding: 0}}
          title={
            <Fragment >
              <Avatar style={{ margin: 8, }} src={avatar} />
              <span>Jiraporn Tongp...</span>
              <DownOutlined />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            <Trans>Sign out</Trans>
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    // if (config.i18n) {
    //   const { languages } = config.i18n
    //   const language = getLocale()
    //   const currentLanguage = languages.find(
    //     item => item.key === language
    //   )

    //   rightContent.unshift(
    //     <Menu
    //       key="language"
    //       selectedKeys={[currentLanguage.key]}
    //       onClick={data => {
    //         setLocale(data.key)
    //       }}
    //       mode="horizontal"
    //     >
    //       <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
    //         {languages.map(item => (
    //           <Menu.Item key={item.key}>
    //             <Avatar
    //               size="small"
    //               style={{ marginRight: 8 }}
    //               src={item.flag}
    //             />
    //             {item.title}
    //           </Menu.Item>
    //         ))}
    //       </SubMenu>
    //     </Menu>
    //   )
    // }

    // rightContent.unshift(
    //   <Popover
    //     placement="bottomRight"
    //     trigger="click"
    //     key="notifications"
    //     overlayClassName={styles.notificationPopover}
    //     getPopupContainer={() => document.querySelector('#primaryLayout')}
    //     content={
    //       <div className={styles.notification}>
    //         <List
    //           itemLayout="horizontal"
    //           dataSource={notifications}
    //           locale={{
    //             emptyText: <Trans>You have viewed all notifications.</Trans>,
    //           }}
    //           renderItem={item => (
    //             <List.Item className={styles.notificationItem}>
    //               <List.Item.Meta
    //                 title={
    //                   <Ellipsis tooltip lines={1}>
    //                     {item.title}
    //                   </Ellipsis>
    //                 }
    //                 description={moment(item.date).fromNow()}
    //               />
    //               <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
    //             </List.Item>
    //           )}
    //         />
    //         {notifications.length ? (
    //           <div
    //             onClick={onAllNotificationsRead}
    //             className={styles.clearButton}
    //           >
    //             <Trans>Clear notifications</Trans>
    //           </div>
    //         ) : null}
    //       </div>
    //     }
    //   >
    //     <Badge
    //       count={notifications.length}
    //       dot
    //       offset={[-10, 10]}
    //       className={styles.iconButton}
    //     >
    //       <BellOutlined className={styles.iconFont} />
    //     </Badge>
    //   </Popover>
    // )

    return (
      <React.Fragment>
        <Layout.Header
          className={classnames(styles.header, {
            [styles.fixed]: fixed,
            [styles.collapsed]: collapsed,
          })}
          id="layoutHeader"
        >
          <div className={styles.headerContent}>
            <div
              className={styles.button}
              onClick={onCollapseChange.bind(this, !collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className={styles.rightContainer}>{rightContent}</div>
          </div>
          <div className={styles.headerSecondContent}>
            <div className={styles.routerDetail}>
              <HomeOutlined /> <span>Menu_title_01 / <span style={{fontWeight: 500, color: 'black'}}><FileTextOutlined /> All document</span></span>
            </div>
            <div className={styles.rightContainer}>
              <Space size={[8, 16]} wrap align="baseline">
                <Button type="primary" ghost icon={<UnorderedListOutlined />} size="large">
                    Display
                </Button>
                <Button type="primary" ghost icon={<DownloadOutlined />} size="large">
                    Export Exel
                </Button>
                <Select size="large" defaultValue="lucy" className={styles.bgInput} style={{ width: 'auto', backgroundColor:'#1890ff' }} allowClear>
                  <Option value="lucy">Create new request</Option>
                </Select>
              </Space>
            </div>
          </div>
        </Layout.Header>
        {/* <Layout.Header
          className={classnames(styles.header, {
            [styles.fixed]: fixed,
            [styles.collapsed]: collapsed,
          })}
          id="layoutHeader2"
        >
          <div
            className={styles.button}
            onClick={onCollapseChange.bind(this, !collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className={styles.rightContainer}>{rightContent}</div>
        </Layout.Header> */}
      </React.Fragment>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
}

export default Header
