# coderhouse-mern

# VS Code extensions
REST Client 


crypto.randomBytes(64).toString('hex') used to generate values of,
JWT_ACCESS_TOKEN_SECRET
JWT_REFRESH_TOKEN_SECRET


Verify otp method also sets the cookie with the refresh token.

![verify otp result](./readmeImages/VerfiyOtpResult.png)

Access token = JWT, store it in local storage and login the user.

Opt feature was effectively stored on the client, reducing db load.

User Redux tool kit for state management

Enable CORS middleware in BE to prevent the error by whitelisting the domain,
Also can use proxy option in front end.

data transform object (dto) - to tranform data before we send


cd into frontend
`yarn start`

cd into backend
`node server.js` or `yarn dev`


Part - 5 :
- Full name, profile pic upload,
- request server, to activate user,
- once the current JWT expires, using refresh token we need to auto refresh it with axios.

Notes for self :
1. To add the refresh token to db, we need a model.
create a service to handle errors later on.
2. Check part 5 video 14:25 seconds to clarify about 'expires' variable.


The HttpOnly attribute is used to help mitigate against certain types of cross-site scripting (XSS) attacks by preventing client-side scripts from accessing the cookie. When the HttpOnly attribute is set on a cookie, it is not accessible to client-side scripts, such as JavaScript. This can help to reduce the risk of certain types of XSS attacks by preventing an attacker from being able to steal the cookie by injecting malicious script into the page.