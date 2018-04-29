using Swashbuckle.Application;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace OhmCalculator
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var allowedOrigins = ConfigurationManager.AppSettings["CorsAllowedOrigins"];
            if (string.IsNullOrEmpty(allowedOrigins))
            {
                config.EnableCors();
            }
            else
            {
                var cors = new EnableCorsAttribute(allowedOrigins, "*", "*");
                config.EnableCors(cors);
            }
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "Swagger UI",
                routeTemplate: "",
                defaults: null,
                constraints: null,
                handler: new RedirectHandler(SwaggerDocsConfig.DefaultRootUrlResolver, "swagger/ui/index"));

        }
    }
}
