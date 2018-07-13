import { Controller } from '../../src/decorators/controller'
import { Get } from '../../src/decorators/get'

@Controller()
class TestController {
  @Get()
  public Home () {
    // does nothing
  }
}

module.exports = TestController
