import {
  Collapse,
  Row,
  Col,
  Select,
  Typography,
  DatePicker,
  Button,
  Space,
} from 'antd'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import styles from './FilterSearchPanel.less'
import React, {useState} from 'react'
import { mock_task } from '../../banpu-mock/mockData'
import { capitalize, lowerCase } from 'lodash'
const { Panel } = Collapse
const { Option } = Select
const { Text } = Typography

const listRequester = [];
const listCompany = [];
const listCounterpart = [];
const listTypeOfAgreement = [];
const listStatus = [];
const listDoc = [];

mock_task.forEach((el, index) => {
  listRequester.push({value: el.requester, lable: el.requester});
  listCompany.push({value: el.company, lable: el.company})
  listCounterpart.push({value: el.counterpart, lable: el.counterpart})
  listTypeOfAgreement.push({value: el.typeOfAgreement, lable: el.typeOfAgreement})
  listStatus.push({value: el.status, lable: capitalize(lowerCase(el.status))})
  listDoc.push({value: el.doc, lable: el.doc})
});
let listRequesterdUP = [...new Map(listRequester.map( o => [JSON.stringify(o), o])).values()];
let listDocUp = [...new Map(listDoc.map( o => [JSON.stringify(o), o])).values()];
let listCompanyUp = [...new Map(listCompany.map( o => [JSON.stringify(o), o])).values()];
let listCounterpartUp = [...new Map(listCounterpart.map( o => [JSON.stringify(o), o])).values()];
let listTypeOfAgreementUp = [...new Map(listTypeOfAgreement.map( o => [JSON.stringify(o), o])).values()];
let listStatusUp = [...new Map(listStatus.map( o => [JSON.stringify(o), o])).values()];

const config = [
  { label: 'Doc No.', type: 'select', placeholder: 'Select', prop: "doc", arrayList: listDocUp },
  { label: 'Requester', type: 'select', placeholder: 'Select', prop: "requester", arrayList: listRequesterdUP },
  { label: 'Company', type: 'select', placeholder: 'Select', prop: "company", arrayList: listCompanyUp },
  { label: 'Counterpart', type: 'select', placeholder: 'Select', prop: "counterpart", arrayList: listCounterpartUp },
  { label: 'Type of agreement', type: 'select', placeholder: 'Select', prop: "typeOfAgreement", arrayList: listTypeOfAgreementUp },
  { label: 'Status', type: 'multiple-select', placeholder: 'Select', prop: "status", arrayList: listStatusUp },
  { label: 'Request date start', type: 'date', placeholder: 'dd/mm/yyyy', prop: 'requestDateStart', format: 'DD/MM/YYYY', arrayList: [{value: 'test1', lable: 'test'}, {value: 'test2', lable: 'test2'}] },
  { label: 'End', type: 'date', placeholder: 'dd/mm/yyyy', prop: 'requestDateEnd', format: 'DD/MM/YYYY', arrayList: [] },
]

export default function FilterSearchPanel(props) {
  const [filterSearch, setFilterSearch] = useState({
    doc: null,
    requester: null,
    company: null,
    counterpart: null,
    typeOfAgreement: null,
    status: [],
    requestDateStart: null,
    requestDateEnd: null
  })
  const togglePanel = (status) => {
    console.log(status)
  }

  const onChange = (prop) => (value) => {
    setFilterSearch({...filterSearch, [prop]: value})
  }

  const onClear = () => {
    setFilterSearch({
      doc: null,
      requester: null,
      company: null,
      counterpart: null,
      typeOfAgreement: null,
      status: [],
      requestDateStart: null,
      requestDateEnd: null
    })
    props.onClear && props.onClear();
  }

  const onSearch = () => {
    props.onSearch && props.onSearch(filterSearch);
  }

  const renderInput = (item) => {
    switch (item.type) {
      case 'select':
        const children1 = [];
        for (let i = 0; i < item.arrayList.length; i++) {
          children1.push(
            <Option key={i} value={item.arrayList[i].value}>{item.arrayList[i].lable}</Option>
          )
        }
        return (
          <Select
            style={{ width: '100%' }}
            allowClear
            placeholder={item.placeholder}
            onChange={onChange(item.prop)}
            value={filterSearch[item.prop]}
          >
            {children1}
          </Select>
        )
      case 'multiple-select':
        const children = []
        for (let i = 0; i < item.arrayList.length; i++) {
          children.push(
            <Option key={i} value={item.arrayList[i].value}>{item.arrayList[i].lable}</Option>
          )
        }
        return (
          <Select
            style={{ width: '100%' }}
            mode="multiple"
            allowClear
            showArrow
            placeholder={item.placeholder}
            onChange={onChange(item.prop)}
            value={filterSearch[item.prop]}
          >
            {children}
          </Select>
        )
        break
      default:
        return (
          <DatePicker
            style={{ width: '100%' }}
            placeholder={item.placeholder}
            format={item.format}
            onChange={onChange(item.prop)}
            value={filterSearch[item.prop]}
          />
        )
        break
    }
  }

  return (
    <Collapse defaultActiveKey={['1']} onChange={togglePanel}>
      <Panel header="Search" key="1" className={styles.siteCollapseCustom}>
        <Row gutter={[16, 24]}>
          {config.map((i) => {
            return (
              <Col className="gutter-row" span={6} key={i.label}>
                <Text>{i.label}</Text>
                {renderInput(i)}
              </Col>
            )
          })}
        </Row>
        <Row style={{ marginTop: '1.4rem', justifyContent: 'center' }}>
          <Space>
            <Button onClick={onClear} icon={<CloseOutlined />}>Clear</Button>
            <Button onClick={onSearch} type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          </Space>
        </Row>
      </Panel>
    </Collapse>
  )
}
