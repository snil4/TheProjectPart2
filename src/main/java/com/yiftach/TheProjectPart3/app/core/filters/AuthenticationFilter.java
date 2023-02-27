package com.yiftach.TheProjectPart3.app.core.filters;

import com.yiftach.TheProjectPart3.app.core.entities.Client;
import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.StringTokenizer;

@CrossOrigin(origins = "http://localhost:3000/")
public class AuthenticationFilter implements Filter {

    private JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        super();
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String requestUri = httpServletRequest.getRequestURI();

        if (httpServletRequest.getMethod().equalsIgnoreCase("options")
                || requestUri.toLowerCase().contains("login") || requestUri.toLowerCase().contains("register")) {
            filterChain.doFilter(servletRequest,servletResponse);
        } else {
            try {
                String authorization = httpServletRequest.getHeader("Authorization");
                Iterator<String> headers = httpServletRequest.getHeaderNames().asIterator();
                StringTokenizer tokenizer = new StringTokenizer(authorization);
                String scheme = tokenizer.nextToken();
                String token = tokenizer.nextToken();
                Client client = jwtUtil.extractClient(token);
                httpServletRequest.setAttribute("client", client);
                filterChain.doFilter(servletRequest, servletResponse);
            } catch (Exception e) {
                HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000"); // For CORS

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
