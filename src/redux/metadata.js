import moment from 'moment'

export default {
  dataSystems: {
    displayName:   'Data System',
      name(item) {
          return item.name
      },
    filterProperties: [
      'name',
    ],
    linkProperties: [
        { propName: 'name', destinationPropName: 'sender', category: 'integrations', title: 'Sending Integrations' },
        { propName: 'name', destinationPropName: 'receiver', category: 'integrations', title: 'Receiving Integrations' },
        { propName: 'name', destinationPropName: 'sender', category: 'transactions', title: 'Sending Transactions' },
      { propName: 'name', destinationPropName: 'receiver', category: 'transactions', title: 'Receiving Transactions' },
    ],
  },
  dataTypes: {
    displayName:   'Data Type',
      name(item) {
          return item.name
      },
    filterProperties: [
      'name',
    ],
    linkProperties: [
        { propName: 'name', destinationPropName: 'dataType', category: 'integrations', title: 'Integrations' },
        { propName: 'name', destinationPropName: 'dataType', category: 'transactions', title: 'Transactions' },
    ],
  },
  integrations: {
    displayName:   'Integration',
      name(item) {
          return item.receiver
              ? `${item.sender} ${item.dataType} to ${item.receiver}`
              : `${item.sender} ${item.dataType}`
      },
    properties: [
        { propName: 'sender',   label: 'Sender', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
        { propName: 'dataType', label: 'Data Type', linkTo: { category: 'dataTypes', destinationPropName: 'name' } },
        { propName: 'receiver', label: 'Receiver', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
    ],
    filterProperties: [
      'dataType',
      'sender',
      'receiver',
    ],
  },
  transactions: {
    displayName:   'Transaction',
      name(item) {
        return item.receiver
          ? `${item.sender} ${item.dataType} to ${item.receiver} - ${moment(item.receivedTimestamp).format('YYYY-MM-DD h:mm')}`
          : `${item.sender} ${item.dataType} - ${moment(item.receivedTimestamp).format('YYYY-MM-DD h:mm')}`
      },
    properties: [
      { propName: 'sender',   label: 'Sender', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
      { propName: 'dataType', label: 'Data Type', linkTo: { category: 'dataTypes', destinationPropName: 'name' } },
      { propName: 'receiver', label: 'Receiver', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
      { propName: 'status',   label: 'Status' },
      { propName: 'integrationId', label: 'Integration', linkTo: { destinationPropName: 'id',  category: 'integrations', }},
      { propName: 'parentId', label: 'Parent', linkTo: { destinationPropName: 'id',  category: 'transactions', }},
    ],
    filterProperties: [
      'sender',
      'dataType',
      'receiver',
      'status',
    ],
    alarmProperties: [
      { propertyName: 'status', propertyValue: 'Failed' },
    ]
  },
}