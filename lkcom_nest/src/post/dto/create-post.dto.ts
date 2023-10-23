import { Allow, IsNotEmpty } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({message:'标题不能为空'})
    title:string

    @IsNotEmpty({message:'发帖内容不能为空'})
    content: string

    @Allow()
    preview: string

    
}
