import { Container } from '@pii/di'
import { RequestExtensionToken } from '@pii/application'
import { MetadataKeys } from './metadata'

export default function RequestExtension (req: any, res: any, next: Function) {
  res.redirectTo = function (controller: { new (...args: any[]): any }) {
    const controllerPath = Reflect.getMetadata(MetadataKeys.controller_path, controller)
    req.redirect(controllerPath)
  }
  next()
}

Container.addSingleton(RequestExtensionToken, RequestExtension)
