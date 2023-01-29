package com.yiftach.TheProjectPart3.app.core.filters;

import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.StringTokenizer;

public class AuthenticationFilter implements Filter {

    private JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        super();
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;

        if (httpServletRequest.getMethod().equalsIgnoreCase("options")) {
            filterChain.doFilter(servletRequest,servletResponse);
        } else {
            try {
                String authorization = httpServletRequest.getHeader("Authorization");
                StringTokenizer tokenizer = new StringTokenizer(authorization);
                String scheme = tokenizer.nextToken();
                String token = tokenizer.nextToken();
                Client client = jwtUtil.extractClient(token);
                System.out.println(client);
                httpServletRequest.setAttribute("client", client);
                filterChain.doFilter(servletRequest, servletResponse);
            } catch (Exception e) {
                HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // For CORS

                // The HTTP WWW-Authenticate response header defines the HTTP authentication
                // methods ("challenges") that might be used to gain access to a specific
                // resource.
                httpServletResponse.setHeader("WWW-Authenticate", "Bearer realm=\"General API\"");

                // The Access-Control-Expose-Headers response header allows a server to indicate
                // which
                // response headers should be made available to scripts running in the browser,
                // in
                // response to a cross-origin request.
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "*");

                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "You need to login - " + e.getMessage());
                System.err.println(e.getMessage());
            }
        }
    }
}
