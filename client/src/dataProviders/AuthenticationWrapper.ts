export class AuthenticationWrapper{


    public static async fetchWithAuth(url : string, method : string, token : string, body?: any){
        return await fetch(url, 
        {
            method: method,
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}