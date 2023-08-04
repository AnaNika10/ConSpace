export class AuthenticationWrapper{
    
    public static async fetchWithAuth(url : string, token : string){
        return await fetch(url, 
        {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });
    }
}