import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll() {
    return this.todosService.getAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todosService.create(title);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(Number(id));
  }
}
