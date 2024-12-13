import { GlobalConstants } from "../../actions/commons/GlobalConstants";
import { GlobalVariable } from "../../actions/commons/GlobalVariable";
import { PageGeneratorManager } from "../../actions/commons/PageGeneratorManager";
import { HeaderObject } from "../../actions/pageObject/HeaderPageObject";
import { LoginPageObject } from "../../actions/pageObject/LoginPageObject";
describe("Login_01_Validate",()=>{
    let loginPage: LoginPageObject;
    let headerPage : HeaderObject;
    const users = [
        { userName: 'operator', password: 'operator' },
        { userName: 'maintainer', password: 'maintainer' },
        { userName: 'engineer', password: 'engineer' },
        { userName: 'admin', password: 'admin' },
        { userName: 'accretech', password: 'accretech' }
      ];
    
  before(() => {
    // New Page Object: thực hiện duy nhất 1 lần
    loginPage = PageGeneratorManager.getloginPage();
    
  });
  beforeEach(() => {
    cy.intercept('GET', 'https://cloud-accretech.link/acct/1/server/resource/100/auth/users').as('getUsers')
    // Truy cập vào trang login trước mỗi test case
    cy.openUrl(GlobalConstants.LoginURL);//ham nay trong commands
   
    loginPage = PageGeneratorManager.getloginPage();
    
  })
    it(`TC_01: Login success with account `,()=>{
        cy.login(GlobalVariable.SESSIONSTORAGE_VALUE)

    })
    

})