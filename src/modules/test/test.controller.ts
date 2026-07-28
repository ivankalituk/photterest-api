import { Body, Controller, Get, Post } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller('test')
export class TestController{
    constructor(
        private testService: TestService
    ){}

    @Post()
    create(
        @Body() body:{name:string}
    ){
        return this.testService.create(
            body.name
        )
    }


    @Get()
    getAll(){
        return this.testService.getAll()
    }
}