import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo)private readonly todoRepository: Repository<Todo>){
    }

   async create(dto: {title:string}){
        const todo = this.todoRepository.create(dto)

        return await this.todoRepository.save(todo);
    }

    findById() {
        return this.todoRepository.find({where: {id: 1}})
    }
}
