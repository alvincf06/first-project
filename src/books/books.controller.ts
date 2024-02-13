import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/createbook.dto';
import { UpdateBookDTO } from './dto/updatebook.dto';
import { FilterBookDto } from './dto/filterbook.dto';
import { Book } from './entity/books.entity';

@Controller('books')
export class BooksController {
    private BooksService: BooksService
    constructor(BooksService: BooksService){
        this.BooksService = BooksService;
    }

    // @Get('')
    // getAllBook(){
    //     return  this.BooksService.getAllBook()
    // }

    // @Get('/:id')
    // getBook(@Param('id') id:string){
    //     return  this.BooksService.getBookId(id)
    // }

    @Get()
    async getBooks(@Query()filter:FilterBookDto):Promise<Book[]>{
        return  this.BooksService.getBooks(filter)
    }

    // @Delete('/:id')
    // deleteBook(@Param('id') id:string){
    //     return  this.BooksService.deleteBook(id)
    // }

    @Post()
    @UsePipes(ValidationPipe)
    async createBook(@Body() payload:CreateBookDTO):Promise<void>{
        return  this.BooksService.createBook(payload)
    }

    // @Put('/:id')
    // updateBook(@Param('id') id:string, @Body() payload: UpdateBookDTO,){
    //     return this.BooksService.updateBook(id,payload)
    // }
}

