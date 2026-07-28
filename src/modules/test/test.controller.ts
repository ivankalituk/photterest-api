import { Body, Controller, Get, Post } from "@nestjs/common";
import { TestService } from "./test.service";

@Controller('test')
export class TestController{
    private testService: TestService;

    constructor(testService: TestService){

        this.testService = testService;

    }
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