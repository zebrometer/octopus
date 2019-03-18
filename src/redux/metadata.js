export default {
  dataSystems: {
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
  },
  dataTypes: {
    titlePropName: 'name',
    filterProperties: [
      'name',
    ],
  },
  integrations: {
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
  },
}