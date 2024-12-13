import { GlobalConstants } from "../../actions/commons/GlobalConstants";
import { HttpMethod } from "../../actions/commons/HttpsMethod";

describe('Test [POST] group',()=>{
  before(() => {
     
  });
 
  const Expectedresponse ={
    "affected_rows": 1
   }
  
  const BodyEmpty={};
  const BodyNotHaveValue={
    "value":[]
  };
  const bodyDataHaveFormatValueIsArray = {
    "value": [
      { "user":"operator" ,
        "userId":1
      },
      { "user":"maintainer" ,
        "userId":2
      },
      { "user":"engineer" ,
        "userId":3
      },
      { "user":"admin" ,
        "userId":4
      },
      { "user":"accretech" ,
        "userId":5
      }
     
    ]
  }
  const bodyDataHaveFormatValueIsObject = {
    "id": 1,
    "key": "MainPageMenuSettings",
    "value": {
    "MainPageMenuSettings": {
    "Accretech": [
    {
    "name": "Monitor Page",
    "category": "Page Builder",
    "sub-category": "",
    "page": "https://accretech-prototype-v1.aris-vn.com/",
    "icon": "icon01",
    "iconCategory": null,
    "seq": 1,
    "isQL": false
    },
    {
    "name": "Main Page",
    "category": "Page Builder",
    "sub-category": "",
    "page": "08",
    "icon": "icon02",
    "iconCategory": null,
    "seq": 2,
    "isQL": false
    },
    {
    "name": "Sub-page Builder",
    "category": "Page Builder",
    "sub-category": "",
    "page": "09",
    "icon": "icon03",
    "iconCategory": null,
    "seq": 3,
    "isQL": false
    },
    {
    "name": "CEM Builder",
    "category": "",
    "sub-category": "",
    "page": "https://master.d37bxp9rg8uuyg.amplifyapp.com/",
    "icon": "",
    "iconCategory": null,
    "seq": 4,
    "isQL": false
    }
    ],
    "Default": [
    {
    "name": "User Account Management",
    "category": "Admin Settings",
    "sub-category": "",
    "page": "07",
    "icon": "icon05",
    "iconCategory": null,
    "seq": 0,
    "isQL": false
    }
    ],
    "Admin": [
    {
    "name": "User Account Management",
    "category": "Admin Settings",
    "sub-category": "",
    "page": "07",
    "icon": "icon05",
    "iconCategory": null,
    "seq": 0,
    "isQL": false
    }
    ],
    "MenuItems": [
    {
    "name": "Lot Operation",
    "category": "Operations",
    "sub-category": "",
    "page": "a3ad20f09afd7ba92647898492d8ab763e1f5",
    "icon": "icon07",
    "iconCategory": "icon01",
    "seq": 0,
    "isQL": true,
    "urlRoles": [],
    "seqQL": 0,
    "idx": 2
    },
    {
    "idx": 0,
    "name": "Teaching",
    "category": "Operations",
    "sub-category": "Manual Operations",
    "page": "6df4327831712b2c143d7ac4d9bbc130414a48",
    "icon": "icon06",
    "iconCategory": "icon01",
    "seq": 1,
    "isQL": true,
    "urlRoles": []
    },
    {
    "idx": 1,
    "name": "Unit Operation",
    "category": "Operations",
    "sub-category": "Manual Operations",
    "page": "6629d9f4c4c4fa9a661ddbd4763574308ec3d6",
    "icon": "icon13",
    "iconCategory": "icon01",
    "seq": 2,
    "isQL": true,
    "urlRoles": []
    },
    {
    "name": "Maintenance",
    "category": "Operations",
    "sub-category": "Manual Operations",
    "page": "d9abd74358f3825f5083064c5f26f81c4a89",
    "icon": "icon13",
    "iconCategory": "icon01",
    "seq": 3,
    "isQL": true,
    "urlRoles": [],
    "seqQL": 1,
    "idx": 3
    }
    ]
    },
    "id": "6178d35415fb5a0871116fb0"
    }
   }
  const  BodyIncorrectFormat="";

it('TC_01: Request Body JSON Format empty body',()=>{
  cy.postData(HttpMethod.POST,GlobalConstants.userApi,BodyEmpty).then(res=>{
    expect(res.status).to.eq( 400);
    // cy.getData(HttpMethod.GET,GlobalConstants.userApi).then(res=>{
    //     cy.log(JSON.stringify(res.body));
    //     expect(res.status).to.eq(200);
    //     expect(res.body.value).to.eql([])
    // })
    
  })
})
// it('TC_02: Request Body JSON Format is not correct formatr',()=>{
//   cy.postData(HttpMethod.POST,GlobalConstants.userApi,BodyNotHaveValue).then(res=>{
//     expect(res.status).to.eq(200);
//     expect(res.body).to.eql(Expectedresponse);
//     cy.log(JSON.stringify(res.body));
//     cy.getData(HttpMethod.GET,GlobalConstants.userApi).then(res=>{
//         cy.log(JSON.stringify(res.body));
//         expect(res.status).to.eq(200);
//         expect(res.body.value).to.eql(BodyNotHaveValue.value)
//     })
    
//   })
  
// })
it('TC_03: Request Body JSON Format hasnt value parameter',()=>{
  cy.postData(HttpMethod.POST,GlobalConstants.userApi,BodyNotHaveValue).then(res=>{
    expect(res.status).to.eq(200);
    expect(res.body).to.eql(Expectedresponse);
    cy.log(JSON.stringify(res.body));
    cy.getData(HttpMethod.GET,GlobalConstants.userApi).then(res=>{
        cy.log(JSON.stringify(res.body));
        expect(res.status).to.eq(200);
        expect(res.body.value).to.eql(BodyNotHaveValue.value)
    }) 
  })
  
})
it('TC_04: Request Body JSON Format has value parameter that corrects json format and is array',()=>{
  cy.postData(HttpMethod.POST,GlobalConstants.userApi,bodyDataHaveFormatValueIsArray).then(res=>{
    expect(res.status).to.eq(200);
    expect(res.body).to.eql(Expectedresponse);
    cy.getData(HttpMethod.GET,GlobalConstants.userApi).then(res=>{
        cy.log(JSON.stringify(res.body));
        expect(res.status).to.eq(200);
        expect(res.body.value).to.eql(bodyDataHaveFormatValueIsArray.value)
    })
    
  })
})
it('TC_05: Request Body JSON Format has value parameter that corrects json format and is object',()=>{
  cy.postData(HttpMethod.POST,GlobalConstants.userApi,bodyDataHaveFormatValueIsObject).then(res=>{
    expect(res.status).to.eq(200);
    expect(res.body).to.eql(Expectedresponse);
    cy.getData(HttpMethod.GET,GlobalConstants.userApi).then(res=>{
        cy.log(JSON.stringify(res.body));
        expect(res.status).to.eq(200);
        expect(res.body.value).to.eql(bodyDataHaveFormatValueIsObject.value)
    })
    
  })
})
//Cai nay cho sang delete 
xit('TC_06: Send requests with other methods DELETE',()=>{
  cy.postData(HttpMethod.DELETE,GlobalConstants.userApi,bodyDataHaveFormatValueIsArray).then(res=>{
    expect(res.status).to.eq(200);
    expect(res.body).to.eql(Expectedresponse);
    
  })
})
   
   
    
})