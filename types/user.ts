export interface userTypes{

    username : string;
    password : string;
    firstname : string;
    lastname : string;
    email : string;
    date_of_birth : string;
    biography : string;
    profile_picture : string;
}


export interface userId extends userTypes {

    id : number;

}

// A VIRER
export interface User {
    username: string;
    password: string;
}

declare global {
    namespace Express {
      interface Request {
        headers?: Headers;
        body?: Body;
        user?: User;
      }
    }
  }
