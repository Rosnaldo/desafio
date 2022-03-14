import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'
import { UserCreateController } from 'src/module/user/controller/create.controller'
import { UserCreateRepository } from 'src/module/user/repository/create.repostiory'
import { UserMapper } from 'src/module/user/service/mapper'

let controller
const mockUserCreateRepository = {
  execute: jest.fn(),
}

const Sut = () => {
  const spyUseCreate = jest.spyOn(mockUserCreateRepository, 'execute')
  return { spyUseCreate }
}

describe('UserCreateController', () => {
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [UserCreateRepository, UserMapper],
    })
      .setLogger(new Logger())
      .overrideProvider(UserCreateRepository)
      .useValue(mockUserCreateRepository)
      .compile()

    controller = module.get<UserCreateController>(UserCreateController)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Controller should be defined', function () {
    expect(controller).toBeDefined()
  })

  it('Should call UserCreateRepository with right param', async function () {
    const req = {
      user: {
        firstName: 'Andrey',
        lastName: 'Tsuzuki',
        picture: 'any',
        email: 'andreytsuzuki@gmail.com',
      },
    }

    const { spyUseCreate } = Sut()

    await controller.googleAuthRedirect(req)
    expect(spyUseCreate).toBeCalledWith({
      first_name: 'Andrey',
      last_name: 'Tsuzuki',
      photo_url: 'any',
      email: 'andreytsuzuki@gmail.com',
    })
  })
})
