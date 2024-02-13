import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDTO } from './dto/createbook.dto';
import { UpdateBookDTO } from './dto/updatebook.dto';
import { FilterBookDto } from './dto/filterbook.dto';
import { BookRepository } from './repository/book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/books.entity';
import { createTodoDTO } from '../todos/dto/create.todo.dto';

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(BookRepository)
        private readonly bookRepository: BookRepository,
      ) {}

    async getBooks(filter: FilterBookDto): Promise<Book[]>{

        return await this.bookRepository.getBook(filter)
    }

    async createBook(createTodoDTO: CreateBookDTO):Promise<void>{
        return await this.bookRepository.createBook(createTodoDTO)
    }
    
    // getAllBook(): any[]{
    //     return this.books;
    // }

    // getBookId(id:string){
    //     const bookIdx = this.findBookById(id);
    //     return this.books[bookIdx]
    // }

    // filterBook(filter:FilterBookDto): any[] {
    //     const {title, author, category, min_year,max_year} = filter
    //     const books = this.books.filter((book) =>{
    //         if(title && book.title != title){
    //             return false;
    //         }

    //         if(author && book.author != author){
    //             return false
    //         }

    //         if(category && book.category != category){
    //             return false
    //         }
    //         if(min_year &&book.year < min_year){
    //             return false
    //         }
    //         if(max_year && book.year > max_year){
    //             return false
    //         }

    //         return true;
    //     })
    //     return  books
    // }

    // createBook(CreateBookDTO:CreateBookDTO) {
    //     const {title, author, category, year} = CreateBookDTO
    //     this.books.push({
    //         id: uuidv4(),
    //         title,
    //         author,
    //         category,
    //         year
    //     })
    // }

    // updateBook(id: string, updateBookdto:UpdateBookDTO) {
    //     const {title, author, category, year} = updateBookdto
    //     const bookIdx = this.findBookById(id);
    //     this.books[bookIdx].title = title;
    //     this.books[bookIdx].author = author;
    //     this.books[bookIdx].category = category;
    //     this.books[bookIdx].year = year;
    // }

    // deleteBook(id:string){
    //     const bookIDx = this.findBookById(id);
    //     this.books.splice(bookIDx,1);
    // }

    // findBookById(id:string){
    //     const bookIdx = this.books.findIndex((book)=> book.id === id)
    //     if(bookIdx === -1){
    //         throw new NotFoundException(`Book with id ${id} is not found`)
    //     }
    //     return bookIdx;
    // }
}
