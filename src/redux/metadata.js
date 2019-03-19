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
              ? `${item.sender} ${item.dataType} to ${item.receiver} - ${item.receivedTimestamp}`
              : `${item.sender} ${item.dataType} - ${item.receivedTimestamp}`
      },
    properties: [
      { propName: 'sender',   label: 'Sender', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
      { propName: 'dataType', label: 'Data Type', linkTo: { category: 'dataTypes', destinationPropName: 'name' } },
      { propName: 'receiver', label: 'Receiver', linkTo: { category: 'dataSystems', destinationPropName: 'name' } },
      { propName: 'status',   label: 'Status' },
    ],
    filterProperties: [
      'sender',
      'dataType',
      'receiver',
      'status',
    ],
    linkProperties: [
      { propName: 'integrationId', destinationPropName: 'id',   category: 'integrations', singleton: true },
    ]
  },
}