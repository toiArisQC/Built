export class Basepage{
    openUrl(url: string): void {
        cy.visit(url);
      }
    //find element include case using xpath
    getWebElement(locator: string):Cypress.Chainable<JQuery<HTMLElement>>{
        if (locator.startsWith("xpath"))
            return cy.xpath(locator.substring(6));
        return cy.get(locator);
    }
    //find element contains text not include case using xpath
    getWebElementContainsText(typeElement:string,text: string):Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(typeElement).contains(text);

    }
    //Click element case normal cy.get(locator)
    clickToElement(locator: string): void {
      this.getWebElement(locator).each(($el) => {
          cy.wrap($el)
              .invoke('css', 'pointer-events')  // Lấy giá trị của thuộc tính 'pointer-events'
              .then((pointerEvents) => {
                  const pointerEventsValue = pointerEvents && pointerEvents.toString().trim(); // Chuyển đổi thành chuỗi và loại bỏ khoảng trắng
                  if (pointerEventsValue && pointerEventsValue !== 'none') {
                      // Nếu pointer-events không phải 'none', nhấp chuột bình thường
                      cy.wrap($el).click();
                  } else {
                      // Nếu pointer-events là 'none' hoặc không tồn tại, nhấp chuột với force: true
                      cy.wrap($el).click({ force: true });
                  }
              });
      });
  }
  
  
    //click element case cy.get(locator).contains(text)
    clickToElementContainsText(typeElement:string,text: string): void{
      
        this.getWebElementContainsText(typeElement,text).click();    
    }
    
    // Hàm để wrap một phần tử hoặc giá trị vào Cypress.Chainable
    wrapElement(element: any): Cypress.Chainable<any> {
        return cy.wrap(element); // Bao bọc phần tử hoặc giá trị vào Cypress.Chainable
    }
    //getText của 1 element
    getTextElement(locator: string): Cypress.Chainable<string> {
        return this.getWebElement(locator)
            .invoke('text')
            .then(text => {text});  // Nếu bạn muốn loại bỏ khoảng trắng dư thừa
    }
    
    // Hàm lấy danh sách các phần tử và trả về text của từng phần tử
    getTextsListWebElement(locator: string): Cypress.Chainable<string[]> {
        return this.getWebElement(locator).then(($elements) => {
            const texts: string[] = [];
            // Dùng hàm wrapElement để bao bọc các phần tử vào Cypress.Chainable
            this.wrapElement($elements).each(($el) => {
                // Lấy text của từng phần tử và thêm vào mảng
                this.wrapElement($el).invoke('text').then((text) => {
                    texts.push(text.trim()); // Lấy text từ mỗi phần tử và loại bỏ khoảng trắng
                });
            });
            // Vì thao tác bên trong `.each()` là bất đồng bộ, cần trả về mảng texts sau khi tất cả các phần tử được xử lý
            return this.wrapElement(texts);
        });
    }
    selectItemCustomDropdown(parentLocator: string, childLocator: string, itemTextExpected: string):void{
      this.getWebElement(parentLocator).click();
      // Chờ cho các phần tử con có thể nhìn thấy và sau đó duyệt qua chúng
      this.getWebElement(childLocator).should('be.visible').each(($item) => {
          const textItems = $item.text().trim(); // Lấy text của phần tử
          if (textItems === itemTextExpected) {
          cy.wrap($item).click(); // Click vào phần tử có text tương ứng
          }
      });
      

  } 
  checkElementCssValue(locator: string, cssPropertyName: string,valuePropertyCss: string): Cypress.Chainable {
    // Sử dụng cy.get() để lấy phần tử theo locator và .should() để đảm bảo phần tử có mặt
    return this.getWebElement(locator).should('have.css', `${cssPropertyName}`, `${valuePropertyCss}`);
  }
  checkElementCssValueContainsText(typeElement:string,text: string, cssPropertyName: string,valuePropertyCss: string): Cypress.Chainable {
    return this.getWebElementContainsText(typeElement,text)
    .should('have.css', `${cssPropertyName}`, `${valuePropertyCss}`);
  }
  isElementDisplayed(locator: string): Cypress.Chainable<boolean> {
    // Kiểm tra xem phần tử có hiển thị hay không
    return this.getWebElement(locator).should('be.visible').then(($element) => {
      return $element.is(':visible');  // Trả về true nếu phần tử hiển thị
    });
  }
  isElementUndisplayed(locator: string): void {
    if(this.getWebElement(locator).should('not.exist'))
    this.getWebElement(locator).should('not.exist')
    else{
      //TH else nay chua check
      this.getWebElement(locator).should('not.be.visible');
    }
}
//Chua test dc vi password no k cho vao text ma no cho vao vao gia tri cua attribute 
  compareValues( locator :string,expectedText :string):void{
    this.getTextElement(locator)
    .then((actualText) => {
      console.log("actual text", actualText)
      const trimmedText = actualText.trim(); // Loại bỏ khoảng trắng
      if (trimmedText === '') {
        cy.log("má noooooooooooooooooooooo")
        cy.log(`The text for locator "${locator}" is empty.`);
        expect(trimmedText).to.equal(expectedText.trim());
      } else {
        cy.log("huuuuuuuuuuuuuuuuuuuuuuuuuuuu")
        expect(trimmedText).to.equal(expectedText.trim());
      }
    });
    //.should('have.text', `'${expectedText}'`);
  }
  //Chua test dc vi password no k cho vao text ma no cho vao vao gia tri cua attribute 
  compareOtherValues( locator :string,expectedText :string):void{
    this.getTextElement(locator)
    .then((actualText) => {
      const trimmedText = actualText.trim(); // Loại bỏ khoảng trắng
      if (trimmedText === '') {
        cy.log(`The text for locator "${locator}" is empty.`);
        expect(trimmedText).not.to.equal(expectedText.trim());
      } else {
        expect(trimmedText).not.to.equal(expectedText.trim());
      }
    });
    //.should('have.text', `'${expectedText}'`);
  }
  getElementAttribute(locator: string, attributeName: string): Cypress.Chainable<string | null> {
    return this.getWebElement(locator).invoke('attr', attributeName);
  }
  compareEqualValueAttribute(locator: string, attributeName: string, expectedValue: string): void {
    this.getElementAttribute(locator, attributeName).should('equal', expectedValue);
  }
  compareNotEqualValueAttribute(locator: string, attributeName: string, expectedValue: string): void {
    this.getElementAttribute(locator, attributeName).should('not.equal', expectedValue);
}
checkElementNotInDom(locator: string):void{
  this.getWebElement(locator).should('not.exist');
 }


 













