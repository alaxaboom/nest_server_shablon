import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async create(userDto: UserDto): Promise<User> {
        try {

            const user = new User();
            user.name = userDto.name;
            user.email = userDto.email;
            user.password = userDto.password;
            user.gender = userDto.gender;


            return await this.userRepository.create(user.get({ plain: true }));

        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
            throw error;
        }
    }

   async findOneByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.error("Ошибка при поиске пользователя по email:", error);
            return null;
        }
    }

    async findOneById(id: number): Promise<User|null> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return user;
        } catch (error) {
            console.error("Ошибка при поиске пользователя по id:", error);
            return null;
        }
    }
}
