import { DataSource, Repository } from 'typeorm';
import { Book } from '../entity/books.entity';
import { FilterBookDto } from '../dto/filterbook.dto';
import { CreateBookDTO } from '../dto/createbook.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }
  
  async getBook(user: User,filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;
    const query = this.createQueryBuilder('book')
                  .where('book.userId = :userId', {userId: user.id})

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
  async createBook(user: User, createBookDto: CreateBookDTO): Promise<void> {
    const { title, author, category, year } = createBookDto;
    const book = this.create();
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    book.user = user;
    try {
      await book.save();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
