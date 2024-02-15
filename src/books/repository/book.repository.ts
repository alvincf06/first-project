import { DataSource, Repository } from 'typeorm';
import { Book } from '../entity/books.entity';
import { FilterBookDto } from '../dto/filterbook.dto';
import { CreateBookDTO } from '../dto/createbook.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }
  async getBook(filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;
    const query = this.createQueryBuilder('book');
    if (title) {
      query.andWhere('lower(book.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }
    if (author) {
      query.andWhere('lower(book.author) LIKE :author', {
        author: `%${title.toLowerCase()}%`,
      });
    }
    if (category) {
      query.andWhere('lower(book.category) LIKE :category', {
        category: `%${title.toLowerCase()}%`,
      });
    }
    if (min_year) {
      query.andWhere('book.year >= :min_year', { min_year });
    }
    if (max_year) {
      query.andWhere('book.year <= :max_year', { max_year });
    }
    return await query.getMany();
  }
  async createBook(createBookDto: CreateBookDTO): Promise<void> {
    const { title, author, category, year } = createBookDto;
    const book = this.create();
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    try {
      await book.save();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
