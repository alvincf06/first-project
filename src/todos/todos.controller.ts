import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { createTodoDTO } from './dto/create.todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoServices: TodosService){

    }
    @Post()
    create(@Body() dto:createTodoDTO) {
        return this.todoServices.create(dto)
    }

    @Get()
    getById() {
        return this.todoServices.findById()
    }
}
