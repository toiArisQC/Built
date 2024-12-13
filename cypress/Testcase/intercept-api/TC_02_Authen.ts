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
    let loginPage: LoginPageObject;
    let headerPage:HeaderObject;

    before(() => {
        loginPage = PageGeneratorManager.getloginPage();
        headerPage=PageGeneratorManager.getHeaderPage();
        const users = [
            { userName: 'operator', password: 'operator' },
            { userName: 'maintainer', password: 'maintainer' },
            { userName: 'engineer', password: 'engineer' },
            { userName: 'admin', password: 'admin' },
            { userName: 'accretech', password: 'accretech' }
          ];
        // Khai báo dữ liệu bodyData trước khi chạy các test
        bodyData200 = {
            value: {
                "roleId": 4,
                "userId": 4
            }
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
    });
    beforeEach(() => {
    cy.openUrl(GlobalConstants.LoginURL);
    loginPage = PageGeneratorManager.getloginPage();
      })

    it(`HTTP 200 Returned if the request is successful by admin `, () => {
        cy.intercept(HttpMethod.GET, "https://cloud-accretech.link/acct/1/server/resource/100/dev/f6fdffe48c908deb0f4c3bd36c032e72",{
              statusCode: HttpStatus.OK,
              body:bodyData200
          }).as('users');
        loginPage.selectValueUserNameByValue("admin");
        loginPage.clickToHiddenButton()
        loginPage.typeToPasswordTextbox("admin")
       
        //Click button OK 
        loginPage.clickToSpecialOnKeyBoardButtonByDataTestID("buttonOkTestId");

        cy.wait('@users').then((interception) => {
            headerPage=PageGeneratorManager.getHeaderPage();

            //Assert login sucess
            headerPage.isButtonHeaderByDataTestIdDisplayed("AccountCircleIcon");       
        });
   }
)

    // });
    xit('HTTP 400 Returned if parameter is invalid', () => {
         loginPage.selectValueUserNameByValue("admin");
         loginPage.clickToHiddenButton()
         loginPage.typeToPasswordTextbox("admin");
         cy.intercept(HttpMethod.GET, GlobalConstants.userAPI_inter, {
            statusCode: HttpStatus.BAD_REQUEST,
            body: bodyData400
        }).as('users');
         //Click button OK
         loginPage.clickToSpecialOnKeyBoardButtonByDataTestID("buttonOkTestId");
 
         cy.wait('@users').then((interception: any) => {
            // headerPage=PageGeneratorManager.getHeaderPage();
    
            // //Assert login sucess
            // headerPage.isButtonHeaderByDataTestIdDisplayed("AccountCircleIcon");
        })
 
         // loginPage = PageGeneratorManager.getloginPage();
 
         
    });
    xit('HTTP 403 Return if do not have permission to access', () => {
        // Truy cập trang web, function open is written on commands
        cy.openUrl(GlobalConstants.LoginURL);

        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus.FORBIDDEN,
            body: bodyData403
        }).as('users');

        //cy.wait('@users').then((interception: any) => {
            loginPage.checkValueDropListNotInDom()
        //});
    });
    xit('HTTP 404 Returned if URI is not found', () => {
        // Truy cập trang web, function open is written on commands
        cy.openUrl(GlobalConstants.LoginURL);

        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus.OK,
            body: bodyData200
        }).as('users');

        // Chờ API trả về dữ liệu đã được thay đổi
        cy.wait('@users').then((interception: any) => {
            const items = interception.response.body.value;  // Lấy dữ liệu đã thay đổi
            const apiUserNames = items.map((item: any) => item.user);  // Tạo mảng tên người dùng từ API

            // Bước 4: Lấy danh sách tên người dùng từ giao diện
            loginPage.clickToUsernameTextboxByContainsText();
            expect(apiUserNames.length).to.equal(items.length);
            loginPage.selectTextsOfAllValueUserNameDropList().then(result => {
                expect(result).to.deep.equal(apiUserNames);
            });
        });
    });
    xit('HTTP 500 Returned if an Internal Server Error occurred', () => {
        // Truy cập trang web, function open is written on commands
        cy.openUrl(GlobalConstants.LoginURL);

        // Thực hiện intercept để thay đổi dữ liệu trả về từ API
        cy.intercept(HttpMethod.GET, GlobalConstants.userAPI, {
            statusCode: HttpStatus.OK,
            body: bodyData200
        }).as('users');

        // Chờ API trả về dữ liệu đã được thay đổi
        cy.wait('@users').then((interception: any) => {
            const items = interception.response.body.value;  // Lấy dữ liệu đã thay đổi
            const apiUserNames = items.map((item: any) => item.user);  // Tạo mảng tên người dùng từ API

            // Bước 4: Lấy danh sách tên người dùng từ giao diện
            loginPage.clickToUsernameTextboxByContainsText();
            expect(apiUserNames.length).to.equal(items.length);
            loginPage.selectTextsOfAllValueUserNameDropList().then(result => {
                expect(result).to.deep.equal(apiUserNames);
            });
        });
    });

});
