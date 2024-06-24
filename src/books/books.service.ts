// src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  createBook(createBookDto: CreateBookDto, bookFileName: string, imageFileName: string): Book {
    const newBook: Book = {
      id: this.idCounter++,
      name: createBookDto.name,
      bookFile: bookFileName,
      imageFile: imageFileName
    };

    this.books.push(newBook);
    return newBook;
  }

  getAllBooks(): Book[] {
    return this.books;
  }
}
