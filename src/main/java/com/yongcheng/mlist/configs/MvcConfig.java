package com.yongcheng.mlist.configs;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
  
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**")
      .addResourceLocations("classpath:/static/")
      .resourceChain(true)
      .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath, Resource location) throws IOException {
            Resource requestedResource = location.createRelative(resourcePath);

            System.out.println("resource path: " + resourcePath);
            System.out.println("requested resource: " + requestedResource);
            System.out.println("requested resource exists: " + requestedResource.exists());
            System.out.println("requested resource readable: " + requestedResource.isReadable());

            return requestedResource.exists() && requestedResource.isReadable()
              ? requestedResource
              : new ClassPathResource("/static/index.html");
          }
      });
  }
    
}