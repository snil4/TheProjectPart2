package com.yiftach.TheProjectPart3.app.core.filters;

import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;

import javax.servlet.*;
import java.io.IOException;

// TODO -Finish the filters
public class AuthenticationFilter implements Filter {

    private JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        super();
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
