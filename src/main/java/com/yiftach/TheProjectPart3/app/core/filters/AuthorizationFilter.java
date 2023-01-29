package com.yiftach.TheProjectPart3.app.core.filters;

import com.yiftach.TheProjectPart3.app.core.util.JwtUtil;

import javax.servlet.*;
import java.io.IOException;

// TODO - finish the filters
public class AuthorizationFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
