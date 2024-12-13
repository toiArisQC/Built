import { GlobalConstants } from "../../actions/commons/GlobalConstants";
import { GlobalVariable } from "../../actions/commons/GlobalVariable";
import { PageGeneratorManager } from "../../actions/commons/PageGeneratorManager";
import { HeaderObject } from "../../actions/pageObject/HeaderPageObject";
import { LoginPageObject } from "../../actions/pageObject/LoginPageObject";

// Di chuyển describe ra ngoài class
describe("Login_01_Validate", () => {
  let loginPage: LoginPageObject;
  let headerPage: HeaderObject;

  let userName: string = 'accretech';
  let password: string = 'accretech';

  before(() => {
    // Chỉ khởi tạo loginPage một lần duy nhất
    loginPage = PageGeneratorManager.getloginPage();
  });

  beforeEach(() => {
    // Không cần khởi tạo lại loginPage, chỉ cần mở trang đăng nhập
    cy.intercept('GET', 'https://cloud-accretech.link/acct/1/server/resource/100/auth/users').as('getUsers');
    cy.openUrl(GlobalConstants.LoginURL);
  });

  it(`Common Login`, () => {
    // Chọn giá trị tên người dùng từ mảng hoặc nguồn dữ liệu
    loginPage.selectValueUserNameByValue(userName);

    // Click vào nút ẩn (giả sử đây là một nút cần nhấn để tiến hành login)
    loginPage.clickToHiddenButton();

    // Nhập mật khẩu vào trường mật khẩu
    loginPage.typeToPasswordTextbox(password);

    // Click vào nút OK sau khi nhập thông tin đăng nhập
    loginPage.clickToSpecialOnKeyBoardButtonByDataTestID("buttonOkTestId");

    // Sau khi đăng nhập, chuyển sang header page để kiểm tra thành công
    headerPage = PageGeneratorManager.getHeaderPage();

    // Kiểm tra xem người dùng đã đăng nhập thành công chưa
    headerPage.isButtonHeaderByDataTestIdDisplayed("AccountCircleIcon");

    // Sử dụng cy.window() để truy cập vào đối tượng window
    cy.window().then((window) => {
      // Truy cập vào sessionStorage và lấy giá trị của một key cụ thể
      const sessionValue = window.sessionStorage.getItem('nxgAuth_SS_user');
    
      // Kiểm tra xem giá trị sessionStorage có tồn tại hay không
      if (sessionValue) {
        GlobalVariable.SESSIONSTORAGE_VALUE=sessionValue;
        cy.log('SessionStorage Value:', sessionValue);

        // // Giả sử bạn muốn lưu lại sessionValue vào cookie hoặc sử dụng trong những lần đăng nhập sau
        // cy.setCookie('nxgAuth_SS_user', sessionValue);
      } else {
        cy.log('No session value found.');
      }
    });
  });
});
