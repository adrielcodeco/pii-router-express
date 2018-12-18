import { MetadataKeys } from './metadata'
import { ActionMetadata } from './metadata/actionMetadata'

export class ActionMiddleware {
  public static addMiddleware (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
    middleware: Function
  ) {
    const key = propertyName
    const actions: ActionMetadata[] =
      Reflect.getMetadata(
        MetadataKeys.controller_actions,
        target.constructor
      ) || []
    let action = actions.find(a => a.key === key)
    if (action) {
      if (!action.middlewares) {
        action.middlewares = []
      }
      action.middlewares.push(middleware)
    } else {
      action = new ActionMetadata(key, '/', propertyName, 'get')
      action.middlewares = [middleware]
      actions.push(action)
    }
    Reflect.defineMetadata(
      MetadataKeys.controller_actions,
      actions,
      target.constructor
    )
  }
}
