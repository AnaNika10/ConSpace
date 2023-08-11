export class AuthenticationWrapper{


    public static async fetchWithAuth(url : string, method : string, token : string){
        return await fetch(url, 
        {
            method: method,
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });
    }
}