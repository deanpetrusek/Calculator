using OhmCalculator.Initialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using WebApi.StructureMap;

namespace OhmCalculator
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.UseStructureMap<DependencyInjectionRegistry>();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
