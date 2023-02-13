package com.yiftach.TheProjectPart3.app.core.filters;

import com.yiftach.TheProjectPart3.app.core.data.Role;
import com.yiftach.TheProjectPart3.app.core.entities.Client;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@CrossOrigin
public class AuthorizationFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String requestUri = httpServletRequest.getRequestURI();

        if (httpServletRequest.getMethod().equals("options")
                || requestUri.toLowerCase().contains("/login") || requestUri.toLowerCase().contains("/register")) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            Client client = (Client) servletRequest.getAttribute("client");

            if (requestUri.contains("/api/admin") && client.getRole() != Role.ADMIN) {
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // for CORS
                httpServletResponse.setHeader("WWW-Authenticate", "Bearer realm=\"ADMIN API\"");
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "*");
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "Only admins can access this zone!");
            } else if (requestUri.contains("/api/company") && client.getRole() != Role.COMPANY) {
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // for CORS
                httpServletResponse.setHeader("WWW-Authenticate", "Bearer realm=\"COMPANY API\"");
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "*");
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "Only companies can access this zone!");
            } else if (requestUri.contains("/api/customer") && client.getRole() != Role.CUSTOMER) {
                httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // for CORS
                httpServletResponse.setHeader("WWW-Authenticate", "Bearer realm=\"CUSTOMER API\"");
                httpServletResponse.setHeader("Access-Control-Expose-Headers", "*");
                httpServletResponse.sendError(HttpStatus.UNAUTHORIZED.value(), "Only customers can access this zone!");
            } else {
                filterChain.doFilter(servletRequest, servletResponse);
            }
        }
    }
}