//=================================================================
    //Chua test
    //ham nay chua test
    //getText của 1 element
    getTextElementContainsText(typeElement:string,text: string): Cypress.Chainable<string> {
        return this.getWebElementContainsText(typeElement,text)
            .invoke('text')
            .then(text => text);  // Nếu bạn muốn loại bỏ khoảng trắng dư thừa
    }
    // Hàm chờ phần tử có thể click được
    sendkeyToElement(locator: string, valueToSend: string): void {
        this.getWebElement(locator)
          .clear() // Xóa nội dung hiện tại của phần tử
          .type(valueToSend); // Nhập giá trị mới
      }
      sendkeyToElementContainsText(typeElement:string,text: string,valueToSend:string): void {
        this.getWebElementContainsText(typeElement,text)
          .clear() // Xóa nội dung hiện tại của phần tử
          .type(valueToSend); // Nhập giá trị mới
      }

    selectItemInefaultDropdown(locator: string, itemValue: string):void{
        this.getWebElement(locator).select(itemValue);
    }
    getFirstSelectedTextInDefaultDropdown(locator: string) : Cypress.Chainable<string>{
        return this.getWebElement(locator).invoke('text');
    }
    
    // getElementAttribute(locator: string, attributeName: string): Cypress.Chainable<string | null> {
    //     return this.getWebElement(locator).then(($element) => {
    //         // Ép kiểu giá trị undefined thành null nếu không tồn tại
    //         return $element.attr(attributeName) ?? null;
    //     });
    // }
    
    
      getListElementSize(locator: string): Cypress.Chainable<number> {
        return this.getWebElement(locator) // Lấy tất cả phần tử với locator tương ứng
          .should('have.length.greaterThan', 0) // Đảm bảo có ít nhất 1 phần tử
          .then(($elements) => {
            return $elements.length; // Trả về số lượng phần tử
          });
      } 
      checkToElement(locator: string): void {
        this.getWebElement(locator).then(($element) => {
          if (!$element.is(':checked')) {
            cy.wrap($element).check();
          }
        });
      }
      uncheckToElement(locator: string): void {
        this.getWebElement(locator).then(($element) => {
          // Kiểm tra nếu checkbox đang được chọn, thì bỏ chọn
          if ($element.is(':checked')) {
            cy.wrap($element).uncheck();
          }
        });
      }
      
      
      isElementSelected(locator: string): Cypress.Chainable<boolean> {
        return this.getWebElement(locator).then(($element) => {
          // Kiểm tra trạng thái "checked" của phần tử
          return $element.is(':checked');
        });
      }
      isElementEnabled(locator: string): Cypress.Chainable<boolean> {
        // Kiểm tra xem phần tử có được kích hoạt hay không
        return cy.get(locator).should('be.enabled').then(($element) => {
          return $element.prop('disabled') === false; // Trả về true nếu phần tử không bị vô hiệu hóa
        });
      }
      waitForElementClickable(locator: string, timeout: number = 6000): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getWebElement(locator) 
        .should('exist', { timeout })               // Đảm bảo phần tử tồn tại
        .should('exist', { timeout })               // Đảm bảo phần tử tồn tại
        .should('be.visible', { timeout })          // Đảm bảo phần tử hiển thị
        .should(($el) => {
            const isDisabled = $el.prop('disabled') || $el.attr('aria-disabled') === 'true';
            expect(isDisabled).to.be.false; // Kiểm tra phần tử không bị vô hiệu hóa
        });
          
    }
    waitForElementVisible(locator: string, timeout: number = 4000): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getWebElement(locator) // Lấy phần tử
            .should('be.visible', { timeout }); // Đảm bảo phần tử hiển thị với timeout tùy chỉnh
    }
    waitForElementInvisible(locator: string, timeout: number = 4000): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.getWebElement(locator) // Lấy phần tử
            .should('not.be.visible', { timeout }); // Đảm bảo phần tử không hiển thị với timeout tùy chỉnh
    }
   
    
    
    

      
      


      //Hàm thao tac voi trinh duyet
      getPageTitle(): Cypress.Chainable<string> {
        return cy.title(); // Trả về tiêu đề của trang web
      }
      getCurrentPageUrl(): Cypress.Chainable<string> {
        return cy.url(); // Trả về URL của trang hiện tại
      }
      getPageSourceCode(): Cypress.Chainable<string> {
        return cy.document().invoke('document.documentElement.outerHTML'); // Lấy mã nguồn của trang
      }
      backToPage(): Cypress.Chainable {
        return cy.go('back'); // Quay lại trang trước đó
      }
      forwordToPage(): Cypress.Chainable {
        return cy.go('forward'); // Điều hướng đến trang kế tiếp trong lịch sử trình duyệt
      }
      refreshCurrentPage(): Cypress.Chainable {
        return cy.reload(); // Làm mới (reload) trang hiện tại
      }
      getBrowserCookies(): Cypress.Chainable<Cypress.Cookie[]> {
        return cy.getCookies(); // Lấy tất cả các cookies
      }
      setCookies(cookies: Cypress.Cookie[]): void {
        cookies.forEach(cookie => {
          cy.setCookie(cookie.name, cookie.value, {
            path: cookie.path,
            domain: cookie.domain,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite
          });
        });
      }
      deleteAllCookies(): void {
        cy.clearCookies(); // Xóa tất cả các cookies
      }
      
      
      
      
      
      
      
      
      
      
      
      
    

}