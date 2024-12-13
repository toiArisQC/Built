import 'cypress-xpath';  // Thêm dòng này vào file commands.ts
// Trong tệp support/commands.js hoặc support/commands.ts (tuỳ vào việc bạn dùng JavaScript hay TypeScript)

Cypress.Commands.add("openUrl", (url:string)=>{
    //cy.visit(url)
    cy.visit(url, {
        auth: {
          username: '',
          password: '',
          //Type username, password that customer provide
        },
      })
    })
