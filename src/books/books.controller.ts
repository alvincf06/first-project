import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createbook.dto';
import { FilterBookDto } from './dto/filterbook.dto';
import { Book } from './entity/books.entity';
import { UUIDValidationPipe } from 'src/pipes/uuid.validation';
import { UpdateBookDTO } from './dto/updatebook.dto';
@Controller('books')
export class BooksController {
  private BooksService: BooksService;
  constructor(BooksService: BooksService) {
    this.BooksService = BooksService;
  }

  // @Get('/:id')
  // async getBook(@Param('id', UUIDValidationPipe) id: string): Promise<Book> {
  //   return this.BooksService.getBookById(id);
  // }

  @Get()
  async getBooks(@Query() filter: FilterBookDto): Promise<Book[]> {
    return this.BooksService.getBooks(filter);
  }

  @Delete('/:id')
  async deleteBook(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.BooksService.deleteBook(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBook(@Body() payload: CreateBookDTO): Promise<void> {
    return this.BooksService.createBook(payload);
  }

  // @Put('/:id')
  // async updateBook(
  //   @Param('id', UUIDValidationPipe) id: string,
  //   @Body() payload: UpdateBookDTO,
  // ): Promise<void> {
  //   return this.BooksService.updateBook(id, payload);
  // }
}
