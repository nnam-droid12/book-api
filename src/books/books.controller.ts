// src/books/books.controller.ts
import { Controller, Post, Body, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateBookDto } from './dto/create-book.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 2, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
        cb(null, filename);
      }
    })
  }))
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const bookFile = files.find(file => file.originalname.match(/\.(pdf|epub)$/i));
    const imageFile = files.find(file => file.originalname.match(/\.(jpg|jpeg|png)$/i));

    if (!bookFile || !imageFile) {
      throw new Error('Book file and image file are required.');
    }

    return this.booksService.createBook(createBookDto, bookFile.filename, imageFile.filename);
  }
}
