function Login(email: string, password: string, role: string) {
        const url = "http://localhost:8080/api/" + role.toLowerCase + "/login";
    
        const res = fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email,password: password})
        }).then((response) => response.json())
        .then((data) => console.log(data));
    
        // sessionStorage.setItem("aaaaaaaaa1aaaaaaaaa2aaaaaaaaa3aaaaaaaaa4aaaaaaaaaaaaaaaaaa", res)
}

function Register(){

}

export default {Login, Register};