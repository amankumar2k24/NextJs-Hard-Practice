import { Controller, Get, Header, Headers, HttpCode, HttpStatus, Param, Query, Redirect, Req, Res } from '@nestjs/common';
import { log } from 'console';
import type { Request, Response } from 'express';
import { of } from "rxjs"

interface videoConferenceParamData {
    id: number;
    name: string;
}

interface QueryParamsData {
    userId: number;
    name: string;
}


@Controller("users")
export class UserController {

    //==================================================== For @HttpCode, HTTPStatus =================================================
    @Get("profile")
    // @HttpCode(200)
    // @HttpCode(HttpStatus.NO_CONTENT)
    getProfile(@Req() req: Request, @Res() res: Response) {
        // return of({ name: "John", age: 30 });
        res.status(200);
        res.json({ name: "John", age: 30 });
    }
    //==================================================== For @HttpCode, HTTPStatus =================================================




    //==================================================== For Passthrough =================================================

    // passthrough allows you to use res status but still return the value
    @Get("response-next-will-handle")
    getProfileNextWillHandle(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // return of({ name: "John", age: 30 });
        res.status(200);
        return { name: "John", age: 30 };
    }
    //==================================================== For Passthrough =================================================


    //==================================================== For @Header - Set Response Header =================================================
    @Get("set-headers")
    @Header('Custom-Header', 'MyCustomHeaderValue')
    @Header("Cache-Control", "none")
    setHeaders(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // return of({ name: "John", age: 30 });
        res.status(200);
        return { name: "John", age: 30 };
    }
    //==================================================== For @Header - Set Response Header =================================================


    // ================================================== For @Redirect ==================================================

    @Get("redirect-use")
    @Redirect('redirect-manual', 302)       // Static redirect
    redirectUse(@Req() req: Request, @Res() res: Response) {
        const randomRedirectManualNumber = (Math.random() * 10) + 1;
        log("randomRedirectManualNuber==>", randomRedirectManualNumber);
        if (randomRedirectManualNumber < 10) {
            return { url: "redirect-manual" }         // dynamic redirect
        } else {
            return { url: "redirect-manual-2" }       // dynamic redirect
        }
    }

    @Get("redirect-manual")
    getAccountData(@Req() req: Request, @Res() res: Response) {
        res.json({ accountData: "Your account data" });
    }

    @Get("redirect-manual-2")
    getAccountData2(@Req() req: Request, @Res() res: Response) {
        res.json({ accountData: "Your account data 2" });
    }
    // ================================================== For @Redirect ==================================================



    // ================================================== Get Single @Param ==================================================

    @Get("videosById/:videoId")
    getVideoByIdSingleParam(@Param("videoId") param: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // const videoId = req.params.id;
        log("param==>", param);
        return 'Success'
    }
    // ================================================== Get Single @Param ==================================================


    // ======================================= Get Multiple @Param and Real Use is this =====================================
    @Get("videosByIdAndName/:id/:name")
    getVideoByIdByUsingInterface(@Param() param: videoConferenceParamData, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        // const videoId = req.params.id;
        log("videoId==>", param);
        return {
            id: param.id,
            name: param.name
        }
    }
    // ======================================= Get Multiple @Param and Real Use is this =====================================



    // ================================================== @Query Params ========================================================
    @Get("videosByQueryParam")
    // getVideoByQueryParam(@Query() query: Record<string, any>) {
    //     log("query==>", query);
    //     return query
    // }
    getVideoByQueryParams(@Query() query: QueryParamsData) {
        log("query==>", query);
        return {
            _id: query.userId,
            userName: query.name
        }
    }
    // ================================================== @Query Params ========================================================


    // ================================================== @Headers - Extract Request Headers ========================================================

    @Get("extract-headers")
    // getRequestHeaders(@Headers("user-agent") headers: Record<string, any>) {
    //     log("headers==>", headers);
    //     return headers
    // }
    getRequestHeaders(@Headers() headers: Record<string, any>) {
        log("headers==>", headers);
        return headers
    }
    // ================================================== @Headers - Extract Request Headers ========================================================

}