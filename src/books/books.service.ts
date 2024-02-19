import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDTO } from './dto/createbook.dto';
import { FilterBookDto } from './dto/filterbook.dto';
import { BookRepository } from './repository/book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/books.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
    console.log('user service' + user)
    return await this.bookRepository.getBook(user, filter);
  }

  async createBook(user: User, createTodoDTO: CreateBookDTO): Promise<void> {
    return await this.bookRepository.createBook(user, createTodoDTO);
  }

  async getBookById(user: User, id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: id, user: user }, } );
    if (!book) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
    return book;
  }

  async updateBook(user: User, id: string, UpdateBookDTO): Promise<void> {
    const { title, author, category, year } = UpdateBookDTO;
    const book = await this.getBookById(user, id);

    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;

    await book.save();
  }

  async deleteBook(id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }
}
