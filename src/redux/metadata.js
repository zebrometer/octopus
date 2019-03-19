export default {
  dataSystems: {
    displayName:   'Data System',
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
    linkProperties: [
      { propName: 'name', destinationPropName: 'receiver', category: 'transactions' },
      { propName: 'name', destinationPropName: 'receiver', category: 'integrations' },
    ],
  },
  dataTypes: {
    displayName:   'Data Type',
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
    linkProperties: [
      { propName: 'name', destinationPropName: 'dataType', category: 'transactions' },
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
    ],
    linkProperties: [
      { propName: 'sender',   destinationPropName: 'name',   category: 'dataSystems'  },
      { propName: 'sender',   destinationPropName: 'sender', category: 'transactions' },
      { propName: 'dataType', destinationPropName: 'name',   category: 'dataTypes'    },
      
    ],
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
      { propName: 'integrationId', destinationPropName: 'id',   category: 'integrations' },
      { propName: 'sender',        destinationPropName: 'name', category: 'dataSystems'  },
      // { propName: 'receiver',      destinationPropName: 'name', category: 'dataSystems'  },
      { propName: 'dataType',      destinationPropName: 'name', category: 'dataTypes'  },
    ]
  },
}