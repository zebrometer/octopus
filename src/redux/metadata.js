export default {
  dataSystems: {
    displayName:   'Data System',
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
  },
  dataTypes: {
    displayName:   'Data Type',
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
  },
  integrations: {
    displayName:   'Integration',
    titlePropName: 'sender',
    properties: [
      { propName: 'dataType', label: 'Data Type' },
      { propName: 'sender',   label: 'Sender' },
      { propName: 'receiver', label: 'Receiver' },
    ],
    filterProperties: [
      'dataType',
      'sender',
      'receiver',
    ]
  },
  transactions: {
    displayName:   'Transaction',
    titlePropName: 'sender',
    properties: [
      { propName: 'sender',   label: 'Sender' },
      { propName: 'dataType', label: 'Data Type' },
      { propName: 'receiver', label: 'Receiver' },
      { propName: 'status',   label: 'Status' },
    ],
    filterProperties: [
      'sender',
      'dataType',
      'receiver',
      'status',
    ],
    linkProperties: [
      { propName: 'integrationId', destinationPropName: 'id', category: 'integrations' },
    ]
  },
}