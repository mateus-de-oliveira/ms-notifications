import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateNoficationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
