## Role Management
It is a resposive web application where users can manage / create roles which allows permissions to certain instruments based on the role 

## Start the Application
- We can either use `ng serve` or `npm start` to run the application

## Run Test Cases

- We can use `ng test` to run all the unit test cases 
- We can also run a specific  test file by `ng test --include=folderpath` 

## Folder structure

- [Rolemanagement]
  - [src]
  - [app]
  - [components]
      - [Home]
        - Assign-role
        - create-instrument
        - create-instrument
        - show-instrument
        - instrument-permissions
        - update-instrument
        - user-details
        - userhome-page
        - generate-role
      - [auth]
        - login
        - register
      - [common]
        - side-navbar
      - [service]
        - user
        - common
        - permission
        - [authguards]
          - superadminguard
          - loginguard

## API

  ## To get all roles ( GET )

  -  `API url` :http://localhost:3000/user

  - `sample input` : None

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  - `sample output` : 
    {
    "message": "Roles fetched Successfully ",
    "data": [
        {
            "_id": "6523c7e50144d1515ce52609",
            "role": "support-1",
            "count": 0
        },
        {
            "_id": "65267c77982f637496028ec3",
            "role": "modulelead",
            "count": 6
        },
        {
            "_id": "6523b3f80144d1515ce524fb",
            "role": "administrator",
            "count": 1
        }
    ]
}
  ## To get all the instruments ( GET )

  -  `API url` :http://localhost:3000/instrument

  -  `sample input` : None

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  -  `sample output`:
    {
    "message": "Successfully Fetched all Instruments ",
    "data": [
        {
            "_id": "651fe675b6a4618c22f8f821",
            "ComputerHostName": "12.213.13.12",
            "instrumentName": "cabToken",
            "ApplicationName": "cabSupport",
            "instrumentLocation": "siruseri",
            "createdAt": "2023-10-06T10:50:29.605Z",
            "updatedAt": "2023-10-06T10:50:29.605Z",
            "__v": 0
        }]}
  ## To get the current user role details ( GET )

  - `API url`:  http://localhost:3000/role/${currentRole};

  -  `sample input` : { currentRole:`administrator` }

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  -  `sample output`:
    {
    "message": "Successfully Fetched current role ",
    "data": {
        "_id": "6523b3f80144d1515ce524fb",
        "role": "administrator",
        "instrumentPermissions": [
            {
                "instrumentName": "cabToken",
                "instrument_id": "651fe675b6a4618c22f8f821",
                "permissionStatus": true
            },
            {
                "instrumentName": "foodToken",
                "instrument_id": "651fe68ab6a4618c22f8f827",
                "permissionStatus": true
            },
            {
                "instrumentName": "parkingToken",
                "instrument_id": "651ff699c96e603eebca8146",
                "permissionStatus": true
            },
            {
                "instrumentName": "gateToken",
                "instrument_id": "651ff8a2d6fb8aeabbaf7661",
                "permissionStatus": true
            },
            {
                "instrument_id": "6525b213ea158519844774d8",
                "instrumentName": "claimToken",
                "permissionStatus": true}]}}
  ## To get userdetails ( GET )

  -   `API url` :http://localhost:3000/user/${searchValue}/${page}/${itemsPerPage};

  -  `sample input` : { searchValue:`empty`,page:1,itemsPerPage:5 }

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  -  `sample output`:
   {
    "message": "Fetched users ",
    "userDetails": [
        {
            "_id": "651e44a23b35340ace6169e8",
            "userEmail": "kuralanban5@gmail.com",
            "userPassword": "Aspire@123",
            "userRole": "administrator",
            "userName": "kuralraptors",
            "isActive": true,
            "updatedAt": "2023-10-13T15:09:48.550Z"
        }]}
  ## To search a user in table (GET )
    
  -   `API url`: http://localhost:3000/user/search/${username}/${currentPage}/${itemsPerPage}

  -  `sample input` : { searchValue:`kural`,page:1,itemsPerPage:5 }
  
  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}
    
  -  `sample output`:{
    "message": "searched user result ",
    "updatedData": [
        {
            "_id": "651e44a23b35340ace6169e8",
            "userEmail": "kuralanban5@gmail.com",
            "userPassword": "Aspire@123",
            "userRole": "administrator",
            "userName": "kuralraptors",
            "isActive": true,
            "updatedAt": "2023-10-13T15:09:48.550Z"}]}
  ## To create a new user ( POST )
  -  `API url` :http://localhost:3000/user/signup`


  -  `sample input` : userData:{
                    email:`kuralanban5@gmail.com`,
                    password:`Aspire@123`,
                    role:`admin`,
                             }

  -  `sample output`: 
    {"message": "User Registered Successfully "}
  ## To validate a user data ( POST )

  -  `API url` :http://localhost:3000/user/signin`

  -  `sample input` : userData:{
                    email:`kuralanban5@gmail.com`,
                    password:`Aspire@123`,
                             }
  -   `sample output`:
   {"message": "Login Success ",token:`ewecwesenj1eke3pw_sd21nek`}
  ## To toggle the active status to false ( PATCH )

  -  `API url` :http://localhost:3000/user

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  -  `sample input` : userEmail:{
                    email:`kuralanban5@gmail.com`,
                             }
  -  `sample output`:
    { message: "Successfully logged out "}
  ## To create a instrument ( POST )

  - `API url`: http://localhost:3000/instrument

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  - `sample input` : instrument:{
                    ComputerHostName: "12.213.13.12",
                    instrumentName: "cabToken",
                    ApplicationName: "cabSupport",
                    instrumentLocation: "",
                             }
  - `Sample output`:
  
    {"message": "Instrument created successfully "}
  ## To create a role ( POST )

  - `API Url`: http://localhost:3000/role`

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  -  `sample input` : roleData:{
  "role": "modulelead",
  "instrumentPermissions": [
    {
      "instrumentName": "cabToken",
      "instrument_id": "651fe675b6a4618c22f8f821",
      "permissionStatus": true
    }]}
  
  -  `sample output`: {
    "message": "Role created Successfully",
    "data": {
          role: 'assosiate',
          instrumentPermissions: [
                                  {
                                    instrumentName: 'cabToken',
                                    instrument_id: '651fe675b6a4618c22f8f821',
                                    permissionStatus: false
                                  },
    ]}}
  ## To update a role ( PUT )
    
  - `Api url`:http://localhost:3000/user/${_id}`

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  - `sample input` : roleData:{
        "role": "modulelead",
        "instrumentPermissions": [
          {
            "instrumentName": "cabToken",
            "instrument_id": "651fe675b6a4618c22f8f821",
            "permissionStatus": true
          }]}
  -  `sample output`:
    {
      message: "Permissions Updated Successfully "
      updatedData: 
      {_id: "652e58b59041cabfd53e058b", role: "assosiate",…}} 
  ## To update a instrument ( PUT )
   
  - `Api url`: http://localhost:3000/Instrument/${_id}`
  
  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}
    
  - `sample output`:
    {
      message: "Instrument Updated"
      data:{
      _id: "651fe675b6a4618c22f8f821"
      instrumentName: "cabToken"
      ApplicationName: "cabSupport"
      ComputerHostName: "12.213.13.12"
      instrumentLocation: ""}}
  ## To update the user role ( PUT )
  
  - `Api url`:http://localhost:3000/role/${userId}`, body
  
  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}
    
  - `sample output`:
    {message: "Permissions Updated Successfully,
    updatedData:{
      _id: "65267c77982f637496028ec3",
       role: "modulelead",
       instrumentPermissions: [{
        instrumentName: "cabToken",
        instrument_id: "651fe675b6a4618c22f8f821",
        permissionStatus: false},…]}}
  ## To delete a role ( DELETE )
    
  - `API url`: http://localhost:3000/role/${_id}

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  - `sample input` : 8erf343rfjs3jw321rje2_

  - `sample output`: 
    {message: "Role deleted Successfully"}
  ## To delete a instrument ( DELETE )
    
  -  `API url`:http://localhost:3000/Instrument/${_id}`

  - `headers` : {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.}

  - `sample input` : 8erf343rfjs3jw321rje2_

  - `sample output`: 
    {message: "Instrument deleted Successfully"}
     
# Rolemanagement
