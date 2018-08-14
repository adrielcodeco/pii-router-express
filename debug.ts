const unit = require('./src/metadata/controllerMetadata')
const TestController = require('./test/dummy/classController')
let cm = new unit.ControllerMetadata(TestController)
cm.resolveWith(require.resolve('./test/dummy/classController'))
const action = cm.requestHandler({
  action: 'Home',
  key: 'Home',
  method: 'get',
  params: [],
  route: '/'
})
const jsonFn = () => ({})
action({}, { json: jsonFn }, () => ({})).catch((err: any) => console.log(err))
