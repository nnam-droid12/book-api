// src/books/dto/create-book.dto.ts
export class CreateBookDto {
    name: string;
  }
  
  // src/books/dto/upload-file.dto.ts
  export class UploadFileDto {
    bookFile: Express.Multer.File;
    imageFile: Express.Multer.File;
  }
  