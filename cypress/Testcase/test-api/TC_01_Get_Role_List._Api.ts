import { GlobalConstants } from "../../actions/commons/GlobalConstants";
import { HttpMethod } from "../../actions/commons/HttpsMethod";
import { HttpStatus } from "../../actions/commons/HttpStatus";

describe('Test [GET] group',()=>{
    before(() => {
     
    });
    
    const bodyData_TC01_TC02_TC04={
        "id": 14542,
        "key": "dev/auth/roles",
        "value": [
          {"roleId": 1, "roleName": "Operator", "sessionTimeout": 10},
          {"roleId": 2, "roleName": "Maintainer", "sessionTimeout": 160},
          {"roleId": 3, "roleName": "Engineer", "sessionTimeout": 10},
          {"roleId": 4, "roleName": "Admin", "sessionTimeout": 1},
          {"roleId": 5, "roleName": "Accretech", "sessionTimeout": 120}
        ],
        "enable": true,
        "created_at": "2024-11-25T10:09:44.400684",
        "updated_at": null
      }
      const bodyData_TC03=[
        {
          "key": "dev/auth/roles",
          "value": [
            {"roleId": 1, "roleName": "Operator", "sessionTimeout": 10},
            {"roleId": 2, "roleName": "Maintainer", "sessionTimeout": 160},
            {"roleId": 3, "roleName": "Engineer", "sessionTimeout": 10},
            {"roleId": 4, "roleName": "Admin", "sessionTimeout": 1},
            {"roleId": 5, "roleName": "Accretech", "sessionTimeout": 120}
          ],
          "created_at": "2024-11-25T10:09:44.400684",
          "updated_at": null
        }
      ]
      
    it('TC_01:Parameter has not group',()=>{
         cy.getData(HttpMethod.GET,GlobalConstants.listRoleNotHaveGroupApi).then((response:any)=>{
         cy.log(JSON.stringify(response))
         expect(response.status).to.eq(HttpStatus.OK)
         expect(response.body).to.eql(bodyData_TC01_TC02_TC04)
       })
    })
    it('TC_02: Request Parameters has group whose value equals 0',()=>{
        const url = GlobalConstants.listRoleHaveGroupApi('0');
        cy.getData(HttpMethod.GET,url).then((response:any)=>{
        // cy.log(JSON.stringify(response))
         expect(response.status).to.eq(HttpStatus.OK)
         expect(response.body).to.eql(bodyData_TC01_TC02_TC04)

    })
    
    })
    it('TC_03: Request Parameters has group whose value equals 1',()=>{
        const url = GlobalConstants.listRoleHaveGroupApi('1');
        cy.getData(HttpMethod.GET,url).then((response:any)=>{
        //cy.log(JSON.stringify(response))
        expect(response.status).to.eq(HttpStatus.OK)
        expect(response.body).to.eql(bodyData_TC03)

    })

    })
    it('TC_04: Request Parameters has group whose value not equals 0,1',()=>{
        const url = GlobalConstants.listRoleHaveGroupApi('5');
        cy.getData(HttpMethod.GET,url).then((response:any)=>{
        //cy.log(JSON.stringify(response))
        expect(response.status).to.eq(HttpStatus.OK)
        expect(response.body).to.eql(bodyData_TC01_TC02_TC04)

    })
    
    })
//  O day khong co method delete vi o phuong thuc delete cung co 1 url y chang nhu vay, su dung phuong thuc delete

    it('TC_05: Send requests with other methods  POST ',()=>{
    const url = GlobalConstants.listRoleHaveGroupApi('1');
    cy.getData(HttpMethod.POST,url).then((response:any)=>{
    //cy.log(JSON.stringify(response))
    expect(response.status).to.eq(HttpStatus.BAD_REQUEST)
    //expect(response.body).to.eql(bodyData_TC05)

})
    })
    it('TC_06: Send requests with other methods  PUT ',()=>{
    const url = GlobalConstants.listRoleHaveGroupApi('1');
    cy.getData(HttpMethod.PUT,url).then((response:any)=>{
    //cy.log(JSON.stringify(response))
    expect(response.status).to.eq(HttpStatus.METHOD_NOT_ALLOWED)
    //expect(response.body).to.eql(bodyData_TC05)

})

})

})