import { GlobalConstants } from "../../actions/commons/GlobalConstants";
import { HttpMethod } from "../../actions/commons/HttpsMethod";
import { HttpStatus } from "../../actions/commons/HttpStatus";
import { PageGeneratorManager } from "../../actions/commons/PageGeneratorManager";
import { HeaderObject } from "../../actions/pageObject/HeaderPageObject";
import { LoginPageObject } from "../../actions/pageObject/LoginPageObject";
describe('Test intercept userData and assert data intercept and dataUI', () => {
    let bodyData200: any;
    let bodyData400: any;
    let bodyData403: any;
    let bodyData404: object;
    let bodyData500:object;
    let loginPage: LoginPageObject;
    let headerPage:HeaderObject;

    before(() => {
        loginPage = PageGeneratorManager.getloginPage();
        headerPage=PageGeneratorManager.getHeaderPage();
        // Khai báo dữ liệu bodyData trước khi chạy các test
        bodyData200 = {
            value: [
                {
                    "user": "operator2",
                    "userId": 1
                },
                {
                    "user": "maintainer2",
                    "userId": 2
                },
                {
                    "user": "engineer3",
                    "userId": 3
                },
                {
                    "user": "admin3",
                    "userId": 4
                },
                {
                    "user": "accretech3",
                    "userId": 5
                },
                {
                    "user": "operator2",
                    "userId": 1
                },
                {
                    "user": "maintainer2",
                    "userId": 2
                },
                {
                    "user": "engineer3",
                    "userId": 3
                },
                {
                    "user": "admin3",
                    "userId": 4
                },
                {
                    "user": "accretech3",
                    "userId": 5
                },
                {
                    "user": "operator2",
                    "userId": 1
                },
                {
                    "user": "maintainer2",
                    "userId": 2
                },
                {
                    "user": "engineer3",
                    "userId": 3
                },
                {
                    "user": "admin3",
                    "userId": 4
                },
                {
                    "user": "accretech3",
                    "userId": 5
                },
                {
                    "user": "operator2",
                    "userId": 1
                },
                {
                    "user": "maintainerlllllllllllllllllllllllllllll2ddddddddddddddddddddddddddddddddddddddddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdddddddpppppppppppppppppppppppppppppddddddd11111111111111111111111111111",
                    "userId": 2
                },
                {
                    "user": "engineer3",
                    "userId": 3
                },
                {
                    "user": "admin3",
                    "userId": 4
                },
                {
                    "user": "accretech3",
                    "userId": 5
                }
            ]
        };
        bodyData400 = {
            "detail": "Bad Request",
            "errors": [
                {
                    "code": 644,
                    "command": "C076C66C-1D31-4074-B708-5C706A5615FE",
                    "file": "/home/splusdev03/Documents/splus/nxgs-platform/src/products/managers/device/common.cpp",
                    "line": 36,
                    "parameters": "",
                    "service": "C070DE6B-2F85-4D2E-9D63-038D2917D937"
                }
            ],
            "instance": "/dev/machine/device/00000000-0000-0000-0000-000000000001",
            "status": 400,
            "title": "Invalid Parameter",
            "type": "/acct/1/server/dev/machine/device/00000000-0000-0000-0000-000000000001"
        }
        bodyData403={
            "detail": "Forbidden",
            "errors": [
              {
                "code": 646,
                "command": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "file": "/codebuild/output/src3414243328/src/github.com/accretech-bggs-extension/nxgsplatform/blob/develop/resource/tools/hrg3000xf/seed-json/tb_key_value_fe_settings_user.json",
                "line": 11,
                "parameters": "",
                "service": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
              }
            ],
            "instance": "/resource/100/users",
            "status": 403,
            "title": "Forbidden",
            "type": "/acct/1/server/resource/100/users"
          }
        bodyData404={
            "detail": "Not found specified path in configuration",
            "errors": [
              {
                "code": 642,
                "file": "/home/splusdev03/Documents/splus/nxgs-platform/src/framework/services/http1x/http1x.cpp",
                "line": 162,
                "parameters": ""
              }
            ],
            "status": 404,
            "title": "Invalid Url",
            "type": "/acct/1/server/dev/machine/device/00000000-0000-0000-0000-0000000000015",
            "instance": "",
            "response": {
              "status": 500,
              "message": "Server Internal Error",
              "description": "This is the sample response when HTTP status code as 500 if there was any Database access error to get sensor data."
            }
          }
        bodyData500={
            "detail": "Failed to query machine/def/cem/element/types with Database Driver",
            "errors": [
              {
                "code": 640,
                "command": "C01161A1-DC49-4AD8-A79E-5CEB9C38685F",
                "file": "/home/splusdev03/Documents/splus/nxgsplatform/src/products/equipment/command/machine/define/cem/element/types/any.cpp",
                "line": 43,
                "parameters": "",
                "service": "C010FE1A-B9C9-4313-AAF9-2EA384FE7C24"
              }
            ],
            "instance": "/machine/def/cem/element/types",
            "status": 500,
            "title": "Fail to query resource",
            "type": "/acct/1/server/machine/def/cem/element/types"
          }           
    });
    beforeEach(() => {
    cy.openUrl(GlobalConstants.LoginURL);
      })

    it('HTTP 200 Returned if the request is successful', () => {
        cy.intercept(HttpMethod.GET, GlobalConstants.login_UserApi, {
            statusCode: HttpStatus.OK,
            body: bodyData200
        }).as('users');

        // Chờ API trả về dữ liệu đã được thay đổi
    cy.wait('@users').then((interception:any) => {
        const items = interception.response.body.value;  // Lấy dữ liệu đã thay đổi
        const apiUserNames = items.map((item:any) => item.user);  // Tạo mảng tên người dùng từ API
  
        // Bước 4: Lấy danh sách tên người dùng từ giao diện
        loginPage.clickToUsernameTextboxByContainsText();
        expect(apiUserNames.length).to.equal(items.length);
        loginPage.selectTextsOfAllValueUserNameDropList().then(result => {
            expect(result).to.deep.equal(apiUserNames);
        });
      });
    
    })

    it('HTTP 400 Returned if parameter is invalid', () => {
        
         cy.intercept(HttpMethod.GET, GlobalConstants.login_UserApi, {
            statusCode: HttpStatus.BAD_REQUEST,
            body: bodyData400
        }).as('users');
 
         cy.wait('@users').then((interception: any) => {
            expect(interception.response.statusCode).to.eq(400);
            loginPage.checkValueDropListNotInDom()
        })        
    });

    it('HTTP 403 Return if do not have permission to access', () => {
        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus.FORBIDDEN,
            body: bodyData403
        }).as('users');

        cy.wait('@users').then((interception: any) => {
            loginPage.checkValueDropListNotInDom()
        });
    });
    it('HTTP 404 Returned if URI is not found', () => {
        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus.NOT_FOUND,
            body: bodyData404
        }).as('users');

        // Chờ API trả về dữ liệu đã được thay đổi
        cy.wait('@users').then((interception: any) => {
            loginPage.checkValueDropListNotInDom()
        });
    });
    it.only('HTTP 500 Returned if an Internal Server Error occurred', () => {
        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus. INTERNAL_SERVER_ERROR,
            body: bodyData500
        }).as('users');

        // Chờ API trả về dữ liệu đã được thay đổi
        cy.wait('@users').then((interception: any) => {
            loginPage.checkValueDropListNotInDom()
        });
    });

});
